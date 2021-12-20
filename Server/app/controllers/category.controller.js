const { query } = require('../models/db.js'); // 3.Remove Unused/Unnessary Code
const Category = require('../models/Category.model.js');
const _ = require("lodash");

// Retrieve all products from the database. 
// 1.(Information in Header is not cleared according to the functionality)
// 2. Inline Comments are missing

exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};