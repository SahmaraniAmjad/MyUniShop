const { query } = require("../models/db.js");
const Product = require("../models/Product.model.js");
const ProductImage = require("../models/ProductImage.model.js");
const Address = require("../models/Address.model.js");
const PostedItem = require("../models/PostedItem.model.js");
const { DateTime } = require("luxon");
const jwt = require("jsonwebtoken");
const AuthCofig = require("../config/auth.config.js");

const _ = require("lodash");
const { isNull } = require("lodash");

// Begin: update the status of the product

exports.updateStatus = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "invalid request body",
    });
  }
  Product.updateStatus(req, (err, result) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Server error",
      });
    } else {
      res.status(200).send({
        message: result.message,
      });
    }
  });
};

// Finish: update the status of the product

// create product
const createProduct = async (req) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    category_id: req.body.category_id,
    status_id: 1,
    price: req.body.price,
    files: req.files,
  });

  return await Product.createAsync(product);
};

// create address
const createAddress = async (req) => {
  const parsedAddress = JSON.parse(req.body.address);
  const address = new Address({
    name: parsedAddress.name,
    street: parsedAddress.street,
    post_code: parsedAddress.post_code,
    state: parsedAddress.state,
    city: parsedAddress.city,
    country: parsedAddress.country,
    phone_number: parsedAddress.phone_number,
  });
  return await Address.create(address);
};

// create posted item
const createPostemItem = async (req, productId, addressId) => {
  const postedItem = new PostedItem({
    product_id: productId,
    user_id: req.body.userData.userId,
    posted_date: DateTime.utc().toJSDate(),
    address_id: addressId,
  });
  return await PostedItem.createAsync(postedItem);
};

// create product images
const createProductImages = async (req, productId) => {
  if (req.files) {
    if (req.files.images && req.files.images.length) {
      const productImageResponse = await Promise.all(
        req.files.images.map(async (img) => {
          return await ProductImage.uploadAsync({
            file: img,
            product_id: productId,
          });
        })
      );

      return { images: productImageResponse };
    } else if (req.files.images) {
      const productImageResponse = await ProductImage.uploadAsync({
        file: req.files.images,
        product_id: productId,
      });

      return { images: productImageResponse };
    }
  }
};

// Create and Save a new Product
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "invalid request body",
    });
  }

  try {
    let response = {};

    const product = await createProduct(req);

    const address = await createAddress(req);

    const postedItem = await createPostemItem(req, product.id, address.id);

    const productImages = await createProductImages(req, product.id);

    response = {
      ...product,
      address: { ...address },
      postedItem: { ...postedItem },
      ...productImages,
    };
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Server error",
    });
  }
};

// Search a Specific Product in the database by provided filters
// 1. Inline Commets are missing
exports.findAll = (req, res) => {
  if (_.isEmpty(req.query)) {
    Product.getProducts(req.query.statusId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products.",
        });
      else res.send(data);
    });
  } else {
    Product.search(req.query, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Server error",
        });
      } else res.send(data);
    });
  }
};

//Begin : Fetch Active Products Order By Date
exports.findAllActiveProducts = (req, res) => {
  Product.getAllActiveProducts((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};
//get products based on status id or zero for all / active /pending/rejected
exports.getProducts = (req, res) => {
  console.log(req.params.id);

  Product.getProducts(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

// End : Fetch Active Products Order By Date

//Begin : Fetch Specific Product by ID
exports.getSpecificProduct = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "invalid request body",
    });
  }

  const productId = req.params.id;

  let isAdmin = 0;
  let userId;
  const token = req.headers.authorization.split(" ")[1];
  if (token != "null") {
    const decoded = jwt.verify(token, AuthCofig.JWT_KEY);
    isAdmin = decoded.isAdmin;
    userId = decoded.userId;
  }
  Product.getSpecificProductByID(productId, token, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Server error",
      });
    } else {
      res.send(data);
    }
  });
};
// End : Fetch Specific Product by ID

// get all products by user
exports.getProductsByUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "invalid request",
    });
  }

  if (req.body.userData && req.body.userData.userId) {
    Product.getProductsByUser(req.body.userData.userId, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Server error",
        });
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(401).send({
      message: "unauthorized request",
    });
  }
};
// End : get all products by user

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "invalid request body",
    });
  }

  try {
    let response = {};
    const product = new Product({
      id: req.body.product_id,
      status_id: req.body.status_id,
    });
    const productResponse = await Product.updateProductStatus(product);
    const postedItem = new PostedItem({
      product_id: productResponse.id,
      reviewed_by: req.body.userData.userId,
      reviewed_date: DateTime.utc().toJSDate(),
    });
    const postedItemResponse = await PostedItem.updateAsync(postedItem);

    response = {
      ...productResponse,

      postedItem: { ...postedItemResponse },
      ...response,
    };

    console.log(response);
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Server error",
    });
  }
};
