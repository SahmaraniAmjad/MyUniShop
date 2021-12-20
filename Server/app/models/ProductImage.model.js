const sql = require("./db.js");

const ProductImage = function (productImage) {
  this.product_id = productImage.product_id,
  this.image_url = productImage.image_url ? productImage.image_url : '';
};

const upload = (content, result) => {
  return new Promise((resolve, reject) => {
    const fileName = content.file.name;

    if (content.file.mimetype == "image/jpeg" || content.file.mimetype == "image/png" || content.file.mimetype == "image/gif") {
      const image_url = `/images/products/${content.product_id}/${fileName}`;
      const productImage = new ProductImage({
        product_id: content.product_id,
        image_url: image_url
      });
      content.file.mv('public' + image_url, (err) => {
        if (err) {
          reject(err);
        }

        sql.query("INSERT INTO product_image SET ?", productImage, (err, res) => {
          if (err) {
            reject(err);
          }
          console.log(`image upload at ${image_url}`);
          resolve({ id: res.insertId, ...productImage });
        });
      });
    } else {
      reject(new Error("invalid image format"));
    }
  });
};

ProductImage.uploadAsync =async content => {
  return await upload(content);
}

const findImagesByProductId = (productId, result) => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT image_url FROM product_image WHERE product_id = ?", productId, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    });
  });
};

ProductImage.findImagesByProductIdAsync = async productId => {
  return await findImagesByProductId(productId);
}

module.exports = ProductImage;