// Order status colors
export const statusColors = {
  shipped: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  delivered: 'bg-green-100 text-green-800'
};

// Payment status colors
export const paymentColors = {
  paid: 'bg-green-100 text-green-800',
  unpaid: 'bg-red-100 text-red-800',
  refunded: 'bg-yellow-100 text-yellow-800'
};

export const getOrderStatusClasses = (status) =>
  statusColors[status] || 'bg-gray-100 text-gray-800';

export const getPaymentStatusClasses = (status) =>
  paymentColors[status] || 'bg-gray-100 text-gray-800';
