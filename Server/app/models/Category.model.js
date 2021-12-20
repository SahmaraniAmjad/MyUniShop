// 1. Basic Header is Missing
// 2. Inline Comments Are Missing
const sql = require("./db.js"); 
var _ = require("lodash");

const Category = function (category) {
  this.id = category.id;
  this.name = category.name;
  this.description = category.description;
  this.image_url = category.image_url; // 3. Unnecessary Code(Not utilizing it. Returning null value everytime)
  this.is_active = category.is_active;
};

Category.getAll = (result) => {
  sql.query("SELECT * FROM category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("category: ", res);
    result(null, res);
  });
};

module.exports = Category;
