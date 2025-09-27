import express from 'express';
import { isAuth } from '../middlewares/index.js';
import { createPaymentHandler } from '../controllers/payment.js';

const router = express.Router();

router.post('/create-payment-intent', isAuth, createPaymentHandler);

export default router;
