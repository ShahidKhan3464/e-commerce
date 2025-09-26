import api from './api';

const orderService = {
  getOrders: async ({ page, limit, search = '' }) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (search) params.append('search', search);

    const { data } = await api.get(`/orders?${params.toString()}`);
    return data;
  },

  getOrderById: async (id) => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  createOrder: async (payload) => {
    const { data } = await api.post('/orders', payload);
    return data;
  },

  updateOrderStatus: async (id, payload) => {
    const { data } = await api.patch(`/orders/${id}/status`, payload);
    return data;
  },

  updatePaymentStatus: async (id, payload) => {
    const { data } = await api.patch(`/orders/${id}/payment`, payload);
    return data;
  }
};

export default orderService;
