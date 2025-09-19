import { createOrder } from '../repositories/order.js';
import { successResponse } from '../utils/apiResponse.js';

export const createOrderService = async (orderData, res) => {
  const order = await createOrder(orderData);
  return successResponse(res, order, 'Successfully Created', 201);
};
