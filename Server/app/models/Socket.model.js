const sql = require("./db.js");
const _ = require("lodash");

const SocketModel = function(seller) {
  this.buyer = seller.buyer;
  this.productName = seller.productName;
  this.seller_email = seller.seller_email
  this.productID = seller.productID;
  this.socketID = seller.socketID;
  this.message = seller.message;
  this.sent_date = seller.sent_date;
  this.roomID = seller.roomID;
};

SocketModel.fetchDetailHistory = function (payload, result) {
  sql.query(
    `SELECT room_id FROM Socket WHERE id='${payload.socketID}'`,
    function (error, data) {
      if (error) throw error;
      if (_.size(data) != 0) {
        let processData;
        processData = {
          roomID: data[0].Room_id
        };

        SocketModel.fetchChatHistory(processData, (err, data2) => {
          if (err) {
            res.status(500).send({
              message: err.message || 'Server error'
            });
          }
          else {
            result(null, data2);
          }
        });
      }
    });
}

SocketModel.fetchBriefHistoryByEmail = function (payload, result) {
  sql.query(
    `SELECT * FROM Socket WHERE user_email='${payload.buyer}' OR seller_email='${payload.buyer}'`,
    function (error, data) {
      if (error) throw error;
      if (_.size(data) != 0) {
        result(null, data);
      }
    });
}

SocketModel.fetchBriefHistoryByID = function (payload, result) {
  sql.query(
    `SELECT * FROM Socket WHERE id='${payload.socketID}'`,
    function (error, data) {
      if (error) throw error;
      if (_.size(data) != 0) {
        result(null, data[0]);
      }
    });
}

SocketModel.fetchChatHistory = function (payload, result) {
  sql.query(
    `SELECT id FROM Socket WHERE room_id='${payload.roomID}'`,
    function (error, data) {
      if (error) throw error;
      if (_.size(data) != 0) {
        sql.query(
          `SELECT * FROM message WHERE socket_id='${data[0].id}' ORDER BY sent_date ASC`,
          function (error, data2) {
            if (error) throw error;
            result(null, data2);
          });
      }
    });
}

SocketModel.isRoomAlreadyExist = function (payload, result) {
  var roomID = payload.roomID.split('#');

  sql.query(
    `SELECT * FROM Socket WHERE room_id='${payload.roomID}' or room_id='${roomID[0]}#${roomID[4]}#${roomID[2]}#${roomID[3]}#${roomID[1]}'`,
    function (error, data) {
      if (error) throw error;
      result(null, data);
    }
  );
}

SocketModel.newSocketRoom = function (payload) {
  sql.query(
    "Insert into Socket(user_email, product_name, seller_email, product_id, room_id) values (?,?,?,?,?)",
    [payload.buyer, payload.productName, payload.seller_email, payload.productID, payload.roomID]);
}

SocketModel.saveMessage = function (payload) {
  sql.query(
    `SELECT id FROM Socket WHERE room_id='${payload.roomID}'`,
    function (error, data) {
      if (error) throw error;
      if (_.size(data) != 0) {
        sql.query(
          "Insert into message(text, sent_date, socket_id, sender_email) values (?,?,?,?)",
          [payload.message, payload.sent_date, data[0].id, payload.buyer]);
      }
    });
}

module.exports = SocketModel;