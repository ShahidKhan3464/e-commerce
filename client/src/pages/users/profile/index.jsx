import React, { useState } from 'react';
import toast from 'react-hot-toast';
import authStorage from '@/utils/auth';
import useAuthStore from '@/store/auth';
import useUserStore from '@/store/user';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { loading, updateUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    role: user.role || '',
    email: user.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white border rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              label="Name"
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
                  disabled={loading}
                  onClick={handleEditToggle}
                  className="!text-black !bg-gray-200 !hover:bg-gray-300"
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
