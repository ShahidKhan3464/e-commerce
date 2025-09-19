import { createOrderService } from '../services/order.js';
import { exceptionResponse } from '../utils/apiResponse.js';

export const createOrderHandler = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      user: req.body.userId
    };
    await createOrderService(orderData, res);
  } catch (err) {
    return exceptionResponse(res, err);
  }
};
