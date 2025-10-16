import { useEffect } from 'react';
import dayjs from 'dayjs';
import Card from '@/components/ui/card';
import Table from '@/components/ui/table';
import useDashboardStore from '@/store/dashboard';
import {
  getOrderStatusClasses,
  getPaymentStatusClasses
} from '@/utils/statusColors';
import {
  Pie,
  Cell,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  LineChart,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const { adminData, loading, fetchAdminDashboard } = useDashboardStore();
  const { metrics, charts, tables } = adminData;

  useEffect(() => {
    fetchAdminDashboard();
  }, [fetchAdminDashboard]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const orderColumns = [
    { key: '_id', title: 'Order ID', render: (r) => `#${r._id.slice(-6)}` },
    {
      title: 'Date',
      key: 'createdAt',
      render: (r) => dayjs(r.createdAt).format('DD/MM/YYYY')
    },
    {
      key: 'customer',
      title: 'Customer',
      render: (r) => r.user?.name || 'Unknown'
    },
    {
      title: 'Items',
      key: 'products',
      render: (r) => r.products.length
    },
    {
      key: 'totalPrice',
      title: 'Total amount',
      render: (r) => `$${r.totalPrice.toFixed(2)}`
    },
    {
      title: 'Status',
      key: 'orderStatus',
      render: (r) => (
        <span
          className={`px-3 py-1 text-xs font-medium capitalize rounded-full ${getOrderStatusClasses(
            r.orderStatus
          )}`}
        >
          {r.orderStatus}
        </span>
      )
    },
    {
      title: 'Payment',
      key: 'paymentStatus',
      render: (r) => (
        <span
          className={`px-3 py-1 text-xs font-medium capitalize rounded-full ${getPaymentStatusClasses(
            r.paymentStatus
          )}`}
        >
          {r.paymentStatus}
        </span>
      )
    }
  ];

  const productsColumns = [
    { key: 'name', title: 'Product' },
    { key: 'category', title: 'Category' },
    { key: 'totalSold', title: 'Sold' },
    {
      title: 'Revenue',
      key: 'totalRevenue',
      render: (r) => `$${r.totalRevenue.toFixed(2)}`
    },
    { key: 'price', title: 'Price' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Sales"
          value={`$${metrics?.totalSales?.toFixed(2).toLocaleString() || 0}`}
        />
        <Card title="Total Orders" value={metrics?.totalOrders || 0} />
        <Card title="Total Customers" value={metrics?.totalCustomers || 0} />
        <Card title="Total Products" value={metrics?.totalProducts || 0} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Sales Over Time</h2>
        {charts?.salesOverTime?.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={charts.salesOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const sales = payload[0].value;
                    const orders = payload[0].payload.orders;
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg shadow p-3">
                        <p className="font-semibold text-gray-800">{label}</p>
                        <p className="text-sm text-gray-600">
                          Sales:{' '}
                          <span className="font-medium">
                            ${sales.toFixed(2).toLocaleString()}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Orders: <span className="font-medium">{orders}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                stroke="#4f46e5"
                strokeWidth={2}
                dataKey="sales"
                dot={{ fill: '#4f46e5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-64 text-gray-500">
            No records found
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Order Status Distribution
        </h2>
        {charts?.orderStatusDistribution?.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                dataKey="count"
                nameKey="status"
                paddingAngle={1}
                innerRadius={60}
                outerRadius={100}
                data={charts.orderStatusDistribution}
              >
                {charts.orderStatusDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-64 text-gray-500">
            No records found
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Top 5 Orders</h2>
        <Table columns={orderColumns} data={tables?.recentOrders || []} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
        <Table columns={productsColumns} data={tables?.topProducts || []} />
      </div>
    </div>
  );
}
