import { create } from 'zustand';
import productService from '@/services/product';

const useProductStore = create((set) => ({
  error: null,
  products: [],
  product: null,
  loading: false,

  fetchProducts: async (query = '') => {
    set({ loading: true });
    try {
      const res = await productService.getProducts(query);
      set({ products: res, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await productService.getProductById(id);
      set({ product: res, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));

export default useProductStore;
