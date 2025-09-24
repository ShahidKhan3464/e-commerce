import React, { useEffect } from 'react';
import useCartStore from '@/store/cart';
import Button from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import useProductStore from '@/store/product';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { product, fetchProduct, loading } = useProductStore();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!product) {
    return (
      <div className="flex items-center justify-center">Product not found.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <img
          alt={product.name}
          src={`http://localhost:3000${product.image}`}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.category}</p>
          <div className="flex items-center mt-3 gap-1 text-yellow-500">
            {'⭐'.repeat(product.rating || 4)}
            <span className="text-sm text-gray-500 ml-2">
              {product.reviewsCount || 12} reviews
            </span>
          </div>
          <div className="mt-6">
            <span className="text-4xl font-bold text-blue-600">
              ${product.price}
            </span>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">
              Stock: {product.stock > 0 ? product.stock : 'In Stock'}
            </span>
            {product.stock < 0 && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-lg">
                In Stock
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => addItem(product)}
            >
              Add to Cart
            </Button>
            <Button variant="primary" className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

//  <Button
//               disabled={product.stock <= 0}
//               className={`flex-1 px-5 py-3 rounded-lg font-medium transition ${
//                 product.stock > 0
//                   ? 'bg-blue-600 text-white hover:bg-blue-700'
//                   : 'bg-gray-300 text-gray-600 cursor-not-allowed'
//               }`}
//             >
//               Add to Cart
//             </Button>
