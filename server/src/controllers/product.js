import { successResponse, exceptionResponse } from '../utils/apiResponse.js';
import {
  createProductService,
  getProductByIdService,
  getAllProductsService,
  updateProductService,
  deleteProductService
} from '../services/product.js';

// Create a new product
export const createProductHandler = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      user: req.user._id,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };
    await createProductService(productData, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

// Get single product
export const getProductHandler = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id, req.user, res);
    return successResponse(res, product, 'Success');
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

// Get all products
export const getAllProductsHandler = async (req, res) => {
  try {
    await getAllProductsService(req.query, req.user, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

// Update product
export const updateProductHandler = async (req, res) => {
  try {
    let updateData;

    if (req.file) {
      updateData = {
        title: req.body.title,
        price: req.body.price,
        image: `/uploads/${req.file.filename}`
      };
    } else {
      updateData = req.body;
    }

    await updateProductService(req.params.id, updateData, req.user, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

// Delete product
export const deleteProductHandler = async (req, res) => {
  try {
    await deleteProductService(req.params.id, req.user, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};
