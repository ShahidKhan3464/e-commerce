import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Select from '@/components/ui/select';
import useProductStore from '@/store/product';
import ImageUpload from '@/components/ui/imageUpload';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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

  const validate = () => {
    const newErrors = {};
    if (!form.image) newErrors.image = 'Image is required';
    if (!form.price) newErrors.price = 'Price is required';
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.category.trim()) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (file) => {
    setForm({ ...form, image: file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh_-_188px)] max-w-4xl mx-auto">
      <div className="bg-white border border-solid border-gray-200 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          {id ? 'Update Product' : 'Create Product'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            label="Name"
            value={form.name}
            error={errors.name}
            onChange={handleChange}
            placeholder="Product Name"
          />
          <Input
            name="price"
            type="number"
            label="Price"
            value={form.price}
            placeholder="Price"
            error={errors.price}
            onChange={handleChange}
          />
          <Select
            name="category"
            label="Category"
            value={form.category}
            error={errors.category}
            onChange={handleChange}
            placeholder="Select category"
            options={[
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothes', label: 'Clothes' },
              { value: 'books', label: 'Books' }
            ]}
          />
          <Input
            name="description"
            label="Description"
            onChange={handleChange}
            value={form.description}
            placeholder="Description"
          />
          <ImageUpload
            error={errors.image}
            previewUrl={form.preview}
            onChange={handleImageChange}
          />
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
    </div>
  );
}
