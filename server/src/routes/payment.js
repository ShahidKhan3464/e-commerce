import express from 'express';
import { createPaymentHandler } from '../controllers/payment.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentHandler);

export default router;
