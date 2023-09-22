const userModel = require("../models/userModel");
const cartModel = require("../models/cartModel");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async function (body) {
    try {
      const saltRounds = 10;
      body.password = await bcrypt.hash(body.password, saltRounds);
      const response = await userModel.createUser(body);
      if (response) {
        delete response.dataValues.password;
        const cart = await cartModel.createCart(response.dataValues.id);
        if (cart) {
          return {
            user: response,
            cart: cart,
          };
        }
        const deleteUser = await userModel.deleteUser(response.dataValues.id);
        if (deleteUser) {
          return "unable to create User";
        }
      }
      return "user not created";
    } catch (error) {
      return error;
    }
  },

  getAllUsers: async function (query) {
    try {
      const offset = (query.pageNo - 1) * query.limit;
      const response = await userModel.getAllUsers(query, offset);
      if (response) {
        return response;
      }
      return "No Data Exists";
    } catch (error) {
      return error;
    }
  },

  getUserByEmail: async function (email) {
    try {
      const response = await userModel.getUserByEmail(email);
      if (response) {
        return response;
      }
      return "No Such User Exists";
    } catch (error) {
      return error;
    }
  },

  updateUser: async (body) => {
    try {
      const user = await userModel.getUserById(body.id);
      if (!user) {
        return "no such user exists";
      }

      const response = await userModel.updateUser(body);
      if (response) {
        return response;
      }
      return "unable to update";
    } catch (error) {
      return error;
    }
  },

  deleteUser: async (id) => {
    try {
      const user = await userModel.getUserById(id);
      if (!user) {
        return "no such user exists";
      }

      const response = await userModel.deleteUser(id);
      if (response) {
        return response;
      }
      return "unable to delete";
    } catch (error) {
      return error;
    }
  },
};
