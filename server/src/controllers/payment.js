import { exceptionResponse } from '../utils/apiResponse.js';
import { createPaymentIntent } from '../services/payment.js';

export const createPaymentHandler = async (req, res) => {
  try {
    const paymentIntent = await createPaymentIntent(req.body);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return exceptionResponse(res, err);
  }
};
