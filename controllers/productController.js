const productService = require("../services/productService");
const joi = require("joi");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const createProductSchema = joi.object({
  productName: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().required(),
  size: joi.string().required(),
  color: joi.string().required(),
});

module.exports = {
  createProduct: async (req, res) => {
    try {
      const validate = await createProductSchema.validateAsync(req.body);
      if (validate.error) {
        res.status(StatusCodes.BAD_REQUEST).send({
          data: {},
          message: ReasonPhrases.BAD_REQUEST,
          error: validate.error,
        });
      }

      const response = await productService.createProduct(validate);

      res.status(StatusCodes.OK).send({
        data: { response },
        message: ReasonPhrases.OK,
        error: {},
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send({
        data: {},
        message: "unable to create product",
        error: error,
      });
    }
  },
};
