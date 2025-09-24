import React, { useRef } from 'react';

export default function ImageUpload({ onChange, previewUrl, label = 'Image' }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium">{label}</label>
      <div
        onClick={handleClick}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition"
      >
        {previewUrl ? (
          <img
            alt="Preview"
            src={previewUrl}
            className="h-32 w-32 object-cover rounded mb-2"
          />
        ) : (
          <p className="text-gray-500">Click or drag to upload image</p>
        )}
        <button
          type="button"
          className="mt-2 rounded-lg px-4 py-1 bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Select Image
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
