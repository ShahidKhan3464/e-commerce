import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Table from '@/components/ui/table';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Select from '@/components/ui/select';
import useProductStore from '@/store/product';
import { useNavigate } from 'react-router-dom';
import useDebounce from '@/hooks/use-debounce';
import Pagination from '@/components/ui/pagination';
import usePaginationStore from '@/store/pagination';
import ConfirmModal from '@/components/ui/confirmModal';

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { currentPage } = usePaginationStore();
  const [modalOpen, setModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, fetchProducts, loading, deleteProduct } = useProductStore();

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

  const columns = [
    { key: 'name', title: 'Name', render: (r) => r.name },
    { key: 'price', title: 'Price', render: (r) => `$${r.price.toFixed(2)}` },
    { key: 'category', title: 'Category', render: (r) => r.category },
    {
      key: 'actions',
      title: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <FiEdit
            size={16}
            onClick={() => navigate(`/products/edit/${r._id}`)}
            className="text-blue-600 cursor-pointer hover:text-blue-800"
          />
          <FiTrash
            size={16}
            onClick={() => handleDeleteClick(r)}
            className="text-red-600 cursor-pointer hover:text-red-800"
          />
        </div>
      )
    }
  ];

  const handleDeleteClick = (product) => {
    setModalOpen(true);
    setSelectedProduct(product);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    await deleteProduct(selectedProduct._id);
    fetchProducts({
      category,
      search: debouncedSearch,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice
    });
    setModalOpen(false);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <React.Fragment>
      <ConfirmModal
        open={modalOpen}
        loading={loading}
        title="Delete Product"
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
        message={`Are you sure you want to delete the product?`}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Button variant="primary" onClick={() => navigate('/products/create')}>
          + Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-end gap-4 mb-6 items-end">
        <Input
          value={search}
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <Input
            type="number"
            value={minPrice}
            placeholder="Min"
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type="number"
            value={maxPrice}
            placeholder="Max"
            onChange={(e) => setMaxPrice(e.target.value)}
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

      <Table columns={columns} data={products} loading={loading} />
      <Pagination />
    </React.Fragment>
  );
}
