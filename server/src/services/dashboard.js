import dayjs from 'dayjs';
import mongoose from 'mongoose';
import Order from '../models/order.js';
import { countUsers } from '../repositories/user.js';
import { countProducts } from '../repositories/product.js';
import { findOrders, countOrders } from '../repositories/order.js';

export const getAdminDashboardService = async () => {
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    recentOrders,
    totalSalesAgg,
    topProducts,
    salesOverTimeRaw,
    orderStatusDistribution
  ] = await Promise.all([
    countProducts({}),
    countOrders({ isAdmin: true }),
    countUsers({ isAdmin: false }),
    findOrders({ limit: 5, skip: 0, isAdmin: true }),
    Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]),
    Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products._id',
          name: { $first: '$products.name' },
          price: { $first: '$products.price' },
          category: { $first: '$products.category' },
          totalSold: { $sum: '$products.quantity' },
          totalRevenue: {
            $sum: { $multiply: ['$products.quantity', '$products.price'] }
          }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]),
    Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: {
            $gte: new Date(new Date().getFullYear(), 0, 1),
            $lte: new Date(new Date().getFullYear(), 11, 31)
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          sales: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { month: '$_id', sales: 1, orders: 1, _id: 0 } }
    ]),
    Order.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } }
    ])
  ]);

  const totalSales = totalSalesAgg?.[0]?.total || 0;

  const currentYear = new Date().getFullYear();
  const allMonths = Array.from({ length: 12 }, (_, i) => {
    const monthKey = dayjs(`${currentYear}-${i + 1}-01`).format('YYYY-MM');
    const monthLabel = dayjs(`${currentYear}-${i + 1}-01`).format('MMM');
    return { monthKey, monthLabel };
  });

  const salesOverTime = allMonths.map(({ monthKey, monthLabel }) => {
    const found = salesOverTimeRaw.find((m) => m.month === monthKey);
    return found
      ? { ...found, month: monthLabel }
      : { month: monthLabel, sales: 0, orders: 0 };
  });

  return {
    metrics: {
      totalSales,
      totalOrders,
      totalProducts,
      totalCustomers
    },
    charts: {
      salesOverTime,
      orderStatusDistribution
    },
    tables: {
      topProducts,
      recentOrders
    }
  };
};

export const getUserDashboardService = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  const [userOrders, monthlySpendingRaw, orderStatusDistribution] =
    await Promise.all([
      findOrders({ userId: objectId, limit: 10, skip: 0 }),
      Order.aggregate([
        {
          $match: {
            user: objectId,
            paymentStatus: 'paid',
            createdAt: {
              $gte: new Date(new Date().getFullYear(), 0, 1),
              $lte: new Date(new Date().getFullYear(), 11, 31)
            }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            spending: { $sum: '$totalPrice' },
            orders: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } },
        { $project: { month: '$_id', spending: 1, orders: 1, _id: 0 } }
      ]),
      Order.aggregate([
        { $match: { user: objectId } },
        { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
        { $project: { status: '$_id', count: 1, _id: 0 } }
      ])
    ]);

  const currentYear = new Date().getFullYear();
  const allMonths = Array.from({ length: 12 }, (_, i) => {
    const monthKey = dayjs(`${currentYear}-${i + 1}-01`).format('YYYY-MM');
    const monthLabel = dayjs(`${currentYear}-${i + 1}-01`).format('MMM');
    return { monthKey, monthLabel };
  });

  const monthlySpending = allMonths.map(({ monthKey, monthLabel }) => {
    const found = monthlySpendingRaw.find((m) => m.month === monthKey);
    return found
      ? { ...found, month: monthLabel }
      : { month: monthLabel, spending: 0, orders: 0 };
  });

  const totalOrders = userOrders.length;
  const totalSpent = userOrders
    .filter((order) => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.totalPrice, 0);
  const deliveredOrders = userOrders.filter(
    (order) => order.orderStatus === 'delivered'
  ).length;

  return {
    metrics: {
      totalSpent,
      totalOrders,
      deliveredOrders
    },
    charts: {
      monthlySpending,
      orderStatusDistribution
    },
    tables: {
      recentOrders: userOrders
    }
  };
};
