const checkAdmin = require("../middleware/checkAdmin.js");

module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const admin = require("../controllers/admin.controller.js");
  const { body } = require("express-validator");
  const AuthConfig = require("../config/auth.config.js");

  // sign up
  app.post(
    "/adminSignup",
    [
      // username must be an email
      body("email")
        .not()
        .isEmpty()
        .withMessage("email address can not be empty"),
      body("email")
        .isEmail()
        .custom((value) => {
          return (
            value.indexOf("hs-fulda.de") > 0 || value.indexOf("sfsu.edu") > 0
          );
        })
        .withMessage("invalid university email address"),
      // password must be at least 5 chars long
      body("password").custom((value) => AuthConfig.PASSWORD_RULES.test(value)),
    ],
    admin.signup
  );

  // //update user
  // app.put("/update", checkAdmin, admin.update);

  //get all users
  app.get("/users", checkAdmin, admin.getAll);
};
