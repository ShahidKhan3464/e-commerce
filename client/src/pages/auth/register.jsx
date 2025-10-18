import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/auth';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiStore, FiCheck } from 'react-icons/fi';

export default function RegisterPage() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuthStore();
  const [password, setPassword] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
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
      await register({ name, email, password });
      toast.success('Account created successfully! Please sign in.');
      nav('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const benefits = [
    'Free shipping on orders over $50',
    'Exclusive member discounts',
    '24/7 customer support',
    'Easy returns and exchanges'
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex flex-col justify-center p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FiStore className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join My Store
              </h2>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Start your premium shopping experience
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Create your account and unlock exclusive benefits, personalized recommendations, and seamless shopping.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FiCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FiStore className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h1>
            <p className="text-slate-600">
              Join us today and start shopping!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 animate-fade-in">
            <div className="hidden lg:block text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h1>
              <p className="text-slate-600">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <Input
                value={name}
                label="Full Name"
                error={errors.name}
                placeholder="Enter your full name"
                icon={<FiUser className="w-5 h-5" />}
                onChange={(e) => setName(e.target.value)}
                variant="filled"
              />
              
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
                label="Password"
                value={password}
                error={errors.password}
                placeholder="Create a strong password"
                icon={<FiLock className="w-5 h-5" />}
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
              />

              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="terms"
                  className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 mt-1" 
                  required
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-slate-600">
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign In Instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}