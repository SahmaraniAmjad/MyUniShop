module.exports = (app) => {
  const products = require("../controllers/product.controller.js");
  const checkAuth = require("../middleware/checkAuth");

  // Create a new product
  app.post("/products", checkAuth, products.create);

  // Retrieve all Active Products Order By Date
  app.get("/productsActive", products.findAllActiveProducts);
  
  // Fetch  Products with specific status
  app.get("/productsWithStatus/:id", products.getProducts);

  app.get("/products", products.findAll);

  // Fetch Specific Product by ID
  app.get("/products/:id", products.getSpecificProduct);

  // Retrieve all products by user
  app.get("/my-products", checkAuth, products.getProductsByUser);
  //update product
  app.put("/products/:id", checkAuth, products.update);
};
