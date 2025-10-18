import React from 'react';
import usePaginationStore from '@/store/pagination';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
    <div className="flex items-center justify-center mt-8">
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-600 transition-all duration-200"
        >
          <FiChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-2">
          {pages.map((page, idx) =>
            page === '...' ? (
              <span 
                key={idx} 
                className="px-3 py-2 text-sm text-slate-500"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-400'
                  }
                `}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-600 transition-all duration-200"
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight className="w-4 h-4" />
        </button>
      </nav>
      
      {/* Page Info */}
      <div className="ml-4 text-sm text-slate-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
