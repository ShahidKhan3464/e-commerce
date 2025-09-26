import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import {
  findProducts,
  createProduct,
  countProducts,
  findProductById,
  findProductByIdAndUpdate,
  findProductByIdAndDelete
} from '../repositories/product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new product
export const createProductService = async (productData, res) => {
  const product = await createProduct(productData);
  return successResponse(res, product, 'Successfully Created', 201);
};

// Get product by ID with authorization check
export const getProductByIdService = async (id, user, res) => {
  const product = await findProductById(id);
  if (!product) return errorResponse(res, 'Product not found.', 404);
  return product;
};

// Get all products with filters, pagination, sorting
export const getAllProductsService = async (filters = {}, user, res) => {
  const page = parseInt(filters.page, 5) || 1;
  const limit = parseInt(filters.limit, 5) || 5;
  const search = filters.search ? String(filters.search).trim() : '';
  const skip = (page - 1) * limit;

  const filterOptions = {
    skip,
    limit,
    search,
    sortBy: filters.sortBy,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    category: filters.category
  };

  const total = await countProducts(filterOptions);
  const products = await findProducts(filterOptions);

  const pagination = {
    page,
    total,
    limit,
    totalPages: Math.ceil(total / limit)
  };

  return successResponse(res, { products, pagination }, 'Success');
};

// Update product with image handling
export const updateProductService = async (id, updateData, user, res) => {
  const product = await getProductByIdService(id, user, res);

  if (updateData.image && product.image && updateData.image !== product.image) {
    const oldImagePath = path.join(__dirname, `../${product.image}`);
    fs.unlink(oldImagePath, (err) => {
      if (err) console.error('Failed to delete old image:', err);
    });
  }

  const updatedProduct = await findProductByIdAndUpdate(id, updateData);
  return successResponse(res, updatedProduct, 'Successfully Updated');
};

// Delete product with image handling
export const deleteProductService = async (id, user, res) => {
  const product = await getProductByIdService(id, user, res);

  if (product.image) {
    const imagePath = path.join(__dirname, `../${product.image}`);
    fs.unlink(imagePath, (err) => {
      if (err) console.error('Failed to delete image:', err);
    });
  }

  await findProductByIdAndDelete(id);
  return successResponse(res, product, 'Successfully Deleted');
};
