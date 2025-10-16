import { create } from 'zustand';
import dashboardService from '@/services/dashboard';

const useDashboardStore = create((set) => ({
  loading: false,
  userData: { metrics: {}, charts: {}, tables: {} },
  adminData: { metrics: {}, charts: {}, tables: {} },

  fetchAdminDashboard: async () => {
    set({ loading: true });
    try {
      const response = await dashboardService.getAdminDashboard();
      set({ adminData: response.data.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchUserDashboard: async () => {
    set({ loading: true });
    try {
      const response = await dashboardService.getUserDashboard();
      set({ userData: response.data.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  }
}));

export default useDashboardStore;
