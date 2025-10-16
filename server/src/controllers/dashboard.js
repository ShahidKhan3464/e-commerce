import { exceptionResponse, successResponse } from '../utils/apiResponse.js';
import { getAdminDashboardService, getUserDashboardService } from '../services/dashboard.js';

export const getAdminDashboardHandler = async (req, res) => {
  try {
    const dashboardData = await getAdminDashboardService();
    return successResponse(res, dashboardData, 'Admin dashboard data retrieved successfully');
  } catch (error) {
    return exceptionResponse(res, error);
  }
};

export const getUserDashboardHandler = async (req, res) => {
  try {
    const dashboardData = await getUserDashboardService(req.user._id);
    return successResponse(res, dashboardData, 'User dashboard data retrieved successfully');
  } catch (error) {
    return exceptionResponse(res, error);
  }
};