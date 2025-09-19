import { create } from 'zustand';
import adminService from '@/services/admin';

const useDashboardStore = create((set) => ({
  stats: { users: 0, orders: 0, products: 0, revenue: 0, monthlySales: [] },
  latestOrders: [],
  latestProducts: [],

  // For user dashboard
  userOrders: [],

  fetchDashboardData: async () => {}, // admin data

  fetchUserDashboard: async () => {
    try {
      // fetch orders of the logged-in user
      const res = await adminService.getUserOrders(); // call backend API for user's orders
      set({ userOrders: res });
    } catch (error) {
      console.error('User dashboard fetch error:', error);
    }
  }
}));

export default useDashboardStore;
