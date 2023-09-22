const { models } = require("./index");

module.exports = {
  createProduct: async (body) => {
    try {
      return await models.Products.create({ ...body });
    } catch (error) {
      return error;
    }
  },

  getProductById: async (id) => {
    try {
      return await models.Products.findByPk(id);
    } catch (error) {
      return error;
    }
  },
};
