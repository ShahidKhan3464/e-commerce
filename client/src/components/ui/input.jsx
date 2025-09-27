import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Input({ label, type = 'text', error, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <label className="block relative">
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}

      <div className="relative">
        <input
          type={inputType}
          className={`w-full border rounded-lg px-3 py-2 pr-10 transition bg-white 
            ${
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } 
            focus:outline-none focus:ring-2
            disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
            ${
              type === 'number'
                ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                : ''
            }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </label>
  );
}
