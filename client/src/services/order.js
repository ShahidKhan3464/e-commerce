import api from './api';

const orderService = {
  createOrder: async (payload) => {
    const { data } = await api.post('/orders', payload);
    return data;
  },
  getMyOrders: async () => {
    const { data } = await api.get('/orders/me');
    return data;
  },
  getAllOrders: async () => {
    const { data } = await api.get('/orders');
    return data;
  }
};

export default orderService;
