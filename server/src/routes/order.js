import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { validateOrder } from '../validations/createOrder.js';
import {
  getOrderHandler,
  createOrderHandler,
  getAllOrdersHandler
} from '../controllers/order.js';

const router = express.Router();

router.get('/:id', isAuth, getOrderHandler);
router.get('/', isAuth, getAllOrdersHandler);
router.post('/', isAuth, validateOrder, createOrderHandler);

export default router;
