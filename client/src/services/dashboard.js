import api from './api';

const dashboardService = {
  getUserDashboard: () => api.get('/dashboard/user'),
  getAdminDashboard: () => api.get('/dashboard/admin')
};

export default dashboardService;
