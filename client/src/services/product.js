import api from './api';

const productService = {
  getProducts: async (query = '') => {
    const { data } = await api.get(`/products${query}`);
    return data;
  },
  getProductById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  // Admin actions (requires token)
  createProduct: async (payload) => {
    const { data } = await api.post('/products', payload);
    return data;
  },
  updateProduct: async (id, payload) => {
    const { data } = await api.put(`/products/${id}`, payload);
    return data;
  },
  deleteProduct: async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  }
};

export default productService;
