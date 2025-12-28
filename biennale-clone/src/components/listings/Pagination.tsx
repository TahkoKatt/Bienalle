interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 7 page numbers
  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border-medium)',
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[40px]"
            style={{
              backgroundColor: isActive ? 'var(--color-primary-600)' : 'var(--color-surface)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: isActive ? 'var(--color-primary-600)' : 'var(--color-border-medium)',
              color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border-medium)',
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
