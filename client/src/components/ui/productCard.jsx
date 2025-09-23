import React from 'react';
import Button from './button';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div
        className="h-48 w-full overflow-hidden cursor-pointer"
        onClick={() => navigate(`/products/view/${product._id}`)}
      >
        <img
          alt={product.name}
          src={`http://localhost:3000${product.image}`}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
          {product.name}
        </h2>
        <p className="text-blue-600 font-bold text-lg mb-4">${product.price}</p>

        <div className="mt-auto flex gap-2">
          <Button
            onClick={() => navigate(`/products/view/${product._id}`)}
            className="flex-1 bg-gray-200 !text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            View Details
          </Button>
          <Button variant="primary" className="flex-1 rounded-lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
