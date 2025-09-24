import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FaEye } from 'react-icons/fa';
import Table from '@/components/ui/table';
import Input from '@/components/ui/input';
import useOrderStore from '@/store/order';
import { useNavigate } from 'react-router-dom';
import useDebounce from '@/hooks/use-debounce';
import Pagination from '@/components/ui/pagination';
import usePaginationStore from '@/store/pagination';

const statusColors = {
  shipped: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  delivered: 'bg-green-100 text-green-800'
};

const getOrderStatusClasses = (status) =>
  statusColors[status] || 'bg-gray-100 text-gray-800';

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { currentPage } = usePaginationStore();
  const debouncedSearch = useDebounce(search, 500);
  const { orders, fetchOrders, loading } = useOrderStore();

  useEffect(() => {
    const query = { search: '' };
    fetchOrders(query);
  }, [currentPage, fetchOrders]);

  const columns = [
    { key: '_id', title: 'Order ID', render: (r) => r._id },
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
      key: 'actions',
      title: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <FaEye
            size={16}
            onClick={() => navigate(`/orders/view/${r._id}`)}
            className="text-gray-500 cursor-pointer hover:text-gray-600"
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
