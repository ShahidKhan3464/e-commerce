import Joi from 'joi';
import { errorResponse } from '../utils/apiResponse.js';

const signupSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Name must be a string'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required'
  })
});

export const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 422);
  }
  next();
};
