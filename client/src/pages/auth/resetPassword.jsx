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
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState('');
  const { resetPassword, loading } = useAuthStore();
  const [confirmPassword, setConfirmPassword] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword.length < 6) {
      newErrors.confirmPassword =
        'Confirm password must be at least 6 characters';
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.password = 'Passwords do not match';
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await resetPassword({ token, email, password, confirmPassword });
      toast.success('Password has been reset successfully!');
      nav('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_132px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 my-2">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-600 mt-2">
            Enter your new password to secure your account.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <Input
            type="password"
            value={password}
            label="New Password"
            error={errors.password}
            placeholder="Enter a strong password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            value={confirmPassword}
            label="Confirm Password"
            error={errors.confirmPassword}
            placeholder="Re-enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
