import express from 'express';
import { isAuth, upload } from '../middlewares/index.js';
import { validateProduct } from '../validations/index.js';
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
router.delete('/:id', isAuth, deleteProductHandler);
router.post(
  '/',
  isAuth,
  validateProduct,
  upload.single('image'),
  createProductHandler
);
router.put(
  '/:id',
  isAuth,
  validateProduct,
  upload.single('image'),
  updateProductHandler
);

export default router;
