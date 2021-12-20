const bcrypt = require("bcrypt");
const AuthConfig = require("../config/auth.config.js");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const _ = require("lodash");

//registration and setting the role to admin
exports.signup = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "invalid request body",
    });
  }
  // validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array((x) => x.msg) });
  } else {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      is_admin: 1,
    });
    User.create(user, (err, data) => {
      if (err) {
        if (err == "User already exists") {
          res.status(401).send({
            message: err,
          });
        } else {
          res.status(500).send({
            message: err.message || "Server error",
          });
        }
      } else {
        res.status(201).send(data);
      }
    });
  }
};

//set user admin
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "invalid request body",
    });
  }
  User.update(req.body, (err, data) => {
    if (err) {
      if (err == "Unautorized") {
        res.status(401).send({
          message: err,
        });
      } else {
        res.status(500).send({
          message: err.message || "Server error",
        });
      }
    } else {
      res.status(201).send(data);
    }
  });
};

//get all users
exports.getAll = (req, res) => {
  onlyActive = !_.isEmpty(req.body.onlyActive) ? req.body.onlyActive : 1;
  User.getAll(onlyActive, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Server error",
      });
    else {
      res.send(data);
    }
  });
};
