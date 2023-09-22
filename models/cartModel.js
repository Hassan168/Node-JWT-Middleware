const { models } = require("../models/index");

module.exports = {
  createCart: async (id) => {
    try {
      return await models.Cart.create({
        userId: id,
      });
    } catch (error) {
      return error;
    }
  },
  addToCart: async (body) => {
    try {
      return await models.CartHasProducts.create({ ...body });
    } catch (error) {
      return error;
    }
  },
  uodateCart: async (body) => {
    try {
      return await models.Cart.update(
        { ...body },
        {
          where: { id: body.id },
        }
      );
    } catch (error) {
      return error;
    }
  },

  getCartItemBy: async (productId, cartId) => {
    try {
      return await models.CartHasProducts.findOne({
        where: [{ productId: productId }, { cartId: cartId }],
      });
    } catch (error) {
      return error;
    }
  },

  getCartByUserId: async (userId) => {
    try {
      return await models.Cart.findOne({
        where: { userId: userId },
      });
    } catch (error) {
      return error;
    }
  },
};
