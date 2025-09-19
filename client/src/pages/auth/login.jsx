import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/auth';
import { Link } from 'react-router-dom';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, loading } = useAuthStore();
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.success('Logged in successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_132px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">
            Please enter your details to login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="you@domain.com"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder="********"
          />

          <div className="flex justify-between items-center text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
