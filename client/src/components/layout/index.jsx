import React from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import useAuthStore from '@/store/auth';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FiStore, FiStar, FiShield, FiTruck } from 'react-icons/fi';

export default function Layout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Public Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            {/* Brand */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <FiStore className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  My Store
                </h1>
                <p className="text-xs text-slate-500">Premium Shopping Experience</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Features
              </a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-20">
          <Outlet />
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <FiStore className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">My Store</h3>
                </div>
                <p className="text-slate-400 mb-6 max-w-md">
                  Your trusted partner for premium shopping experience. Discover quality products at unbeatable prices.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <FiShield className="w-4 h-4" />
                    <span>Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <FiTruck className="w-4 h-4" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <FiStar className="w-4 h-4" />
                    <span>Top Quality</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2024 My Store. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Logged-in layout (with sidebar + header)
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
