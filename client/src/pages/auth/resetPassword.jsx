import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/auth';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResetPasswordPage() {
  const nav = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');
  const { resetPassword, loading } = useAuthStore();
  const [confirmPassword, setConfirmPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      await resetPassword({ token, email, password, confirmPassword });
      toast.success('Password has been reset successfully!');
      nav('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_132px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-600 mt-2">
            Enter your new password to secure your account.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New Password"
            type="password"
            placeholder="Enter a strong password"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
}
