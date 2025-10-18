import { useState, useEffect, useRef } from 'react';
import useAuthStore from '@/store/auth';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiLogOut, FiBell, FiSearch, FiMenu } from 'react-icons/fi';

export default function Header() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to determine route title based on path + role
  const getRouteTitle = (pathname, role) => {
    if (
      pathname.startsWith('/products/edit/') ||
      pathname.startsWith('/products/view')
    ) {
      return role === 'admin' ? 'Update Product' : 'Product Details';
    }

    if (pathname.startsWith('/orders/view')) {
      return 'Order Details';
    }

    if (pathname.startsWith('/users/view')) {
      return 'User Details';
    }

    const titles = {
      '/cart': 'Shopping Cart',
      '/profile': 'My Profile',
      '/users': 'User Management',
      '/dashboard': 'Dashboard',
      '/orders': role === 'admin' ? 'Order Management' : 'My Orders',
      '/products': role === 'admin' ? 'Product Management' : 'Products'
    };

    return titles[pathname] || 'Store';
  };

  const routeTitle = getRouteTitle(location.pathname, user?.role);

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    return names
      .map((n) => n[0]?.toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'from-purple-500 to-purple-600';
      case 'customer':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="h-20">
      <header className="fixed top-0 w-[calc(100%_-_256px)] z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <FiMenu className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{routeTitle}</h1>
              <p className="text-sm text-slate-500 capitalize">
                {user?.role} Dashboard
              </p>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex items-center max-w-md w-full">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Section */}
          {user && (
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <FiBell className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className={`flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r ${getRoleColor(user.role)} text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-semibold text-sm">
                    {getInitials(user.name)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs opacity-80 capitalize">{user.role}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-scale-in">
                    {/* User Info */}
                    <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getRoleColor(user.role)} flex items-center justify-center text-white font-bold`}>
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{user.name}</p>
                          <p className="text-sm text-slate-500 truncate">{user.email}</p>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full capitalize mt-1">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <FiUser className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      
                      <hr className="my-2 border-slate-200" />
                      
                      <button
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
