import React, { useEffect, useState } from 'react';
import useOrderStore from '@/store/order';
import Button from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { downloadInvoice } from '@/utils/downloadInvoice';
import {
  getOrderStatusClasses,
  getPaymentStatusClasses
} from '@/utils/statusColors';
import Select from '@/components/ui/select';
import toast from 'react-hot-toast';

export default function OrderDetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [payment, setPayment] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const { order, loading, fetchOrder, updateOrderStatus, updatePaymentStatus } =
    useOrderStore();

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus);
      setPayment(order.paymentStatus);
    }
  }, [order]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!order) {
    return (
      <div className="flex items-center justify-center">Order not found.</div>
    );
  }

  const handleStatusUpdate = async () => {
    try {
      setStatusLoading(true);
      await updateOrderStatus(order._id, { orderStatus: status });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setStatusLoading(false);
    }
  };

  const handlePaymentUpdate = async () => {
    try {
      setStatusLoading(true);
      await updatePaymentStatus(order._id, { paymentStatus: payment });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh_-_188px)] max-w-5xl mx-auto">
      <div className="bg-white border border-solid border-gray-200 rounded-lg shadow p-6 space-y-6">
        {/* Header */}
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

        {/* Customer Info */}
        <div className="p-3 bg-white border border-solid border-gray-200 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
          <p>
            <span className="font-semibold">Name:</span> {order.user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {order.user.email}
          </p>
          <p>
            <span className="font-semibold">Last Login:</span>{' '}
            {new Date(order.user.lastLogin).toLocaleString()}
          </p>
        </div>

        {/* Shipping Address */}
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

        {/* Products */}
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

        {/* Order Summary */}
        <div className="p-3 bg-white border border-solid border-gray-200 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <div className="flex justify-between">
            <span className="text-gray-700">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${order.totalPrice}
            </span>
          </div>
          <div className="mt-2 flex justify-between">
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

        {/* Admin Controls */}
        <div className="p-3 bg-gray-50 border border-dashed border-gray-300 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold mb-2">Order Actions</h2>
          <div>
            <Select
              value={status}
              placeholder="Select one"
              label="Update Order Status"
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'shipped', label: 'Shipped' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
            />
            <Button
              disabled={statusLoading}
              className="mt-3 !py-1 !px-3"
              onClick={handleStatusUpdate}
            >
              Save Status
            </Button>
          </div>
          <div>
            <Select
              value={payment}
              placeholder="Select one"
              label="Update Payment Status"
              onChange={(e) => setPayment(e.target.value)}
              options={[
                { value: 'paid', label: 'Paid' },
                { value: 'unpaid', label: 'Unpaid' },
                { value: 'refunded', label: 'Refunded' }
              ]}
            />
            <Button
              disabled={statusLoading}
              className="mt-3 !py-1 !px-3"
              onClick={handlePaymentUpdate}
            >
              Save Payment
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="primary"
            className="flex-1"
            disabled={statusLoading}
            onClick={() => downloadInvoice(order)}
          >
            Download Invoice
          </Button>
          <Button disabled={statusLoading} variant="primary" className="flex-1">
            Track Order
          </Button>
        </div>
      </div>
    </div>
  );
}
