import { create } from 'zustand';
import orderService from '@/services/order';

const useOrderStore = create((set) => ({
  orders: [],
  error: null,
  loading: false,

  fetchMyOrders: async () => {
    set({ loading: true });
    try {
      const res = await orderService.getMyOrders();
      set({ orders: res, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));

export default useOrderStore;
