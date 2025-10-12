import { errorResponse, successResponse } from '../utils/apiResponse.js';
import { sendEmail } from '../utils/sendMail.js';
import {
  orderConfirmationTemplate,
  orderStatusUpdateTemplate
} from '../emailTemplates/index.js';
import {
  findOrders,
  countOrders,
  createOrder,
  findOrderById,
  findOrderByIdAndUpdate
} from '../repositories/order.js';

export const createOrderService = async (orderData, res) => {
  const order = await createOrder(orderData);
  try {
    const populatedOrder = await findOrderById(order._id);
    const user = populatedOrder.user;
    const html = orderConfirmationTemplate(populatedOrder, user);
    await sendEmail(
      user.email,
      'Order Confirmation - Thank You for Your Purchase!',
      html
    );
  } catch (emailError) {}

  return successResponse(res, order, 'Successfully Created', 201);
};

export const getOrderByIdService = async (id, user, res) => {
  const order = await findOrderById(id);
  if (!order) return errorResponse(res, 'Order not found.', 404);
  if (
    user.role !== 'admin' &&
    order.user._id.toString() !== user._id.toString()
  ) {
    return errorResponse(
      res,
      'Unauthorized: You can only view your own orders',
      403
    );
  }

  return order;
};

export const getAllOrdersService = async (filters = {}, user, res) => {
  const page = parseInt(filters.page, 5) || 1;
  const limit = parseInt(filters.limit, 5) || 5;
  const search = filters.search ? String(filters.search).trim() : '';
  const skip = (page - 1) * limit;

  const filterOptions = {
    skip,
    limit,
    search,
    userId: user._id,
    isAdmin: user.role === 'admin'
  };

  if (user.role !== 'admin') {
    filterOptions.userId = user._id;
  }

  const total = await countOrders(filterOptions);
  const orders = await findOrders(filterOptions);

  const pagination = {
    page,
    total,
    limit,
    totalPages: Math.ceil(total / limit)
  };

  return successResponse(res, { orders, pagination }, 'Success');
};

export const updateOrderStatusService = async (id, data, user, res) => {
  const existingOrder = await getOrderByIdService(id, user, res);
  const previousStatus = existingOrder.orderStatus;
  const updatedOrder = await findOrderByIdAndUpdate(id, data);

  if (data.orderStatus && data.orderStatus !== previousStatus) {
    try {
      const orderUser = updatedOrder.user;
      const html = orderStatusUpdateTemplate(
        updatedOrder,
        orderUser,
        previousStatus
      );
      await sendEmail(
        orderUser.email,
        `Order Status Update - ${data.orderStatus.toUpperCase()}`,
        html
      );
    } catch (emailError) {}
  }

  return successResponse(res, updatedOrder, 'Successfully Updated');
};

export const updatePaymentStatusService = async (id, data, user, res) => {
  await getOrderByIdService(id, user, res);
  const updatedOrder = await findOrderByIdAndUpdate(id, data);
  return successResponse(res, updatedOrder, 'Successfully Updated');
};
