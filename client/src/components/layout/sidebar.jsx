import useAuthStore from '@/store/auth';
import useCartStore from '@/store/cart';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUser,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiBarChart3,
  FiClipboardList,
  FiStore,
  FiSettings
} from 'react-icons/fi';

export default function Sidebar() {
  const { user } = useAuthStore();
  const { getTotals } = useCartStore();
  const { totalItems } = getTotals();
  const navigate = useNavigate();

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

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiBarChart3 className="w-5 h-5" /> },
    { name: 'Orders', path: '/orders', icon: <FiClipboardList className="w-5 h-5" /> },
    { name: 'Products', path: '/products', icon: <FiPackage className="w-5 h-5" /> },
    ...(user?.role === 'admin'
      ? [{ name: 'Users', path: '/users', icon: <FiUsers className="w-5 h-5" /> }]
      : [{ name: 'Cart', path: '/cart', icon: <FiShoppingCart className="w-5 h-5" /> }]),
    { name: 'Profile', path: '/profile', icon: <FiUser className="w-5 h-5" /> }
  ];

  return (
    <div className="w-64">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl border-r border-slate-700/50">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <FiStore className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                My Store
              </h1>
              <p className="text-xs text-slate-400 capitalize">{user?.role} Panel</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors cursor-pointer">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getRoleColor(user?.role)} flex items-center justify-center font-bold text-sm shadow-lg`}>
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{user?.name || 'Guest'}</p>
              <p className="text-xs text-slate-400 capitalize truncate">
                {user?.role || 'User'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
            >
              <div className="relative">
                {link.icon}
                {link.name === 'Cart' && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg animate-pulse">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className="flex-1">{link.name}</span>
              
              {/* Active indicator */}
              <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors">
            <FiSettings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
