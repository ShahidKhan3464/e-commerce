import { create } from 'zustand';
import authStorage from '@/utils/auth';
import authService from '@/services/auth';

const useAuthStore = create((set) => ({
  error: null,
  loading: false,
  user: authStorage.getUser() || null,
  token: authStorage.getToken() || null,

  // ✅ Login
  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await authService.login(payload);
      authStorage.setUser(res.data.user);
      authStorage.setToken(res.data.token);
      set({ user: res.data.user, token: res.data.token, loading: false });
      return res;
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
      throw err;
    }
  },

  // ✅ Register
  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await authService.register(payload);
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

  // ✅ Forgot Password
  forgotPassword: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await authService.forgotPassword(payload);
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

  // ✅ Reset Password
  resetPassword: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await authService.resetPassword(payload);
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

  // ✅ Logout
  logout: () => {
    authStorage.clear();
    set({ user: null, token: null });
  }
}));

export default useAuthStore;
