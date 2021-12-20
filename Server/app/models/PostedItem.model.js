const sql = require("./db.js");
const { updateProductStatus } = require("./Product.model.js");

const PostedItem = function (postedItem) {
  (this.product_id = postedItem.product_id),
    (this.user_id = postedItem.user_id),
    (this.posted_date = postedItem.posted_date),
    (this.reviewed_by = postedItem.reviewed_by),
    (this.review_date = postedItem.reviewed_date),
    (this.review_comment = postedItem.reviewed_comment),
    (this.address_id = postedItem.address_id);
};

const create = (newPostedItem) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO posted_item SET ?", newPostedItem, (err, res) => {
      if (err) {
        console.log("error while creating posted item");
        reject(err);
      } else {
        resolve({ id: res.insertId, ...newPostedItem });
      }
    });
  });
};

PostedItem.createAsync = async (newPostedItem) => {
  return await create(newPostedItem);
};

const update = (postedItem) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE posted_item SET reviewed_by=?, review_date=? where product_id=?",
      [postedItem.reviewed_by, postedItem.review_date, postedItem.product_id],
      (err, res) => {
        if (err) {
          console.log("error while updating posted item");
          reject(err);
        } else {
          console.log(res);
          resolve({ id: res });
        }
      }
    );
  });
};

PostedItem.updateAsync = async (postedItem) => {
  return await update(postedItem);
};

module.exports = PostedItem;
