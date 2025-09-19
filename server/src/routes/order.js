import express from 'express';
import { createOrderHandler } from '../controllers/order.js';

const router = express.Router();

router.post('/', createOrderHandler);

export default router;
