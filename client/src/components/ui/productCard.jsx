import React from 'react';
import { Link } from 'react-router-dom';
import { currency } from '../../utils/currency';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border rounded overflow-hidden flex flex-col">
      <img
        alt={product.name}
        className="h-48 w-full object-cover"
        src={product.images?.[0] || '/placeholder.png'}
      />
      <div className="p-3 flex-1 flex flex-col">
        <div className="font-semibold text-lg line-clamp-2">{product.name}</div>
        <div className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold">{currency(product.price)}</div>
          <Link
            to={`/product/${product._id}`}
            className="text-sm text-blue-600"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
