const jwt = require("jsonwebtoken");
const AuthCofig = require("../config/auth.config.js");
//check token validity
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, AuthCofig.JWT_KEY);
    req.body.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Authentication failed",
    });
  }
};
