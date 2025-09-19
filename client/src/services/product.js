import api from './api';

const productService = {
  getProducts: async ({
    page,
    limit,
    category,
    minPrice,
    maxPrice,
    search = ''
  }) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    const { data } = await api.get(`/products?${params.toString()}`);
    return data;
  },

  getProductById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  createProduct: async (formData) => {
    const { data } = await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  updateProduct: async (id, formData) => {
    const { data } = await api.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  deleteProduct: async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  }
};

export default productService;
