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
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  PieChart,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const { userData, loading, fetchUserDashboard } = useDashboardStore();
  const { metrics, charts, tables } = userData;

  useEffect(() => {
    fetchUserDashboard();
  }, [fetchUserDashboard]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const columns = [
    { key: '_id', title: 'Order ID', render: (r) => `#${r._id.slice(-6)}` },
    {
      title: 'Date',
      key: 'createdAt',
      render: (r) => dayjs(r.createdAt).format('DD/MM/YYYY')
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

  const hasMonthlySpending = (charts?.monthlySpending || []).length > 0;
  const hasStatusDistribution =
    (charts?.orderStatusDistribution || []).length > 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome Back!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Total Orders" value={metrics?.totalOrders || 0} />
        <Card
          title="Total Spent"
          value={`$${metrics?.totalSpent?.toFixed(2).toLocaleString() || 0}`}
        />
        <Card title="Delivered Orders" value={metrics?.deliveredOrders || 0} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Order Status</h2>
        {hasStatusDistribution ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                dataKey="count"
                innerRadius={60}
                paddingAngle={1}
                nameKey="status"
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
          <div className="text-center text-gray-500 py-10">
            No records found
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Spending</h2>
        {hasMonthlySpending ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={charts.monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const spending = payload[0].value;
                    const orders = payload[0].payload.orders;
                    return (
                      <div className="bg-white border border-gray-200 rounded-lg shadow p-3">
                        <p className="font-semibold text-gray-800">{label}</p>
                        <p className="text-sm text-gray-600">
                          Spending:{' '}
                          <span className="font-medium">
                            ${spending.toFixed(2).toLocaleString()}
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
                dataKey="spending"
                dot={{ fill: '#4f46e5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No records found
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <Table columns={columns} data={tables?.recentOrders || []} />
      </div>
    </div>
  );
}
