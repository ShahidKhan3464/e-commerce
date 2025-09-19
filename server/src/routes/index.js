import express from 'express';
import authRoutes from './auth.js';
import orderRoutes from './order.js';
import productRoutes from './product.js';
import paymentRoutes from './payment.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/payments', paymentRoutes);

router.get('/status', (req, res) => {
  res.send('Server is up and running');
});

export default router;
