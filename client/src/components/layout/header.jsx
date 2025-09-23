import { useState } from 'react';
import useAuthStore from '@/store/auth';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  // Function to determine route title based on path + role
  const getRouteTitle = (pathname, role) => {
    if (
      pathname.startsWith('/products/edit/') ||
      pathname.startsWith('/products/view')
    ) {
      return role === 'admin' ? 'Update Product' : 'Product Details';
    }

    if (pathname.startsWith('/users/view')) {
      return role === 'admin' ? 'User Details' : 'User Details';
    }

    const titles = {
      '/profile': 'Profile',
      '/dashboard': 'Dashboard',
      '/users': 'Manage Users',
      '/orders': role === 'admin' ? 'Manage Orders' : 'My Orders',
      '/products': role === 'admin' ? 'Manage Products' : 'Products'
    };

    return titles[pathname] || 'Store';
  };

  const routeTitle = getRouteTitle(location.pathname, user?.role);

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names
      .map((n) => n[0]?.toUpperCase())
      .join('')
      .slice(0, 2);
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
