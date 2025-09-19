import { create } from 'zustand';
import usePaginationStore from './pagination';
import productService from '@/services/product';

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,

  // Fetch all products with pagination & filters
  fetchProducts: async (query = {}) => {
    const pagination = usePaginationStore.getState();
    const { pageSize, currentPage, setTotalPages, setTotalItems } = pagination;

    set({ loading: true });
    try {
      const res = await productService.getProducts({
        ...query,
        limit: pageSize,
        page: currentPage
      });
      setTotalItems(res.data.pagination.total);
      setTotalPages(res.data.pagination.totalPages);
      set({ products: res.data.products, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
    }
  },

  // Fetch single product
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await productService.getProductById(id);
      set({ product: res.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
    }
  },

  // Create new product
  createProduct: async (formData) => {
    set({ loading: true });
    try {
      const res = await productService.createProduct(formData);
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

  // Update existing product
  updateProduct: async (id, formData) => {
    set({ loading: true });
    try {
      const res = await productService.updateProduct(id, formData);
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

  // Delete product
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await productService.deleteProduct(id);
      set({ loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false
      });
      throw err;
    }
  }
}));

export default useProductStore;
