const router = require("express").Router();

const cartController = require("../controllers/cartController");

router.post("/addToCart", cartController.addToCart);

module.exports = router;
