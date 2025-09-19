import React, { useEffect, useState } from 'react';
import useProductStore from '@/store/product';
import ProductCard from '@/components/ui/productCard';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onSearch = (e) => {
    e.preventDefault();
    fetchProducts(`?search=${query}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <input
          value={query}
          placeholder="Search products"
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
