const router = require("express").Router();

const productController = require("../controllers/productController");

router.post("/createProduct", productController.createProduct);

module.exports = router;
