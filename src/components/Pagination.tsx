interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const goToPage = (page: number) => {
    console.log('Pagination: goToPage called with', page); // Debug
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button
        onClick={() => {
          console.log('Prev clicked, current page:', currentPage); // Debug
          goToPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg border transition ${
          currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        Prev
      </button>

      <span className="px-4 py-2 text-sm font-medium">
        Page <span className="font-semibold">{currentPage}</span> of {totalPages}
      </span>

      <button
        onClick={() => {
          console.log('Next clicked, current page:', currentPage); // Debug
          goToPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg border transition ${
          currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        Next
      </button>
    </div>
  );
}