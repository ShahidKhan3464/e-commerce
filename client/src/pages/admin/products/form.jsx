import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import useProductStore from '@/store/product';
import ImageUpload from '@/components/ui/imageUpload';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createProduct, updateProduct, fetchProduct, product, loading } =
    useProductStore();

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: null,
    category: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  useEffect(() => {
    if (product && id) {
      setForm({
        name: product.name || '',
        image: product.image || '',
        price: product.price || '',
        category: product.category || '',
        description: product.description || '',
        preview: `http://localhost:3000${product.image}`
      });
    }
  }, [product, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (file) => {
    setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let isMultipart = true;
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      if (id) {
        await updateProduct(id, formData, isMultipart);
        toast.success('Product updated successfully!');
      } else {
        await createProduct(formData);
        toast.success('Product created successfully!');
      }

      navigate('/products');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Update Product' : 'Create Product'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          label="Name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <Input
          name="price"
          type="number"
          label="Price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <Input
          name="category"
          label="Category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <Input
          name="description"
          label="Description"
          onChange={handleChange}
          value={form.description}
          placeholder="Description"
        />
        <ImageUpload previewUrl={form.preview} onChange={handleImageChange} />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Loading...' : id ? 'Update Product' : 'Create Product'}
        </Button>
      </form>
    </div>
  );
}
