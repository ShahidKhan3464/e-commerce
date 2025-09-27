import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/auth';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const { forgotPassword, loading } = useAuthStore();

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await forgotPassword({ email });
      setSent(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_132px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 my-2">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600 mt-2">
            Enter your email and we’ll send you instructions to reset your
            password.
          </p>
        </div>

        {sent ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center font-medium">
            ✅ Check your email for reset instructions.
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <Input
              type="email"
              value={email}
              label="Email"
              error={errors.email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Send Reset Email'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
