import express from 'express';
import { isAuth, isAdmin } from '../middlewares/index.js';
import {
  getUserDashboardHandler,
  getAdminDashboardHandler
} from '../controllers/dashboard.js';

const router = express.Router();

router.get('/user', isAuth, getUserDashboardHandler);
router.get('/admin', isAuth, isAdmin, getAdminDashboardHandler);

export default router;
