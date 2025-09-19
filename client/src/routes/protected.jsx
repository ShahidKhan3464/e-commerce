import useAuthStore from '@/store/auth';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
