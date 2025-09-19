import { exceptionResponse } from '../utils/apiResponse.js';
import { createPaymentIntent } from '../services/payment.js';

export const createPaymentHandler = async (req, res) => {
  try {
    const { userId, cart, amount } = req.body;
    const paymentIntent = await createPaymentIntent(userId, cart, amount);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return exceptionResponse(res, err);
  }
};
