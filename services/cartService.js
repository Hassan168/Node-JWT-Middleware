const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

module.exports = {
  addToCart: async (body) => {
    try {
      const productData = await productModel.getProductById(body.productId);
      const cartData = await cartModel.getCartByUserId(body.userId);

      const cartItem = await cartModel.getCartItemBy(
        productData.id,
        cartData.id
      );
      if (cartItem) {
        cartItem.quantity += body.quantity;
        cartItem.total = cartItem.quantity * productModel.price;
        const updateCartItem = await cartModel.uodateCart(cartItem);
        if (updateCartItem) {
          return {
            message: "successfully updated!",
            response: updateCartItem,
          };
        }
        return "unable to update cart";
      }
      const addToCart = {
        quantity: body.quantity,
        total: body.quantity * productData.price,
        cartId: cartData.id,
        productId: productData.id,
      };
      const addCartItem = await cartModel.addToCart(addToCart);
      if (addCartItem) {
        return {
          message: "successfully added to cart!",
          response: addCartItem,
        };
      }
      return "unable to add to cart";
    } catch (error) {
      return error;
    }
  },
};
