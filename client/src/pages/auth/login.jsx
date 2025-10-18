import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/auth';
import { Link } from 'react-router-dom';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { FiMail, FiLock, FiStore } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuthStore();
  const [password, setPassword] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login({ email, password });
      toast.success('Welcome back! Login successful.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiStore className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-600">
            Sign in to your account to continue shopping
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 animate-fade-in">
          <form onSubmit={submit} className="space-y-6">
            <Input
              type="email"
              value={email}
              label="Email Address"
              error={errors.email}
              placeholder="Enter your email"
              icon={<FiMail className="w-5 h-5" />}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
            />
            
            <Input
              type="password"
              value={password}
              label="Password"
              error={errors.password}
              placeholder="Enter your password"
              icon={<FiLock className="w-5 h-5" />}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2" 
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">New to My Store?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}