import Joi from 'joi';
import { errorResponse } from '../utils/apiResponse.js';

const orderSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        user: Joi.string().required(),
        image: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().min(1).required(),

        __v: Joi.date().optional(),
        createdAt: Joi.date().optional(),
        updatedAt: Joi.date().optional(),
        description: Joi.string().optional()
      })
    )
    .min(1)
    .required(),
  shippingAddress: Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required()
  }).required(),
  totalPrice: Joi.number().min(1).required(),
  paymentIntentId: Joi.string().required()
});

export const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 422);
  }
  next();
};
