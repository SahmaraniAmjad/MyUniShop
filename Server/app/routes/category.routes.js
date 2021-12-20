module.exports = app => {
  const categories = require("../controllers/category.controller.js");
// 1. Some Inline Comments Missing
  // Retrieve all categories
  app.get("/categories", categories.findAll);
};