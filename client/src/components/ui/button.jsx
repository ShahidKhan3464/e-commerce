import React from 'react';

// Simple utility to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  ...props
}) {
  const base = `
    relative inline-flex items-center justify-center gap-2 font-medium cursor-pointer
    transition-all duration-200 ease-in-out transform
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-95 hover:scale-105
  `;

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl'
  };

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg
      hover:from-blue-700 hover:to-blue-800 hover:shadow-xl
      focus:ring-blue-500
    `,
    secondary: `
      bg-white text-slate-700 border border-slate-200 shadow-sm
      hover:bg-slate-50 hover:border-slate-300 hover:shadow-md
      focus:ring-slate-500
    `,
    outline: `
      bg-transparent text-blue-600 border border-blue-200
      hover:bg-blue-50 hover:border-blue-300
      focus:ring-blue-500
    `,
    ghost: `
      bg-transparent text-slate-600 hover:bg-slate-100
      focus:ring-slate-500
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg
      hover:from-red-700 hover:to-red-800 hover:shadow-xl
      focus:ring-red-500
    `,
    success: `
      bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg
      hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl
      focus:ring-emerald-500
    `
  };

  return (
    <button 
      className={cn(base, sizes[size], variants[variant], className)} 
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {icon && !loading && icon}
      {children}
    </button>
  );
}
