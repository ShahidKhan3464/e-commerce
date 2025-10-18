import React, { useState } from 'react';
import Button from './button';
import useCartStore from '@/store/cart';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col animate-fade-in transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => navigate(`/products/view/${product._id}`)}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            alt={product.name}
            src={`http://localhost:3000${product.image}`}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } group-hover:scale-110`}
          />
        </div>
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110">
              <FiHeart className="w-4 h-4 text-slate-600" />
            </button>
            <button 
              onClick={() => navigate(`/products/view/${product._id}`)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
            >
              <FiEye className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
        
        {/* Quick Add Button */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 transform ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => addItem(product)}
            icon={<FiShoppingCart className="w-4 h-4" />}
            className="w-full bg-white/90 backdrop-blur-sm !text-slate-800 border-0 hover:bg-white shadow-lg"
          >
            Quick Add
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-slate-500 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/products/view/${product._id}`)}
            >
              View
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => addItem(product)}
              icon={<FiShoppingCart className="w-4 h-4" />}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
