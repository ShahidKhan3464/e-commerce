import api from './api';

const userService = {
  // Fetch all users with pagination & filters
  getUsers: async ({ page, limit, search = '' }) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (search) params.append('search', search);

    const { data } = await api.get(`/users?${params.toString()}`);
    return data;
  },

  // Fetch single user
  getUserById: async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  // Delete user
  deleteUser: async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  },

  // Block / unblock user
  onToggleBlock: async (id, block) => {
    const { data } = await api.patch(`/users/${id}/toggleBlock`, block);
    return data;
  }
};

export default userService;
