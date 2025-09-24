import { errorResponse, successResponse } from '../utils/apiResponse.js';
import {
  findUsers,
  countUsers,
  findUserById,
  findUserByIdAndDelete,
  findUserByIdAndUpdate
} from '../repositories/user.js';

export const getUserByIdService = async (id, res) => {
  const user = await findUserById(id);
  if (!user) {
    return errorResponse(res, 'User not found.', 404);
  }
  return user;
};

export const getAllUsersService = async (filters = {}, res) => {
  const page = parseInt(filters.page, 5) || 1;
  const limit = parseInt(filters.limit, 5) || 5;
  const search = filters.search ? String(filters.search).trim() : '';
  const skip = (page - 1) * limit;

  const filterOptions = { skip, limit, search };

  const total = await countUsers(filterOptions);
  const users = await findUsers(filterOptions);

  const pagination = {
    page,
    total,
    limit,
    totalPages: Math.ceil(total / limit)
  };

  return successResponse(res, { users, pagination }, 'Success');
};

export const deleteUserService = async (id, res) => {
  const user = await getUserByIdService(id, res);
  await findUserByIdAndDelete(id);
  return successResponse(res, user, 'Successfully Deleted');
};

export const updateUserService = async (id, data, res) => {
  const user = await getUserByIdService(id, res);
  await findUserByIdAndUpdate(id, data);
  return successResponse(res, user, 'Successfully Updated');
};

export const blockUserService = async (id, block, res) => {
  const user = await getUserByIdService(id, res);
  user.isBlocked = !!block;
  await user.save();
  return successResponse(
    res,
    user,
    `Successfully ${block ? 'Blocked' : 'Activated'}`
  );
};
