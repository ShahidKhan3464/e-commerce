import { useEffect } from 'react';
import Card from '@/components/ui/card';
import Table from '@/components/ui/table';
import useDashboardStore from '@/store/dashboard';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const { stats, latestOrders, latestProducts, fetchDashboardData } =
    useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={stats.users} />
        <Card title="Total Orders" value={stats.orders} />
        <Card title="Total Products" value={stats.products} />
        <Card title="Revenue" value={`$${stats.revenue}`} />
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Latest Orders</h2>
        <Table
          columns={['Order ID', 'User', 'Amount', 'Status', 'Date']}
          data={latestOrders.map((o) => [
            o._id,
            o.userName,
            `$${o.amount}`,
            o.status,
            new Date(o.createdAt).toLocaleDateString()
          ])}
        />
      </div>

      {/* Latest Products Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Latest Products</h2>
        <Table
          columns={['Product ID', 'Name', 'Price', 'Stock']}
          data={latestProducts.map((p) => [
            p._id,
            p.name,
            `$${p.price}`,
            p.stock
          ])}
        />
      </div>
    </div>
  );
}
