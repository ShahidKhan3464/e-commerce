import React, { useEffect } from 'react';
import useOrderStore from '@/store/order';
import Button from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { downloadInvoice } from '@/utils/downloadInvoice';
import {
  getOrderStatusClasses,
  getPaymentStatusClasses
} from '@/utils/statusColors';

export default function OrderDetailPage() {
  const { id } = useParams();
  const { order, fetchOrder, loading } = useOrderStore();

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!order) {
    return (
      <div className="flex items-center justify-center">Order not found.</div>
    );
  }

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh_-_188px)] max-w-5xl mx-auto">
      <div className="bg-white border border-solid border-gray-200 rounded-lg shadow p-6 space-y-6">
        <div className="border-b pb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{order._id.slice(-6)}
          </h1>
          <span
            className={`px-3 py-1 text-xs font-medium capitalize rounded-full ${getOrderStatusClasses(
              order.orderStatus
            )}`}
          >
            {order.orderStatus}
          </span>
        </div>

        <div className="p-3 bg-white border border-solid border-gray-200 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
          <p>{order.shippingAddress.fullName}</p>
          <p>
            {order.shippingAddress.address}, {order.shippingAddress.city}
          </p>
          <p>
            {order.shippingAddress.country} - {order.shippingAddress.postalCode}
          </p>
        </div>

        <div className="p-3 bg-white border border-solid border-gray-200 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <div className="space-y-4">
            {order.products.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border border-solid border-gray-300 p-3 rounded-lg"
              >
                <img
                  alt={item.name}
                  src={`http://localhost:3000${item.image}`}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.category}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${item.price}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-white border border-solid border-gray-200 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${order.totalPrice}
            </span>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-gray-700">Payment</span>
            <span
              className={`px-3 py-1 text-xs font-medium capitalize rounded-full ${getPaymentStatusClasses(
                order.paymentStatus
              )}`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => downloadInvoice(order)}
          >
            Download Invoice
          </Button>
          <Button variant="primary" className="flex-1">
            Track Order
          </Button>
        </div>
      </div>
    </div>
  );
}
