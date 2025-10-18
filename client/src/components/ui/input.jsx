import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// Simple utility to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Input({ 
  label, 
  type = 'text', 
  error, 
  icon,
  variant = 'default',
  size = 'md',
  ...props 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-4 py-4 text-base'
  };

  const variants = {
    default: `
      bg-white border border-slate-300
      focus:border-blue-500 focus:ring-blue-500
    `,
    filled: `
      bg-slate-50 border border-transparent
      focus:bg-white focus:border-blue-500 focus:ring-blue-500
    `,
    ghost: `
      bg-transparent border border-slate-200
      focus:bg-white focus:border-blue-500 focus:ring-blue-500
    `
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className={cn(
          'block text-sm font-medium transition-colors duration-200',
          error ? 'text-red-700' : isFocused ? 'text-blue-700' : 'text-slate-700'
        )}>
          {label}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
            {icon}
          </div>
        )}
        
        <input
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full rounded-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed',
            'placeholder:text-slate-400',
            sizes[size],
            variants[variant],
            icon ? 'pl-10' : '',
            isPassword ? 'pr-12' : '',
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '',
            type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none focus:text-blue-500 transition-colors duration-200"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1 animate-slide-up">
          <span className="text-red-500">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
