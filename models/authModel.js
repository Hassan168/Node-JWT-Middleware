const { models } = require("./index");

module.exports = {
  login: async (email) => {
    try {
      return await models.User.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
