import Joi from 'joi';
import { errorResponse } from '../utils/apiResponse.js';

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Product name cannot be empty',
    'string.min': 'Product name must be at least 3 character long',
    'string.max': 'Product name must not exceed 100 characters',
    'any.required': 'Product name is required'
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Price must be a positive number',
    'number.base': 'Price must be a number',
    'any.required': 'Price is required'
  }),
  category: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Category cannot be empty',
    'string.min': 'Category must be at least 3 character long',
    'string.max': 'Category must not exceed 100 characters',
    'any.required': 'Category is required'
  }),
  image: Joi.string().required().messages({
    'any.required': 'File is required'
  })
});

export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 422);
  }
  next();
};
