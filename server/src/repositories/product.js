import Product from '../models/product.js';

const buildFilter = ({ userId, search, category, minPrice, maxPrice }) => {
  const filter = { user: userId };

  if (category) {
    filter.category = { $regex: `^${category}$`, $options: 'i' };
  }

  if (search) {
    filter.$or = [{ name: { $regex: search.trim(), $options: 'i' } }];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  return filter;
};

const buildSort = (sortBy) => {
  switch (sortBy) {
    case 'priceLowHigh':
      return { price: 1 };
    case 'priceHighLow':
      return { price: -1 };
    case 'newest':
      return { createdAt: -1 };
    default:
      return {};
  }
};

export const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

export const findProducts = async (options) => {
  const { skip = 0, limit = 4, sortBy } = options;
  const filter = buildFilter(options);
  const sort = buildSort(sortBy);

  return await Product.find(filter).skip(skip).limit(limit).sort(sort);
};

export const countProducts = async (options) => {
  const filter = buildFilter(options);
  return await Product.countDocuments(filter);
};

export const findProductById = async (id) => {
  return await Product.findById(id);
};

export const findProductByIdAndUpdate = async (id, data, options = {}) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    ...options
  });
};

export const findProductByIdAndDelete = async (id) => {
  return await Product.findByIdAndDelete(id);
};

export const getProductsByPriceRange = async (minPrice, maxPrice) => {
  return await Product.find({
    price: { $gte: minPrice, $lte: maxPrice }
  });
};
