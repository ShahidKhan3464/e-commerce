import express from 'express';
import { isAuth } from '../middlewares/index.js';
import {
  getUserHandler,
  blockUserHandler,
  deleteUserHandler,
  updateUserHandler,
  getAllUsersHandler
} from '../controllers/user.js';

const router = express.Router();

router.get('/:id', isAuth, getUserHandler);
router.get('/', isAuth, getAllUsersHandler);
router.put('/:id', isAuth, updateUserHandler);
router.delete('/:id', isAuth, deleteUserHandler);
router.patch('/:id/toggleBlock', isAuth, blockUserHandler);

export default router;
