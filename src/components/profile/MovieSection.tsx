import {
  Search,
  Star,
  ChevronDown,
  Heart,
} from "lucide-react";

import { useMovies } from "../../hooks/useMovies";
import { useState } from "react";
import Pagination from "../Pagination";
import { useFavorites } from "../../contexts/FavoriteContext";
import Toast from "../Toast";
import MovieCard from "../MovieCard";

export default function MoviesSection() {
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const { data, isLoading, isError } = useMovies(page);
  const { toggleFavorite, isFavorite } = useFavorites();

  const movies = data?.results || [];

  const showToast = (message: string) => {
    setToast(message);
  };

  return (
    <div className="px-6 py-6">

      {/* TOAST */}
      <Toast message={toast} onClose={() => setToast(null)} />

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-[26px] font-semibold tracking-[-0.5px] text-[#111827]">
          Movies
        </h1>

        <p className="mt-1 text-[14px] text-[#6B7280]">
          Discover and browse all movies
        </p>
      </div>

      {/* FILTERS */}
     {/* FILTERS */}
<div className="mb-7 flex items-center gap-3">

  {/* SEARCH (کمی وایدتر و حرفه‌ای‌تر) */}
  <div
    className="
      flex h-[44px]
      w-[320px]
      items-center gap-2
      rounded-xl
      border border-gray-200
      bg-white
      px-3
      transition
      hover:border-[#7C3AED]
      focus-within:border-[#7C3AED]
      focus-within:ring-2
      focus-within:ring-[#7C3AED]/10
    "
  >
    <Search size={16} className="text-gray-400" />
<input
  type="text"
  placeholder="Search movies..."
  className="
    w-[360px]
    bg-transparent
    text-[13px]
    outline-none
    placeholder:text-gray-400
  "
/>
  </div>

  {/* GENRES */}
  <button
    className="
      flex h-[44px]
      items-center gap-2
      rounded-xl
      border border-gray-200
      bg-white
      px-4
      text-[13px]
      font-medium
      text-[#374151]
      transition
      hover:border-[#7C3AED]
      hover:text-[#7C3AED]
      hover:bg-[#FAF5FF]
    "
  >
    Genres <ChevronDown size={16} />
  </button>

  {/* YEAR */}
  <button
    className="
      flex h-[44px]
      items-center gap-2
      rounded-xl
      border border-gray-200
      bg-white
      px-4
      text-[13px]
      font-medium
      text-[#374151]
      transition
      hover:border-[#7C3AED]
      hover:text-[#7C3AED]
      hover:bg-[#FAF5FF]
    "
  >
    Year <ChevronDown size={16} />
  </button>

</div>

      {/* LOADING */}
      {isLoading && (
        <div className="text-[14px] text-gray-500 mb-6">
          Loading movies...
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="text-[14px] text-red-500 mb-6">
          Failed to fetch movies
        </div>
      )}

      {/* GRID (اصلاح فاصله‌ها اینجاست 👇) */}
    <div className="grid grid-cols-6 gap-x-6 gap-y-10">

  {movies
    ?.filter((movie) => movie?.id) // 👈 جلوگیری از undefined
    .map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onToast={showToast}
      />
    ))}

</div>

      {/* PAGINATION */}
      {data && (
        <div className="mt-10">
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={Math.min(data.total_pages, 500)}
          />
        </div>
      )}

    </div>
  );
}