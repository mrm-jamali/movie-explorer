import { ChevronDown } from "lucide-react";
import { useMovies } from "../../hooks/useMovies";
import { useState } from "react";
import Pagination from "../Pagination";
import { useFavorites } from "../../contexts/FavoriteContext";
import Toast from "../Toast";
import MovieCard from "../MovieCard";
import SearchBar from "../SearchBar";

export default function MoviesSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const { data, isLoading, isError } = useMovies(page);
  const { toggleFavorite, isFavorite } = useFavorites();

  const movies = data?.results || [];

  const filteredMovies = movies.filter((movie: any) =>
    movie?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const showToast = (message: string) => {
    setToast(message);
  };

  return (
    <>
      <Toast message={toast} onClose={() => setToast(null)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ================= HEADER ================= */}
        <div className="mb-5 md:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.5px] text-[#111827]">
            Movies
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
            Discover and browse all movies
          </p>
        </div>

        {/* ================= FILTERS ================= */}
        {/* FILTERS */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center mb-6">
          {/* SEARCH */}
          <div className="w-full lg:flex-1 min-w-0">
            <SearchBar onSearch={setSearch} />
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:ml-auto">
           <button
  className="
    flex items-center justify-between
    w-full sm:w-auto
    px-4
    h-[44px] sm:h-12
    rounded-xl
    border border-gray-200
    bg-white
    text-sm font-medium text-[#374151]
    hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50
    transition-all active:scale-[0.97]
  "
>
  <span>Genres</span>

  <ChevronDown size={16} className="ml-2 shrink-0" />
</button>
<button
  className="
    flex items-center justify-between
    w-full sm:w-auto
    px-4
    h-[44px] sm:h-12
    rounded-xl
    border border-gray-200
    bg-white
    text-sm font-medium text-[#374151]
    hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50
    transition-all active:scale-[0.97]
  "
>
  <span>Year</span>

  <ChevronDown size={16} className="ml-2 shrink-0" />
</button>
          </div>
        </div>
        {/* ================= LOADING ================= */}
        {isLoading && (
          <div className="text-sm text-gray-500 mb-6">Loading movies...</div>
        )}

        {/* ================= ERROR ================= */}
        {isError && (
          <div className="text-sm text-red-500 mb-6">
            Failed to fetch movies
          </div>
        )}

        {/* ================= GRID ================= */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          gap-3
          sm:gap-4
          md:gap-6
        "
        >
          {filteredMovies
            ?.filter((movie) => movie?.id)
            .map((movie: any) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                onFavorite={() => toggleFavorite(movie)}
                onToast={showToast}
              />
            ))}
        </div>

        {/* ================= PAGINATION ================= */}
        {data && (
          <div className="mt-8 md:mt-10">
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={Math.min(data.total_pages, 500)}
            />
          </div>
        )}
      </div>
    </>
  );
}
