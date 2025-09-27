import { useEffect } from 'react';
import Card from '@/components/ui/card';
import Table from '@/components/ui/table';
import useDashboardStore from '@/store/dashboard';

export default function UserDashboard() {
  const { userOrders, fetchUserDashboard } = useDashboardStore();

  useEffect(() => {
    fetchUserDashboard();
  }, [fetchUserDashboard]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome Back!</h1>

      {/* Orders Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Orders" value={userOrders.length} />
        <Card
          title="Pending Orders"
          value={userOrders.filter((o) => o.status === 'Pending').length}
        />
        <Card
          title="Shipped Orders"
          value={userOrders.filter((o) => o.status === 'Shipped').length}
        />
        <Card
          title="Delivered Orders"
          value={userOrders.filter((o) => o.status === 'Delivered').length}
        />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <Table
          columns={['Order ID', 'Amount', 'Status', 'Date']}
          data={userOrders.slice(0, 5).map((o) => [
            o._id,
            `$${o.amount}`,
            o.status
            // new Date(o.createdAt).toLocaleDateString()
          ])}
        />
      </div>
    </div>
  );
}
