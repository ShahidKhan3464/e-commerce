import express from 'express';
import { validateLogin, validateSignup } from '../validations/index.js';
import {
  userLoginHandler,
  userRegisterHandler,
  resetPasswordHandler,
  forgotPasswordHandler
} from '../controllers/auth.js';

const router = express.Router();

router.post('/reset-password', resetPasswordHandler);
router.post('/login', validateLogin, userLoginHandler);
router.post('/forgot-password', forgotPasswordHandler);
router.post('/register', validateSignup, userRegisterHandler);

export default router;
