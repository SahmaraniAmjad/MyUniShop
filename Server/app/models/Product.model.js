const sql = require("./db.js");
var _ = require("lodash");
const ProductImage = require("./ProductImage.model.js");
const jwt = require("jsonwebtoken");
const AuthCofig = require("../config/auth.config.js");
const { replace } = require("lodash");

const Product = function (product) {
  this.id = product.id;
  this.name = product.name;
  this.description = product.description;
  this.category_id = product.category_id;
  this.status_id = product.status_id;
  this.price = product.price;
};

Product.create = (newProduct) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
      if (err) {
        console.log("error while creating product");
        reject(err);
      } else {
        const product = {
          ...newProduct,
          id: res.insertId,
        };
        resolve(product);
      }
    });
  });
};

Product.createAsync = async (product) => {
  return await Product.create(product);
};

// Begin: Update Product Status
Product.updateStatus = (req, result) => {
  const status_id = req.body.status_id;
  const id = req.params.id;

  /* sql.query("SELECT id from product WHERE status_id=2", function (err, result) {​​​​​
     if (err){ 
     throw err;
     console.log(result);

      } else {
       const sqlUpdate = "UPDATE product SET status_id=? WHERE id=?";
       sql.query(sqlUpdate, [status_id, id], (err, res) => {
         if(err) {
         console.log(err);
         } else {
           result(null, res);
         }
       });
   }
 })*/
};

// Finish: Update Product Status

Product.getAll = (result) => {
  sql.query("SELECT * FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    const response = res.map((product) => {
      return ProductImage.findImagesByProductIdAsync(product.id)
        .then((images) => {
          return {
            ...product,
            images: images,
          };
        })
        .catch((err) => console.log(err));
    });

    Promise.all(response).then((data) => result(null, data));
  });
};

Product.getProductsByUser = (userId, result) => {
  const sql_query = `
  SELECT * FROM product
  NATURAL JOIN posted_item
  WHERE posted_item.user_id = ${userId};`;

  sql.query(sql_query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    const response = res.map((product) => {
      return ProductImage.findImagesByProductIdAsync(product.id)
        .then((images) => {
          return {
            ...product,
            images: images,
          };
        })
        .catch((err) => console.log(err));
    });

    Promise.all(response).then((data) => result(null, data));
  });
};

// 1. Basic Header is Missing
// 2. Inline Comments are Missing
const filterQueryBuilder = (filters) => {
  let query = `SELECT * FROM product`;

  if (filters) {
    filterAdded = false;
    query = query.concat(" where ");
    if (filters.name) {
      query = query.concat(` product.name LIKE '%${filters.name}%' `);
      filterAdded = true;
    }
    if (filters.category) {
      if (filterAdded) {
        query = query.concat(" and ");
      }
      query = query.concat(` product.category_id = ${filters.category} `);
      filterAdded = true;
    }
    if (filters.priceMin) {
      if (filterAdded) {
        query = query.concat(" and ");
      }
      query = query.concat(` product.price >= ${filters.priceMin} `);
      filterAdded = true;
    }
    if (filters.priceMax) {
      if (filterAdded) {
        query = query.concat(" and ");
      }
      query = query.concat(` product.price <= ${filters.priceMax} `);
    }
    if (filters.statusId && filters.statusId != 0) {
      if (filterAdded) {
        query = query.concat(" and ");
      }
      query = query.concat(` product.status_id = ${filters.statusId} `);
    }
  }
  return query;
};

// 1. Basic Header is Missing
// 2. Inline Comments are Missing
Product.search = (filters, result) => {
  sql.query(filterQueryBuilder(filters), (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (_.isEmpty(res)) {
      Product.getProducts(filters.statusId, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        } else {
          console.clear();
          result(null, {
            products: res,
            empty: true,
          });
        }
      });
    } else {
      const response = res.map((product) => {
        return ProductImage.findImagesByProductIdAsync(product.id)
          .then((images) => {
            return {
              ...product,
              images: images,
            };
          })
          .catch((err) => console.log(err));
      });

      Promise.all(response).then((data) => result(null, data));
    }
  });
};

//Begin : Fetch Active Products Order By Date
Product.getAllActiveProducts = (result) => {
  sql.query(
    "SELECT p.name, p.description, p.price, p.status_id, p_item.posted_date, p_item.review_date, p_image.image_url FROM product p INNER JOIN posted_item p_item ON p.id = p_item.product_id INNER JOIN product_image p_image ON p_image.product_id = p.id WHERE p.status_id = 2 ORDER BY p_item.posted_date DESC",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};
//END : Fetch Active Products Order By Date

// 1. Basic Header is Missing
// 2. Inline comments are missing
Product.getProducts = (status_id, result) => {
  let query;
  if (status_id != 0) {
    query = "SELECT * FROM product where status_id=" + status_id;
  } else {
    // get all products
    query = "SELECT * FROM product";
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    const response = res.map((product) => {
      return ProductImage.findImagesByProductIdAsync(product.id)
        .then((images) => {
          return {
            ...product,
            images: images,
          };
        })
        .catch((err) => console.log(err));
    });

    Promise.all(response).then((data) => result(null, data));
  });
};

//Begin : Fetch Specific Product by ID
Product.getSpecificProductByID = (productId, token, result) => {
  const query = `SELECT p.id, p.name, p.description, p.price, p.status_id ,p_item.review_date, p_image.image_url,  u.id as user_id,u.email, u.first_name, u.last_name, a.state , a.phone_number 
      FROM product p 
      INNER JOIN posted_item p_item ON p.id = p_item.product_id 
      INNER JOIN product_image p_image ON p_image.product_id = p.id 
      INNER JOIN user u ON u.id = p_item.user_id 
      INNER JOIN address a ON a.id = p_item.address_id WHERE p.id=${productId}`;
  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    const row = res[0];
    const response = res.map((product) => {
      return ProductImage.findImagesByProductIdAsync(product.id)
        .then((images) => {
          return {
            ...product,
            images: images,
          };
        })
        .catch((err) => console.log(err));
    });

    Promise.all(response).then((data) => {
      if (token !== "null") {
        const decoded = jwt.verify(token, AuthCofig.JWT_KEY);
        if (decoded.isAdmin || row.user_id === decoded.userId) {
          result(null, data);
        } else if (row.status_id === 2) {
          result(null, data);
        }
      } else {
        if (row.status_id === 2) {
          result(null, data);
        }
      }
    });
  });
};
// End : Fetch Specific Product by ID

Product.updateProductStatus = (product, result) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "Update product SET status_id=? WHERE id=?",
      [product.status_id, product.id],
      (err, res) => {
        if (err) {
          console.log("error while updating product");
          reject(err);
        }

        console.log("product updated", { id: product.id });
        resolve({ id: product.id });
      }
    );
  });
};
module.exports = Product;
