import User from '../models/user.js';

const buildFilter = ({ search, isAdmin }) => {
  const filter = {};
  
  if (!isAdmin) {
    filter.role = { $ne: 'admin' };
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search.trim(), $options: 'i' } },
      { email: { $regex: search.trim(), $options: 'i' } }
    ];
  }

  return filter;
};

export const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

export const findUsers = async (options) => {
  const { skip = 0, limit = 4 } = options;
  const filter = buildFilter(options);

  return await User.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
};

export const countUsers = async (options) => {
  const filter = buildFilter(options);
  return await User.countDocuments(filter);
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByIdAndDelete = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const findUserByIdAndUpdate = async (id, data, options = {}) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    ...options
  });
};
