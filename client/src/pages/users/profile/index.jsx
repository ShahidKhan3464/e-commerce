import React, { useState } from 'react';
import toast from 'react-hot-toast';
import authStorage from '@/utils/auth';
import useAuthStore from '@/store/auth';
import useUserStore from '@/store/user';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [errors, setErrors] = useState({});
  const { loading, updateUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    role: user.role || '',
    email: user.email || ''
  });

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setErrors({});
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const updatedUser = await updateUser(user._id, formData);
      authStorage.setUser({
        ...updatedUser,
        name: formData.name,
        email: formData.email
      });
      useAuthStore.setState((prev) => ({
        ...prev,
        user: { ...updatedUser, name: formData.name, email: formData.email }
      }));

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh_-_188px)] max-w-4xl mx-auto">
      <div className="bg-white border border-solid border-gray-200 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              label="Name"
              error={errors.name}
              value={formData.name}
              disabled={!isEditing}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              label="Email"
              error={errors.email}
              disabled={!isEditing}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Input
              name="role"
              label="Role"
              disabled={true}
              onChange={handleChange}
              value={
                formData.role.charAt(0).toUpperCase() + formData.role.slice(1)
              }
            />
          </div>
          <div className="flex justify-end gap-3">
            {!isEditing ? (
              <Button
                type="button"
                variant="primary"
                onClick={handleEditToggle}
              >
                Edit Profile
              </Button>
            ) : (
              <React.Fragment>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={loading}
                  onClick={handleEditToggle}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Loading...' : 'Save'}
                </Button>
              </React.Fragment>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
