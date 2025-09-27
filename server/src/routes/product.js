import express from 'express';
import { validateProduct } from '../validations/index.js';
import { isAuth, isAdmin, upload } from '../middlewares/index.js';
import {
  getProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getAllProductsHandler
} from '../controllers/product.js';

const router = express.Router();

router.get('/:id', isAuth, getProductHandler);
router.get('/', isAuth, getAllProductsHandler);
router.delete('/:id', isAuth, isAdmin, deleteProductHandler);
router.post(
  '/',
  isAuth,
  isAdmin,
  validateProduct,
  upload.single('image'),
  createProductHandler
);
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateProduct,
  upload.single('image'),
  updateProductHandler
);

export default router;
