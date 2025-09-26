import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Table from '@/components/ui/table';
import Input from '@/components/ui/input';
import useOrderStore from '@/store/order';
import useDebounce from '@/hooks/use-debounce';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/ui/pagination';
import usePaginationStore from '@/store/pagination';
import { downloadInvoice } from '@/utils/downloadInvoice';
import { FaEye, FaFileInvoiceDollar } from 'react-icons/fa';
import {
  getOrderStatusClasses,
  getPaymentStatusClasses
} from '@/utils/statusColors';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { currentPage } = usePaginationStore();
  const debouncedSearch = useDebounce(search, 500);
  const { orders, fetchOrders, loading } = useOrderStore();

  useEffect(() => {
    const query = { search: debouncedSearch };
    fetchOrders(query);
  }, [currentPage, debouncedSearch, fetchOrders]);

  const columns = [
    { key: '_id', title: 'Order ID', render: (r) => `#${r._id.slice(-6)}` },
    {
      title: 'Date',
      key: 'createdAt',
      render: (r) => dayjs(r.createdAt).format('DD/MM/YYYY')
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
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <FaEye
            size={16}
            onClick={() => navigate(`/orders/view/${r._id}`)}
            className="text-gray-500 cursor-pointer hover:text-gray-600"
          />
          <FaFileInvoiceDollar
            size={16}
            onClick={() => downloadInvoice(r, true)}
            className="text-green-600 cursor-pointer hover:text-green-800"
          />
        </div>
      )
    }
  ];

  return (
    <React.Fragment>
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Input
          value={search}
          placeholder="Search orders..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table columns={columns} data={orders} loading={loading} />
      <Pagination />
    </React.Fragment>
  );
}
