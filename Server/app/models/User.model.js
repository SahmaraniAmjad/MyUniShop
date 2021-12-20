//this model for managing user functions
const { isNull, _ } = require("lodash");
const sql = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthConfig = require("../config/auth.config.js");
var mysql = require("mysql");

const User = function (User) {
  this.id = User.id;
  this.email = User.email;
  this.password = User.password;
  this.is_admin = User.is_admin;
  this.first_name = User.first_name;
  this.last_name = User.last_name;
  this.address_id = User.address_id;
  this.deactivation_date = User.deactivation_date;
};

User.socketDisconnect = function (socketID) {
  console.log("User Disconnected :" + socketID);

  sql.query(
    "DELETE FROM Socket Where id = ?",
    [socketID],
    function (error, data) {
      if (error) throw error;
    }
  );
};

//get user by email
User.getByEmail = (email, result) => {
  sql.query("SELECT * FROM user WHERE email = ?", email, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result(null, res[0]);
    }
  });
};
//get user by id
User.getById = (id, result) => {
  sql.query("SELECT * FROM user WHERE id = ?", id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result(null, res[0]);
    }
  });
};
//get logged in user details
User.getLoggedInUser = (userData, result) => {
  userId = userData.userId;
  User.getById(userId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else if (_.isNil(res)) {
      result("User not found", null);
    } else {
      result(null, res);
    }
  });
};
//create new user
User.create = (newUser, result) => {
  bcrypt.hash(newUser.password, 10, (err, hash) => {
    if (err) {
      result(err, null);
      return;
    } else {
      //check if user already exists
      newUser.password = hash;
      User.getByEmail(newUser.email, (err, data) => {
        if (err) {
          result(err, null);
          return;
        } else if (!_.isNil(data)) {
          result("User already exists", null);
          return;
        } else {
          //create new user
          sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
            if (err) {
              result(err, null);
              return;
            }
            result(null, { id: res.insertId });
          });
        }
      });
    }
  });
};
//sign in
User.signin = (user, result) => {
  User.getByEmail(user.email, (err, userData) => {
    if (err) {
      result(err, null);
      return;
    } else if (_.isNil(userData)) {
      // user not found
      result("Authentication failed", null);
      return;
    } else {
      //check the password
      bcrypt.compare(user.password, userData.password, (err, res) => {
        if (err) {
          result(err, null);
          return;
        } else if (!res) {
          result("Authentication failed", null);
          return;
        } else {
          const token = jwt.sign(
            {
              email: userData.email,
              userId: userData.id,
              isAdmin: userData.is_admin,
            },
            AuthConfig.JWT_KEY,
            {
              expiresIn: AuthConfig.EXPIRES_IN,
            }
          );
          result(null, token);
        }
      });
    }
  });
};
//change password
User.changePassword = (reqData, result) => {
  User.getLoggedInUser(reqData.userData, (err, user) => {
    if (err) {
      result(err, null);
      return;
    }
    if (isNull(user)) {
      result("Unautorized", null);
      return;
    } else {
      //check the old password
      bcrypt.compare(reqData.oldPassword, user.password, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (!res) {
          result("Wrong old password", null);
          return;
        } else {
          //hash the new password
          bcrypt.hash(reqData.newPassword, 10, (err, hash) => {
            if (err) {
              result(err, null);
              return;
            } else {
              user.password = hash;
              sql.query(
                "UPDATE user SET password= ? WHERE id= ?",
                [user.password, user.id],
                (err, res) => {
                  if (err) {
                    console.log("error while changing password");
                    result(err, null);
                    return;
                  }
                  if (res.affectedRows >= 0) {
                    console.log("User updated", { id: user.id });
                    result(null, { id: user.id });
                  } else {
                    console.log("No User updated");
                    result(null, null);
                  }
                }
              );
            }
          });
        }
      });
    }
  });
};

User.getAll = (onlyActive, result) => {
  if (onlyActive) {
    query = "SELECT * FROM user WHERE deactivation_date IS NULL";
  } else {
    query = "SELECT * FROM user";
  }
  sql.query(query, (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      const users = res.map((row) => {
        return {
          id: row.id,
          email: row.email,
          first_name: row.first_name,
          last_name: row.last_name,
          is_admin: row.is_admin,
          creation_date: row.creation_date,
          deactivation_date: row.deactivation_date,
        };
      });
      result(null, users);
    }
  });
};

module.exports = User;
