import React from 'react';
import useAuthStore from '@/store/auth';

export default function ProfilePage() {
  const { user } = useAuthStore();
  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white border rounded p-4">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Role:</strong> {user.role}
        </div>
      </div>
    </div>
  );
}
