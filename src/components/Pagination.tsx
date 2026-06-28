type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  const pages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  const changePage = (newPage: number) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mt-6">

      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
        className="
          px-3 sm:px-4 py-2 text-sm sm:text-base
          rounded-lg border border-purple-300 text-purple-600
          hover:bg-purple-500 hover:text-white transition
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Prev
      </button>

      {/* Pages mobile version */}
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">

        {pages.map((num) => (
          <button
            key={num}
            onClick={() => changePage(num)}
            className={`
              min-w-[36px] sm:min-w-[40px]
              px-2 sm:px-4 py-2 text-sm sm:text-base
              rounded-lg border transition
              ${
                page === num
                  ? "bg-purple-600 text-white border-purple-600 shadow-md"
                  : "text-purple-600 border-purple-300 hover:bg-purple-100"
              }
            `}
          >
            {num}
          </button>
        ))}

      </div>

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
        className="
          px-3 sm:px-4 py-2 text-sm sm:text-base
          rounded-lg border border-purple-300 text-purple-600
          hover:bg-purple-500 hover:text-white transition
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Next
      </button>

    </div>
  );
}