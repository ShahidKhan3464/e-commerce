import mongoose from 'mongoose';
import Order from '../models/order.js';

const buildFilter = ({ userId, search, isAdmin }) => {
  const filter = {};

  if (!isAdmin && userId) {
    filter.user = userId;
  }

  if (search && mongoose.Types.ObjectId.isValid(search.trim())) {
    filter._id = search.trim();
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
    .populate('user')
    .sort({ createdAt: -1 });
};

export const countOrders = async (options) => {
  const filter = buildFilter(options);
  return await Order.countDocuments(filter);
};

export const findOrderById = async (id) => {
  return await Order.findById(id).populate('user');
};

export const findOrderByIdAndUpdate = async (id, data, options = {}) => {
  return await Order.findByIdAndUpdate(id, data, {
    new: true,
    ...options,
    runValidators: true
  });
};
