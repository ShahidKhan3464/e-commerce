import useAuthStore from '@/store/auth';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
