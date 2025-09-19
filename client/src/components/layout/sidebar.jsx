import useAuthStore from '@/store/auth';
import { NavLink } from 'react-router-dom';
import {
  FaUser,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaTachometerAlt
} from 'react-icons/fa';

export default function Sidebar() {
  const { user } = useAuthStore();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
    ...(user?.role === 'admin'
      ? [
          { name: 'Orders', path: '/orders', icon: <FaShoppingCart /> },
          { name: 'Products', path: '/products', icon: <FaBoxOpen /> },
          { name: 'Users', path: '/users', icon: <FaUsers /> }
        ]
      : [
          { name: 'Orders', path: '/orders', icon: <FaShoppingCart /> },
          { name: 'Products', path: '/products', icon: <FaBoxOpen /> },
          { name: 'Profile', path: '/profile', icon: <FaUser /> }
        ])
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col shadow-lg">
      <div className="p-6 flex flex-col items-center border-b border-gray-700">
        <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold">
          {user.name[0] || 'U'}
        </div>
        <div className="mt-3 text-center">
          <p className="font-semibold">{user.name || 'Guest'}</p>
          <p className="capitalize text-xs text-gray-400">
            {user.role || 'User'}
          </p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col px-2 py-4 space-y-1">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                  : ''
              }`
            }
          >
            <span className="mr-3 text-lg">{link.icon}</span>
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
