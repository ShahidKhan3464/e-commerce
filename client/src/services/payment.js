import api from './api';

const paymentService = {
  createPayment: async (payload) => {
    const { data } = await api.post('/payments/create-payment-intent', payload);
    return data;
  }
};

export default paymentService;
