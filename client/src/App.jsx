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
import CartPage from './pages/users/cart/list';
import OrdersPage from './pages/users/orders/list';
import UserProfilePage from './pages/users/profile';
import ProductForm from './pages/admin/products/form';
import ProductsPage from './pages/users/products/list';
import UserDashboardPage from './pages/users/dashboard';
import UserOrderDetailPage from './pages/users/orders/detail';
import ProductDetailPage from './pages/users/products/detail';

// Admin pages
import UsersPage from './pages/admin/users/list';
import AdminProfilePage from './pages/admin/profile';
import UserDetailPage from './pages/admin/users/detail';
import AdminOrdersPage from './pages/admin/orders/list';
import AdminDashboardPage from './pages/admin/dashboard';
import AdminProductsPage from './pages/admin/products/list';
import AdminOrderDetailPage from './pages/admin/orders/detail';

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
          path="/orders/view/:id"
          element={
            <RoleRoute
              customerComponent={<UserOrderDetailPage />}
              adminComponent={<AdminOrderDetailPage />}
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
          path="/profile"
          element={
            <RoleRoute
              adminComponent={<AdminProfilePage />}
              customerComponent={<UserProfilePage />}
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
          element={<RoleRoute adminOnly adminComponent={<UserDetailPage />} />}
        />

        <Route
          path="/products/view/:id"
          element={
            <RoleRoute customerOnly customerComponent={<ProductDetailPage />} />
          }
        />

        <Route
          path="/cart"
          element={<RoleRoute customerOnly customerComponent={<CartPage />} />}
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
