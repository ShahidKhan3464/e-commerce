import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import {
  getUserHandler,
  blockUserHandler,
  deleteUserHandler,
  getAllUsersHandler
} from '../controllers/user.js';

const router = express.Router();

router.get('/:id', isAuth, getUserHandler);
router.get('/', isAuth, getAllUsersHandler);
router.delete('/:id', isAuth, deleteUserHandler);
router.patch('/:id/toggleBlock', isAuth, blockUserHandler);

export default router;
