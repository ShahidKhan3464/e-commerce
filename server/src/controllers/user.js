import { successResponse, exceptionResponse } from '../utils/apiResponse.js';
import {
  blockUserService,
  deleteUserService,
  updateUserService,
  getAllUsersService,
  getUserByIdService
} from '../services/user.js';

export const getUserHandler = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id, res);
    return successResponse(res, user, 'Success');
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const getAllUsersHandler = async (req, res) => {
  try {
    await getAllUsersService(req.query, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    await updateUserService(req.params.id, req.body, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    await deleteUserService(req.params.id, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const blockUserHandler = async (req, res) => {
  try {
    const { block } = req.body;
    await blockUserService(req.params.id, block, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};
