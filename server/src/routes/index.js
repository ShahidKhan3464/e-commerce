import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import orderRoutes from './order.js';
import productRoutes from './product.js';
import paymentRoutes from './payment.js';
import dashboardRoutes from './dashboard.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/payments', paymentRoutes);
router.use('/dashboard', dashboardRoutes);

router.get('/status', (req, res) => {
  res.send('Server is up and running');
});

export default router;
