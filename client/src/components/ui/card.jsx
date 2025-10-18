import React from 'react';

// Simple utility to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Card({ 
  title, 
  value, 
  className, 
  children, 
  icon, 
  trend,
  variant = 'default'
}) {
  const variants = {
    default: 'bg-white border border-slate-200',
    gradient: 'bg-gradient-to-br from-white to-slate-50 border border-slate-200',
    primary: 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200',
    success: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200',
    warning: 'bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200',
    danger: 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200'
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300',
        'transform hover:-translate-y-1 animate-fade-in',
        variants[variant],
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="p-2 rounded-lg bg-white/50 text-slate-600">
                {icon}
              </div>
            )}
            {title && (
              <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                {title}
              </h3>
            )}
          </div>
          {trend && (
            <div className={cn(
              'text-xs font-medium px-2 py-1 rounded-full',
              trend.type === 'up' ? 'text-emerald-700 bg-emerald-100' : 'text-red-700 bg-red-100'
            )}>
              {trend.type === 'up' ? '↗' : '↘'} {trend.value}
            </div>
          )}
        </div>
      )}
      
      {value && (
        <p className="text-3xl font-bold text-slate-800 mb-1">
          {value}
        </p>
      )}
      
      {children && (
        <div className="text-slate-600">
          {children}
        </div>
      )}
    </div>
  );
}
