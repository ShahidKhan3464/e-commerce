import { exceptionResponse } from '../utils/apiResponse.js';
import {
  userLogin,
  userRegister,
  resetPassword,
  forgotPassword
} from '../services/auth.js';

export const userRegisterHandler = async (req, res) => {
  try {
    await userRegister(req.body, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const userLoginHandler = async (req, res) => {
  try {
    await userLogin(req.body, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const forgotPasswordHandler = async (req, res) => {
  try {
    await forgotPassword(req.body, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const resetPasswordHandler = async (req, res) => {
  try {
    await resetPassword(req.body, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};
