import { Routes, Route } from 'react-router-dom';
import AdminRoute from './routes/admin';
import Layout from './components/Layout';
import PublicRoute from './routes/public';
import ProtectedRoute from './routes/protected';

// Public pages
import HomePage from './pages/home/home';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ResetPasswordPage from './pages/auth/resetPassword';
import ForgotPasswordPage from './pages/auth/forgotPassword';

// User pages
import OrdersPage from './pages/users/orders';
import ProfilePage from './pages/users/profile';
import UserDashboardPage from './pages/users/dashboard';
import ProductsPage from './pages/users/products/products';
import ProductDetailPage from './pages/users/products/productDetail';

// Admin pages
import AdminUsersPage from './pages/admin/users';
import AdminOrdersPage from './pages/admin/orders';
import AdminProductsPage from './pages/admin/products';
import AdminDashboardPage from './pages/admin/dashboard';

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Route>

      {/* Protected user routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<div className="p-10 text-center">404 Page Not Found</div>}
      />
    </Routes>
  );
}
