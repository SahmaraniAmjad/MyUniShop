const SocketModel = require("../models/Socket.model.js");
const _ = require("lodash");


exports.getSpecificSocket = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: 'invalid request body'
      });
    }

    const socketData = new SocketModel({
      buyer: req.params.email
      });
      
      SocketModel.fetchBriefHistoryByEmail(socketData, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Server error'
        });
      }
      else {
        res.send(data);
      }
    });
  
  };

  exports.getSocketDetailDataFromSocket = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: 'invalid request body'
      });
    }

    const socketData = new SocketModel({
      socketID: req.params.id
      });
      
      SocketModel.fetchDetailHistory(socketData, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Server error'
        });
      }
      else {
        res.send(data);
      }
    });
  };

  exports.getSocketDataFromSocket = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: 'invalid request body'
      });
    }

    const socketData = new SocketModel({
      socketID: req.params.id
      });
      
      SocketModel.fetchBriefHistoryByID(socketData, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Server error'
        });
      }
      else {
        res.send(data);
      }
    });
  };
