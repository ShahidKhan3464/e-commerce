import React from 'react';

export default function Card({ title, value, className }) {
  return (
    <div
      className={`bg-white border border-solid border-gray-300 rounded-lg p-4 shadow-sm ${
        className || ''
      }`}
    >
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
    </div>
  );
}
