import React, { useEffect, useState } from 'react';
import Table from '@/components/ui/table';
import adminService from '@/services/admin';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminService.getOrders().then(setOrders);
  }, []);

  const columns = [
    { key: '_id', title: 'Order ID', render: (r) => r._id },
    { key: 'user', title: 'User', render: (r) => r.user?.email },
    { key: 'total', title: 'Total', render: (r) => `$${r.totalAmount}` },
    { key: 'status', title: 'Status', render: (r) => r.paymentStatus }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <Table columns={columns} data={orders} />
    </div>
  );
}
