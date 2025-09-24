import React from 'react';

export default function Input({ label, ...props }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}
      <input
        className="w-full border rounded-lg px-3 py-2 transition bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        {...props}
      />
    </label>
  );
}
