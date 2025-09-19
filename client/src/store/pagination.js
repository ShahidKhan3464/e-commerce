import { create } from 'zustand';

const usePaginationStore = create((set) => ({
  currentPage: 1,
  pageSize: 5,
  totalPages: 1,
  totalItems: 0,
  loading: false,
  error: null,

  setPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  setTotalPages: (total) => set({ totalPages: total }),
  setTotalItems: (total) => set({ totalItems: total }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));

export default usePaginationStore;
