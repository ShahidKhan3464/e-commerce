import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PublicRoute from './routes/public';
import RoleRoute from './routes/role-route';

// Public pages
import HomePage from './pages/home';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ResetPasswordPage from './pages/auth/resetPassword';
import ForgotPasswordPage from './pages/auth/forgotPassword';

// User pages
import ProfilePage from './pages/users/profile';
import OrdersPage from './pages/users/orders/list';
import ProductForm from './pages/admin/products/form';
import ProductsPage from './pages/users/products/list';
import UserDashboardPage from './pages/users/dashboard';
import ProductDetailPage from './pages/users/products/detail';

// Admin pages
import UsersPage from './pages/admin/users/list';
import AdminOrdersPage from './pages/admin/orders/list';
import AdminDashboardPage from './pages/admin/dashboard';
import UsersDetailPage from './pages/admin/users/detail';
import AdminProductsPage from './pages/admin/products/list';

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
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <RoleRoute
              adminComponent={<AdminDashboardPage />}
              customerComponent={<UserDashboardPage />}
            />
          }
        />

        <Route
          path="/orders"
          element={
            <RoleRoute
              customerComponent={<OrdersPage />}
              adminComponent={<AdminOrdersPage />}
            />
          }
        />

        <Route
          path="/products"
          element={
            <RoleRoute
              customerComponent={<ProductsPage />}
              adminComponent={<AdminProductsPage />}
            />
          }
        />

        <Route
          path="/products/create"
          element={<RoleRoute adminOnly adminComponent={<ProductForm />} />}
        />

        <Route
          path="/products/edit/:id"
          element={<RoleRoute adminOnly adminComponent={<ProductForm />} />}
        />

        <Route
          path="/users"
          element={<RoleRoute adminOnly adminComponent={<UsersPage />} />}
        />

        <Route
          path="/users/view/:id"
          element={<RoleRoute adminOnly adminComponent={<UsersDetailPage />} />}
        />

        <Route
          path="/products/view/:id"
          element={
            <RoleRoute customerOnly customerComponent={<ProductDetailPage />} />
          }
        />

        <Route
          path="/profile"
          element={
            <RoleRoute customerOnly customerComponent={<ProfilePage />} />
          }
        />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<div className="p-10 text-center">404 Page Not Found</div>}
      />
    </Routes>
  );
}
