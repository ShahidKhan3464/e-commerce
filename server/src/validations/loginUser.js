import Joi from 'joi';
import { errorResponse } from '../utils/apiResponse.js';

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  })
});

export const validateLogin = (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 422);
  }
  next();
};
