import { create } from 'zustand';
import orderService from '@/services/order';
import usePaginationStore from './pagination';

const useOrderStore = create((set) => ({
  orders: [],
  order: null,
  error: null,
  loading: false,

  fetchOrders: async (query = {}) => {
    const pagination = usePaginationStore.getState();
    const { pageSize, currentPage, setTotalPages, setTotalItems } = pagination;

    set({ loading: true });
    try {
      const res = await orderService.getOrders({
        ...query,
        limit: pageSize,
        page: currentPage
      });
      setTotalItems(res.data.pagination.total);
      setTotalPages(res.data.pagination.totalPages);
      set({ orders: res.data.orders, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
    }
  },

  fetchOrder: async (id) => {
    set({ loading: true });
    try {
      const res = await orderService.getOrderById(id);
      set({ order: res.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
    }
  },

  createOrder: async (payload) => {
    set({ loading: true });
    try {
      const res = await orderService.createOrder(payload);
      set({ loading: false });
      return res;
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
      throw err;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const res = await orderService.updateOrderStatus(id, status);
      return res;
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
      throw err;
    }
  },

  updatePaymentStatus: async (id, paymentStatus) => {
    try {
      const res = await orderService.updatePaymentStatus(id, paymentStatus);
      return res;
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
      throw err;
    }
  }
}));

export default useOrderStore;
