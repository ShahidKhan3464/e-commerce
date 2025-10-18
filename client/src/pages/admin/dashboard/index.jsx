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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16'];

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

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Sales Over Time</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            <span>Revenue Trend</span>
          </div>
        </div>
        {charts?.salesOverTime?.length ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={charts.salesOverTime} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const sales = payload[0].value;
                      const orders = payload[0].payload.orders;
                      return (
                        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 animate-scale-in">
                          <p className="font-bold text-slate-800 mb-2">{label}</p>
                          <div className="space-y-1">
                            <p className="text-sm text-slate-600 flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Sales: <span className="font-semibold text-blue-600">${sales.toFixed(2).toLocaleString()}</span>
                            </p>
                            <p className="text-sm text-slate-600 flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              Orders: <span className="font-semibold text-emerald-600">{orders}</span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  stroke="url(#salesGradient)"
                  strokeWidth={3}
                  dataKey="sales"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#1D4ED8' }}
                />
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-slate-50 rounded-lg">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <p className="font-medium">No sales data available</p>
            <p className="text-sm">Data will appear here once you have sales</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Order Status Distribution</h2>
          <div className="text-sm text-slate-500">Total Orders Overview</div>
        </div>
        {charts?.orderStatusDistribution?.length ? (
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    dataKey="count"
                    nameKey="status"
                    paddingAngle={2}
                    innerRadius={70}
                    outerRadius={120}
                    data={charts.orderStatusDistribution}
                  >
                    {charts.orderStatusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 animate-scale-in">
                            <p className="font-bold text-slate-800 capitalize mb-1">{data.status}</p>
                            <p className="text-sm text-slate-600">
                              Count: <span className="font-semibold">{data.count}</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3">
              {charts.orderStatusDistribution.map((entry, index) => (
                <div key={entry.status} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-700 capitalize">{entry.status}</p>
                    <p className="text-sm text-slate-500">{entry.count} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-slate-50 rounded-lg">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <p className="font-medium">No order data available</p>
            <p className="text-sm">Order statistics will appear here</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Top 5 Orders</h2>
        <Table columns={orderColumns} data={tables?.recentOrders || []} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Top Selling Products</h2>
        <Table columns={productsColumns} data={tables?.topProducts || []} />
      </div>
    </div>
  );
}
