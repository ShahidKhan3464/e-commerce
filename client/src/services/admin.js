import api from './api';

const adminService = {
  getUsers: async (query = '') => {
    const { data } = await api.get(`/admin/users${query}`);
    return data;
  },
  getProducts: async () => {
    const { data } = await api.get('/admin/products');
    return data;
  },
  getOrders: async () => {
    const { data } = await api.get('/admin/orders');
    return data;
  }
};

export default adminService;
