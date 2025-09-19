import Order from '../models/order.js';

export const createOrder = async (data) => {
  const order = new Order(data);
  return await order.save();
};
