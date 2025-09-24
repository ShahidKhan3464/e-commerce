import Order from '../models/order.js';

const buildFilter = ({ userId, search }) => {
  const filter = { user: userId };

  if (search) {
    filter.$or = [{ name: { $regex: search.trim(), $options: 'i' } }];
  }

  return filter;
};

export const createOrder = async (data) => {
  const order = new Order(data);
  return await order.save();
};

export const findOrders = async (options) => {
  const { skip = 0, limit = 4 } = options;
  const filter = buildFilter(options);
  return await Order.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
};

export const countOrders = async (options) => {
  const filter = buildFilter(options);
  return await Order.countDocuments(filter);
};

export const findOrderById = async (id) => {
  return await Order.findById(id);
};
