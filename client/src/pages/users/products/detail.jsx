import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProductStore from '@/store/product';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, fetchProduct } = useProductStore();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <img
          className="h-96 w-full object-cover rounded"
          src={product.images?.[0] || '/placeholder.png'}
        />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
      </div>
      <div className="border p-4 rounded">
        <div className="text-xl font-bold">${product.price}</div>
        <div className="mt-4">Stock: {product.stock}</div>
      </div>
    </div>
  );
}
