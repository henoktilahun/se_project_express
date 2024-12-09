const {Joi, celebrate} = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'the "imageUrl" field must be a valid url',
    }),
  })
})

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "avatar" field must be filled in',
      'string.uri': 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must match the email pattern',
    }),
    password: Joi.string().required().messages({
      "string.password": 'The "password" field is required',
    }),
  })
})

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": 'The "email" field must match the email pattern',
    }),
    password: Joi.string().required().messages({
      "string.password": 'The "password" field is required',
    }),
  })
})

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.empty": 'The "id" field must be filled in',
      "string.length": 'The maximum length of the "id" field is 24',
    }),
  }),
})

module.exports = {validateClothingItem, validateUser, validateUserLogin, validateId}