import React from 'react';
import usePaginationStore from '@/store/pagination';

export default function Pagination() {
  const { currentPage, totalPages, setPage } = usePaginationStore();

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      // show all if pages are few
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first & last
      pages.push(1);

      // Left dots
      if (currentPage > 4) {
        pages.push('...');
      }

      // Middle range
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      // Right dots
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className="px-3 py-1 cursor-pointer border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={idx} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`px-3 py-1 cursor-pointer border rounded-lg ${
              currentPage === page ? 'bg-indigo-500 text-white' : 'bg-white'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
        className="px-3 py-1 cursor-pointer border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
