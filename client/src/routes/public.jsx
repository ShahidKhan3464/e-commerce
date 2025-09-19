import useAuthStore from '@/store/auth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const { user } = useAuthStore();
  if (user)
    return (
      <Navigate
        replace
        to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
      />
    );
  return <Outlet />;
}
