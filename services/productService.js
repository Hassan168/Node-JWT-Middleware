const productModel = require("../models/productModel");

module.exports = {
  createProduct: async (body) => {
    try {
      const product = await productModel.createProduct(body);
      if (product) {
        return product;
      }
      return "unable to create product";
    } catch (error) {
      return error;
    }
  },
};
