import React, { useEffect, useState } from 'react';
import Table from '@/components/ui/table';
import adminService from '@/services/admin';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const onSearch = async (e) => {
    e.preventDefault();
    const res = await adminService.getUsers(`?search=${query}`);
    setUsers(res);
  };

  const columns = [
    { key: 'name', title: 'Name', render: (r) => r.name },
    { key: 'email', title: 'Email', render: (r) => r.email },
    { key: 'role', title: 'Role', render: (r) => r.role },
    {
      key: 'actions',
      title: 'Actions',
      render: () => <button className="text-red-600">Delete</button>
    }
  ];

  const fetchUsers = async () => {
    setLoading(true);
    const res = await adminService.getUsers();
    setUsers(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users"
          className="border rounded px-3 py-2 flex-1"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={users} />
      )}
    </div>
  );
}
