import React, { useEffect } from 'react';
import useUserStore from '@/store/user';
import { useParams } from 'react-router-dom';

export default function AdminUsersDetailPage() {
  const { id } = useParams();
  const { user, loading, fetchUser, onToggleBlock } = useUserStore();
  const isBlocked = user?.isBlocked;

  useEffect(() => {
    fetchUser(id);
  }, [id, fetchUser]);

  //   if (loading) {
  //     return <div className="flex items-center justify-center">Loading...</div>;
  //   }

  if (!user) {
    return (
      <div className="flex items-center justify-center">User not found.</div>
    );
  }

  const formatDate = (d) => {
    if (!d) return '—';
    const date =
      typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).format(date);
  };

  const roleColor = (role) => {
    switch ((role || '').toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'customer':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const initials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleToggleBlock = () => {
    onToggleBlock(user._id, { block: !isBlocked });
  };

  return (
    <div className={`max-w-5xl mx-auto bg-white shadow rounded-lg p-6`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-700">
            {initials(user.name)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {user.name || 'Unknown user'}
          </h2>
          <p className="text-sm text-gray-500">{user.email || 'No email'}</p>
          <p className="text-sm text-gray-500">{user.phone || 'No phone'}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${roleColor(
              user.role
            )}`}
          >
            {user.role
              ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
              : 'Customer'}
          </span>
          <button
            // onClick={() => onViewOrders(user._id)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 cursor-pointer rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View Orders
          </button>
          <button
            disabled={loading}
            onClick={handleToggleBlock}
            className={`inline-flex items-center cursor-pointer px-3 py-1.5 rounded-md text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed ${
              isBlocked
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isBlocked ? 'Activate User' : 'Block User'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        <div>
          <p className="text-xs font-medium text-gray-500">Account created</p>
          <p className="mt-1 text-sm text-gray-900">
            {formatDate(user.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Last login</p>
          <p className="mt-1 text-sm text-gray-900">
            {formatDate(user.lastLogin)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Orders</p>
          <p className="mt-1 text-sm text-gray-900">
            {typeof user.orderCount === 'number' ? user.orderCount : '—'}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Status</p>
          <p className="mt-1 text-sm text-gray-900">
            {isBlocked ? 'Blocked' : 'Active'}
          </p>
        </div>
      </div>
    </div>
  );
}
