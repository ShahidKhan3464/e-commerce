import React, { useEffect, useState } from 'react';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select';
import Button from '@/components/ui/button';
import useProductStore from '@/store/product';
import useDebounce from '@/hooks/use-debounce';
import usePaginationStore from '@/store/pagination';
import Pagination from '@/components/ui/pagination';
import { handlePriceChange } from '@/utils/general';
import ProductCard from '@/components/ui/productCard';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { currentPage } = usePaginationStore();
  const debouncedSearch = useDebounce(search, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    const query = {
      category,
      search: debouncedSearch,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice
    };
    fetchProducts(query);
  }, [
    category,
    currentPage,
    fetchProducts,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice
  ]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <React.Fragment>
      <div className="flex justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-wrap gap-2">
          <div className="max-w-[180px] 2xl:max-w-[250px]">
            <Input
              value={search}
              placeholder="Search products..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 max-w-[200px] 2xl:max-w-[400px]">
            <Input
              type="number"
              value={minPrice}
              placeholder="Min"
              onChange={handlePriceChange(setMinPrice)}
            />
            <Input
              type="number"
              value={maxPrice}
              placeholder="Max"
              onChange={handlePriceChange(setMaxPrice)}
            />
          </div>

          <Select
            value={category}
            placeholder="Select category"
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothes', label: 'Clothes' },
              { value: 'books', label: 'Books' }
            ]}
          />

          <Button variant="secondary" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found.
        </div>
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <Pagination />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
