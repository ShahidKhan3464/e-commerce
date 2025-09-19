import React from 'react';
import clsx from 'clsx';

export default function Button({
  children,
  className,
  variant = 'primary',
  ...props
}) {
  const base = 'py-2 px-4 rounded font-medium transition';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
