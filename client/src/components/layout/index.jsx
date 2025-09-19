import React from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import useAuthStore from '@/store/auth';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <div
              onClick={() => navigate('/')}
              className="text-2xl font-bold cursor-pointer text-blue-600"
            >
              My Store
            </div>
            {!user ? (
              <div className="space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </header>
        <main className="flex-1 bg-white pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  // logged-in layout (with sidebar + header)
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 bg-gray-50">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
