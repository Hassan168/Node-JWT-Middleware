const userService = require("../services/userService");
const joi = require("joi");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

//MAIL SERVICE
const mailservice = require("../services/mailService");
//MAIL SERVICE

const createUserSchema = joi.object({
  fname: joi.string().required().min(3).max(35),
  lname: joi.string().required().min(3).max(35),
  email: joi.string().email().required(),
  password: joi.string().required(),
  roleId: joi.number().required(),
});

const getUserByEmail = joi.object({
  email: joi.string().email().required(),
});

const userIdSchema = joi.object({
  id: joi.number().required(),
});

const updateUserSchema = joi.object({
  id: joi.number().required(),
  fname: joi.string().required().min(3).max(35),
  lname: joi.string().required().min(3).max(35),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const getUserSchema = joi.object({
  pageNo: joi.number().required(),
  limit: joi.number().required(),
  fname: joi.string(),
  lname: joi.string(),
  email: joi.string(),
  roleId: joi.string(),
  colName: joi.string(),
  orderValue: joi.string(),
});

module.exports = {
  createUser: async function (req, res) {
    try {
      const validate = await createUserSchema.validateAsync(req.body);
      if (validate.error) {
        res.status(StatusCodes.BAD_REQUEST).send({
          data: {},
          message: ReasonPhrases.BAD_REQUEST,
          error: validate.error,
        });
      }
      const response = await userService.createUser(validate);
      res.status(StatusCodes.OK).send({
        data: { response },
        message: ReasonPhrases.OK,
        error: {},
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send({
        data: {},
        message: ReasonPhrases.NOT_FOUND,
        error: error,
      });
    }
  },

  getAllUsers: async function (req, res) {
    try {
      const validate = await getUserSchema.validateAsync(req.query);
      if (validate.error) {
        res.status(StatusCodes.BAD_REQUEST).send({
          data: {},
          message: ReasonPhrases.BAD_REQUEST,
          error: validate.error,
        });
      }
      const response = await userService.getAllUsers(validate);

      res.status(StatusCodes.OK).send({
        data: { response },
        message: ReasonPhrases.OK,
        error: {},
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send({
        data: {},
        message: ReasonPhrases.NOT_FOUND,
        error: error,
      });
    }
  },

  getUserByEmail: async function (req, res) {
    try {
      const validate = await getUserByEmail.validateAsync(req.query);
      if (validate.error) {
        res.status(StatusCodes.BAD_REQUEST).send({
          data: {},
          message: ReasonPhrases.BAD_REQUEST,
          error: validate.error,
        });
      }
      const response = await userService.getUserByEmail(validate.email);
      res.status(StatusCodes.OK).send({
        data: { response },
        message: ReasonPhrases.OK,
        error: {},
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send({
        data: {},
        message: ReasonPhrases.NOT_FOUND,
        error: error,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const validate = await updateUserSchema.validateAsync(req.body);
      if (validate.error) {
        res.status(StatusCodes.BAD_REQUEST).send({
          data: {},
          message: ReasonPhrases.BAD_REQUEST,
          error: validate.error,
        });
      }
      const response = await userService.updateUser(validate);
      res.status(StatusCodes.OK).send({
        data: { response },
        message: "successfully updated!",
        error: {},
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send({
        data: {},
        message: "unable to update",
        error: error,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const validate = await userIdSchema.validateAsync(req.query);
      if (validate.error) {
        res.status(StatusCodes.BAD_REQUEST).send({
          data: {},
          message: ReasonPhrases.BAD_REQUEST,
          error: validate.error,
        });
      }
      const response = await userService.deleteUser(validate.id);
      res.status(StatusCodes.OK).send({
        data: { response },
        message: "successfully deleted!",
        error: {},
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send({
        data: {},
        message: "unable to delete",
        error: error,
      });
    }
  },
  /////////////////////////////////////////////////////
  // emailservice

  mailservice: async (req, res) => {
    const response = await mailservice.sendEmail();

    res.send(response);
  },
};
