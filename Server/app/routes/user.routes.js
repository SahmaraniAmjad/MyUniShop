const checkAuth = require("../middleware/checkAuth.js");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const { body } = require("express-validator");
  const AuthConfig = require("../config/auth.config.js");

  // sign up
  app.post(
    "/signup",
    [
      // username must be an email
      body("email")
        .not()
        .isEmpty()
        .withMessage("email address can not be empty"),
      body("email")
        .isEmail()
        .custom((value) => {
          return value.endsWith("@hs-fulda.de") || value.endsWith("@sfsu.edu");
        })
        .withMessage("invalid university email address"),
      // password must meet the rules
      body("password")
        .custom((value) => AuthConfig.PASSWORD_RULES.test(value))
        .withMessage(
          "Password should be 8 min length, one small, one capital, one digit and one special char at least"
        ),
    ],
    users.signup
  );
  //sign in
  app.post(
    "/signin",
    [
      // username must not be empty
      body("email")
        .not()
        .isEmpty()
        .withMessage("email address can not be empty"),
      // password must not be empty
      body("password")
        .not()
        .isEmpty()
        .withMessage("password address can not be empty"),
    ],
    users.signin
  );
  //change password
  app.put(
    "/changePassword",
    [
      body("oldPassword").custom((value) =>
        AuthConfig.PASSWORD_RULES.test(value)
      ),
      body("newPassword").custom((value) =>
        AuthConfig.PASSWORD_RULES.test(value)
      ),
    ],
    checkAuth,
    users.changePassword
  );

  //deactivate account
  // app.put("/deactivateAccount", checkAuth, users.deactivateAccount);
};
