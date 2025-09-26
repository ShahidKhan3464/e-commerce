import React from 'react';

export default function Select({ label, className, options = [], ...props }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}
      <select
        {...props}
        className={`w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <option value="">{props.placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
