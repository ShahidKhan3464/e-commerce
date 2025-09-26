import { exceptionResponse, successResponse } from '../utils/apiResponse.js';
import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  updatePaymentStatusService
} from '../services/order.js';

export const createOrderHandler = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      user: req.body.userId
    };
    await createOrderService(orderData, res);
  } catch (err) {
    return exceptionResponse(res, err);
  }
};

export const getOrderHandler = async (req, res) => {
  try {
    const product = await getOrderByIdService(req.params.id, req.user, res);
    return successResponse(res, product, 'Success');
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const getAllOrdersHandler = async (req, res) => {
  try {
    await getAllOrdersService(req.query, req.user, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const updateOrderStatusHandler = async (req, res) => {
  try {
    await updateOrderStatusService(req.params.id, req.body, req.user, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const updatePaymentStatusHandler = async (req, res) => {
  try {
    await updatePaymentStatusService(req.params.id, req.body, req.user, res);
  } catch (error) {
    return exceptionResponse(res, error);
  }
};
