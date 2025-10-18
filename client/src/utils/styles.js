// Utility functions for consistent styling across the app

// Simple utility to combine class names
export const cn = (...classes) => classes.filter(Boolean).join(' ');

// Common gradient combinations
export const gradients = {
  primary: 'bg-gradient-to-r from-blue-600 to-blue-700',
  secondary: 'bg-gradient-to-r from-slate-600 to-slate-700',
  success: 'bg-gradient-to-r from-emerald-600 to-emerald-700',
  warning: 'bg-gradient-to-r from-amber-600 to-amber-700',
  danger: 'bg-gradient-to-r from-red-600 to-red-700',
  purple: 'bg-gradient-to-r from-purple-600 to-purple-700',
  brand: 'bg-gradient-to-r from-blue-600 to-purple-600'
};

// Common shadow combinations
export const shadows = {
  sm: 'shadow-sm hover:shadow-md',
  md: 'shadow-md hover:shadow-lg',
  lg: 'shadow-lg hover:shadow-xl',
  xl: 'shadow-xl hover:shadow-2xl'
};

// Common animation classes
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  scaleIn: 'animate-scale-in',
  hover: 'transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95',
  cardHover: 'transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1'
};

// Common border radius
export const radius = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full'
};

// Role-based color schemes
export const roleColors = {
  admin: 'from-purple-500 to-purple-600',
  customer: 'from-blue-500 to-blue-600',
  user: 'from-slate-500 to-slate-600'
};

// Status colors
export const statusColors = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  inactive: 'bg-slate-100 text-slate-800 border-slate-200'
};

// Common layout classes
export const layout = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 lg:py-20',
  card: 'bg-white rounded-xl shadow-sm border border-slate-200',
  input: 'w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
  button: 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 hover:scale-105'
};