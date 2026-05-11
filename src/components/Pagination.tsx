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

  // فقط 5 صفحه اطراف page نشون بده
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  const pages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  const changePage = (newPage: number) => {
    setPage(newPage);

    // اسکرول به بالا (درست)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10 flex justify-center items-center gap-2">

      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
        className="px-4 py-2 rounded-lg border border-purple-300 text-purple-600
                   hover:bg-purple-500 hover:text-white transition
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Pages */}
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => changePage(num)}
          className={`px-4 py-2 rounded-lg border transition
            ${
              page === num
                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                : "text-purple-600 border-purple-300 hover:bg-purple-100"
            }`}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
        className="px-4 py-2 rounded-lg border border-purple-300 text-purple-600
                   hover:bg-purple-500 hover:text-white transition
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>

    </div>
  );
}