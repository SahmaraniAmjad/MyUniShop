const jwt = require("jsonwebtoken");
const AuthCofig = require("../config/auth.config.js");
const User = require("../models/User.model.js");
//check token validity
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, AuthCofig.JWT_KEY);
    req.body.userData = decoded;
    User.getLoggedInUser(req.body.userData, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Server error",
        });
      } else if (!result.is_admin) {
        res.status(401).send({
          message: "Unauthorized",
        });
      } else {
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Authentication failed",
    });
  }
};
