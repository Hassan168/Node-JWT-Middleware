const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const { jwtSecret } = require("../config.json");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (body) => {
    try {
      const user = await authModel.login(body.email);
      if (user) {
        const check = await bcrypt.compare(body.password, user.password);

        if (check) {
          delete user.dataValues.password;
          const accessTokenSecret = jwtSecret.secret;

          const accessToken = jwt.sign(
            { user: user.dataValues },
            accessTokenSecret
          );

          return accessToken;
        }
        return "incorrect email or password";
      }
      return "incorrect email or password";
    } catch (error) {
      return error;
    }
  },
};
