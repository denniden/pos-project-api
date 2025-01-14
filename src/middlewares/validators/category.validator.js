const Joi = require('joi');
const { ResponseError } = require('../../errors');

const categoryValidator = {
  createCategory: (req, res, next) => {
    try {
      // validate req.body
      const schemaBody = Joi.object({
        name: Joi.string().required(),
      }).required();
      const resultBody = schemaBody.validate(req.body);
      if (resultBody.error)
        throw new ResponseError(
          resultBody.error?.message || resultBody.error,
          400
        );

      // validate req.file
      const schemaFile = Joi.required().label('image');
      const resultFile = schemaFile.validate(req.file);
      if (resultFile.error)
        throw new ResponseError(
          resultFile.error?.message || resultFile.error,
          400
        );

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  editCategoryById: (req, res, next) => {
    try {
      // validate req.params
      const schemaParams = Joi.object({
        id: Joi.number().min(1).required(),
      }).required();
      const resultParams = schemaParams.validate(req.params);
      if (resultParams.error)
        throw new ResponseError(
          resultParams.error?.message || resultParams.error,
          400
        );

      // validate req.body
      const schemaBody = Joi.object({ name: Joi.string() });
      const resultBody = schemaBody.validate(req.body);
      if (resultBody.error)
        throw new ResponseError(
          resultBody.error?.message || resultBody.error,
          400
        );

      // validate req.file
      const schemaFile = Joi.optional().label('image');
      const resultFile = schemaFile.validate(req.file);
      if (resultFile.error)
        throw new ResponseError(
          resultFile.error?.message || resultFile.error,
          400
        );

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  deleteCategoryById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().min(1).required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error)
        throw new ResponseError(result.error?.message || result.error, 400);

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = categoryValidator;
