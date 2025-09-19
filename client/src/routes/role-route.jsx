import useAuthStore from '@/store/auth';
import { Navigate } from 'react-router-dom';

export default function RoleRoute({
  adminOnly,
  customerOnly,
  adminComponent,
  customerComponent
}) {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user?.role !== 'admin')
    return <Navigate to="/dashboard" replace />;
  if (customerOnly && user?.role !== 'customer')
    return <Navigate to="/dashboard" replace />;

  if (adminComponent && user?.role === 'admin') return adminComponent;
  if (customerComponent && user?.role === 'customer') return customerComponent;

  return <Navigate to="/dashboard" replace />;
}
