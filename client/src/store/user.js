import { create } from 'zustand';
import userService from '@/services/user';
import usePaginationStore from './pagination';

const useUserStore = create((set) => ({
  users: [],
  user: null,
  error: null,
  loading: false,

  // Fetch all users with pagination & filters
  fetchUsers: async (query = {}) => {
    const pagination = usePaginationStore.getState();
    const { pageSize, currentPage, setTotalPages, setTotalItems } = pagination;

    set({ loading: true });
    try {
      const res = await userService.getUsers({
        ...query,
        limit: pageSize,
        page: currentPage
      });
      setTotalItems(res.data.pagination.total);
      setTotalPages(res.data.pagination.totalPages);
      set({ users: res.data.users, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
    }
  },

  // Fetch single user
  fetchUser: async (id) => {
    set({ loading: true });
    try {
      const res = await userService.getUserById(id);
      set({ user: res.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
    }
  },

  // Update user
  updateUser: async (id, payload) => {
    set({ loading: true });
    try {
      const res = await userService.updateUser(id, payload);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
      throw err;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    set({ loading: true });
    try {
      await userService.deleteUser(id);
      set({ loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
      throw err;
    }
  },

  // Block / unblock user
  onToggleBlock: async (id, payload) => {
    set({ loading: true });
    try {
      const res = await userService.onToggleBlock(id, payload);
      set({ user: res.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
      throw err;
    }
  }
}));

export default useUserStore;
