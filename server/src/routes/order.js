import express from 'express';
import { validateOrder } from '../validations/index.js';
import { isAuth, isAdmin } from '../middlewares/index.js';
import {
  getOrderHandler,
  createOrderHandler,
  getAllOrdersHandler,
  updateOrderStatusHandler,
  updatePaymentStatusHandler
} from '../controllers/order.js';

const router = express.Router();

router.get('/:id', isAuth, getOrderHandler);
router.get('/', isAuth, getAllOrdersHandler);
router.post('/', isAuth, validateOrder, createOrderHandler);
router.patch('/:id/status', isAuth, isAdmin, updateOrderStatusHandler);
router.patch('/:id/payment', isAuth, isAdmin, updatePaymentStatusHandler);

export default router;
