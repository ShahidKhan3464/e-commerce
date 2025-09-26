import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import useUserStore from '@/store/user';
import { FiTrash } from 'react-icons/fi';
import Table from '@/components/ui/table';
import Input from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/ui/pagination';
import usePaginationStore from '@/store/pagination';
import ConfirmModal from '@/components/ui/confirmModal';

export default function UsersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { currentPage } = usePaginationStore();
  const debouncedSearch = useDebounce(search, 500);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, fetchUsers, loading, deleteUser } = useUserStore();

  useEffect(() => {
    const query = {
      search: debouncedSearch
    };
    fetchUsers(query);
  }, [currentPage, fetchUsers, debouncedSearch]);

  const columns = [
    { key: 'name', title: 'Name', render: (r) => r.name },
    { key: 'email', title: 'Email', render: (r) => r.email },
    {
      key: 'role',
      title: 'Role',
      render: (r) => r.role.charAt(0).toUpperCase() + r.role.slice(1)
    },
    {
      key: 'status',
      title: 'Status',
      render: (r) => (
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${
            r.isBlocked
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {r.isBlocked ? 'Blocked' : 'Active'}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-2">
          <FaEye
            size={16}
            onClick={() => navigate(`/users/view/${r._id}`)}
            className="text-gray-500 cursor-pointer hover:text-gray-600"
          />
          <FiTrash
            size={16}
            onClick={() => handleDeleteClick(r)}
            className="text-red-600 cursor-pointer hover:text-red-800"
          />
        </div>
      )
    }
  ];

  const handleDeleteClick = (product) => {
    setModalOpen(true);
    setSelectedUser(product);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser._id);
    fetchUsers({ search: debouncedSearch });
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <ConfirmModal
        open={modalOpen}
        loading={loading}
        title="Delete User"
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
        message={`Are you sure you want to delete the user?`}
      />
      <div className="flex items-center justify-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <Input
          value={search}
          placeholder="Search users..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table columns={columns} data={users} loading={loading} />
      <Pagination />
    </React.Fragment>
  );
}
