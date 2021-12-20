module.exports = app => {
  const inbox = require("../controllers/inbox.controller.js");

  app.get("/inbox/:email", inbox.getSpecificSocket);
  app.get("/inbox/id/:id", inbox.getSocketDataFromSocket);
  app.get("/inbox/detail/:id", inbox.getSocketDetailDataFromSocket);
};