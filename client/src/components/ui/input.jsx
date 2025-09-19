import React from 'react';

export default function Input({ label, ...props }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}
      <input className="w-full border rounded px-3 py-2" {...props} />
    </label>
  );
}
