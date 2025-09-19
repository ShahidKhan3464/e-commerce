import React, { useEffect } from 'react';
import useOrderStore from '@/store/order';

export default function OrdersPage() {
  const { orders, fetchMyOrders, loading } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o._id} className="bg-white border p-4 rounded">
              <div className="font-semibold">Order #{o._id}</div>
              <div className="text-sm text-gray-600">
                Total: ${o.totalAmount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
