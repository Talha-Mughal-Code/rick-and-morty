'use client';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const goToPage = (page: number) => {
    console.log('Pagination: goToPage called with', page); // Debug
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  // Calculate page numbers to display (like a pro)
  const getVisiblePages = () => {
    const pages = [];
    const delta = 2; // How many pages to show on each side of current

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show first page
        i === totalPages || // Always show last page
        (i >= currentPage - delta && i <= currentPage + delta) // Show pages around current
      ) {
        pages.push(i);
      } else if (
        i === currentPage - delta - 1 ||
        i === currentPage + delta + 1
      ) {
        pages.push('...'); // Ellipsis for skipped pages
      }
    }

    // Remove consecutive ellipsis
    return pages.filter((page, index, array) => {
      return !(page === '...' && array[index - 1] === '...');
    });
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-container">
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
        aria-label="Go to previous page"
      >
        ← Previous
      </button>

      {/* Page Numbers - Show ellipsis for many pages */}
      <div className="hidden sm:flex items-center gap-1">
        {visiblePages.map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
                aria-hidden="true"
              >
                …
              </span>
            );
          }

          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => goToPage(pageNum as number)}
              className={`px-3 py-2 min-w-[40px] rounded-md transition-all duration-200 ${
                currentPage === pageNum
                  ? 'bg-[#0ab1c7] text-black font-bold scale-110 shadow-lg'
                  : 'bg-var(--bg-tertiary) text-var(--text-primary) hover:bg-var(--border-color)'
              }`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
              aria-label={`Go to page ${pageNum}`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Page Info (for mobile/centered) */}
      <div className="pagination-info">
        Page <span className="current-page">{currentPage}</span> of <span>{totalPages}</span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
        aria-label="Go to next page"
      >
        Next →
      </button>
    </div>
  );
}