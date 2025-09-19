import React, { useEffect, useState } from 'react';
import Table from '@/components/ui/table';
import adminService from '@/services/admin';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    adminService.getProducts().then(setProducts);
  }, []);

  const columns = [
    { key: 'name', title: 'Name', render: (r) => r.name },
    { key: 'price', title: 'Price', render: (r) => `$${r.price}` },
    { key: 'stock', title: 'Stock', render: (r) => r.stock },
    {
      key: 'actions',
      title: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <button className="text-blue-600">Edit</button>
          <button className="text-red-600">Delete</button>
        </div>
      )
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <Table columns={columns} data={products} />
    </div>
  );
}
