import { useState } from 'react';
import useAuthStore from '@/store/auth';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const routeTitle =
    {
      '/dashboard': 'Dashboard',
      '/orders': 'My Orders',
      '/profile': 'Profile',
      '/admin/dashboard': 'Admin Dashboard',
      '/admin/orders': 'Manage Orders',
      '/admin/products': 'Manage Products',
      '/admin/users': 'Manage Users'
    }[location.pathname] || 'Store';

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map((n) => n.toUpperCase()).join('');
    return initials.slice(0, 2);
  };

  return (
    <header className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="text-lg font-semibold">{routeTitle}</h1>
      {user && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center cursor-pointer text-white font-bold space-x-2 bg-gray-400 rounded-full px-3 py-2 focus:outline-none"
          >
            {getInitials(user.name)}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-60 bg-white border border-solid border-gray-200 rounded shadow-lg z-10">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
