const { models } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
  createUser: async function (body) {
    try {
      return await models.User.create({ ...body });
    } catch (error) {
      return error;
    }
  },

  getAllUsers: async function (query, offset) {
    try {
      const colName = query.colName ? query.colName : "id";
      const orderValue = query.orderValue ? query.orderValue : "ASC";
      return await models.User.findAndCountAll({
        where: [
          {
            ...(query.fname
              ? { fname: { [Op.substring]: query.fname } }
              : true),
          },
          { ...(query.lname ? { lname: query.lname } : true) },
          { ...(query.email ? { email: query.email } : true) },
          { ...(query.roleId ? { roleId: query.roleId } : true) },
        ],
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: models.Cart,
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          { model: models.Role, attributes: ["role"] },
        ],
        // order: [colName, orderValue],
        limit: query.limit,
        offset: offset,
      });
    } catch (error) {
      return error;
    }
  },

  getUserByEmail: async function (email) {
    try {
      return await models.User.findOne({
        where: {
          email: email,
        },
        attributes: {
          exclude: ["password"],
        },
      });
    } catch (error) {
      return error;
    }
  },

  getUserById: async function (id) {
    try {
      return await models.User.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
    } catch (error) {
      return error;
    }
  },

  updateUser: async (body) => {
    try {
      return await models.User.update(
        { ...body },
        {
          where: {
            id: body.id,
          },
        }
      );
    } catch (error) {
      return error;
    }
  },

  deleteUser: async (id) => {
    try {
      return await models.User.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
