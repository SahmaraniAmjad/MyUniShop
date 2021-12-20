const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const sql = require("./app/models/db.js");
const SocketModel = require("./app/models/Socket.model.js");
const _ = require("lodash");
var moment = require("moment");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
fileUpload({
limits: { fileSize: 50 * 1024 * 1024 },
useTempFiles: true,
tempFileDir: "/tmp/",
createParentPath: true,
})
);

app.get("/", (req, res) => {
res.json({ message: "server is running" });
});

require("./app/routes/product.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/admin.routes.js")(app);
require("./app/routes/inbox.routes.js")(app);

var http = require('http').createServer(app);

const port = process.env.PORT || 8080;

// Socket Logic Starts
//Allow all socket connections from localhost 3000 to connect with the server using cors policy
const io = require("socket.io")(http, {
cors: {
origin: "http://localhost:3000",
methods: ["GET", "POST"],
},
});

io.on("connection", (socket) => {
  socket.emit("Welcome", "Hello and Welcome to the server");

  socket.on("join room", (payload) => {
    if (!payload.productName)
      return;

    // Initialize the data for socket model
    var socketData = new SocketModel({
      buyer: payload.buyer,
      productName: payload.productName,
      seller_email: payload.seller_email,
      productID: payload.productID,
      roomID: `Room#${payload.buyer}#${payload.productName}#${payload.productID}#${payload.seller_email}`
    });

    // Check if room already exist
    SocketModel.isRoomAlreadyExist(socketData, (err, data) => {
      if (_.size(data) == 0) {
        // Create New Socket Room If does not exist
        SocketModel.newSocketRoom(socketData);
        // Use the combination of paylaod to create a unique room name
        socket.join(`${socketData.roomID}`);
      }
      else {
        socketData.roomID = data[0].Room_id;
        SocketModel.fetchChatHistory(socketData, (err, data) => {
          if (err) {
            res.status(500).send({
              message: err.message || 'Server error'
            });
          }
          else {
            socket.emit("Load History", { data: data });
            // Use the combination of paylaod to create a unique room name
            socket.join(`${socketData.roomID}`);
          }
        });
      }
    });
  });

  socket.on("chat message", (payload) => {
    // Initialize the data for socket model
    var socketData = new SocketModel({
      buyer: payload.buyer,
      productName: payload.productName,
      seller_email: payload.seller_email,
      productID: payload.productID,
      message: payload.string,
      sent_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      roomID: `Room#${payload.buyer}#${payload.productName}#${payload.productID}#${payload.seller_email}`
    });

    // Check if room already exist
    SocketModel.isRoomAlreadyExist(socketData, (err, data) => {
      if (_.size(data) > 0) {
        socketData.roomID = data[0].Room_id;
        // Save sent message
        SocketModel.saveMessage(socketData);

        // Fetch chat History Start
        SocketModel.fetchChatHistory(socketData, (err, data) => {
          if (err) {
            res.status(500).send({
              message: err.message || 'Server error'
            });
          }
          else {
            io.sockets.in(`${socketData.roomID}`).emit("Load History", { data: data });
          }
        });
      }
    });
  });
});
// Socket Logic Ends

http.listen(port, () => {
console.log(`app is running on port ${port}`);
});
module.exports.httpObject = http;
