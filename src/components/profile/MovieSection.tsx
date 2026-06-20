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
    movie?.title?.toLowerCase().includes(search.toLowerCase())
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
        <div className="flex flex-col gap-3 mb-6">

          {/* 🔥 SEARCH (FIX اصلی ریسپانسیو) */}
          <div className="w-full min-w-0 overflow-hidden">
            <SearchBar onSearch={setSearch} />
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap gap-2 sm:gap-3">

            <button className="flex flex-1 sm:flex-none justify-center sm:justify-start h-10 sm:h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 sm:px-4 text-xs sm:text-[13px] font-medium text-[#374151] transition hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#FAF5FF]">
              Genres <ChevronDown size={16} />
            </button>

            <button className="flex flex-1 sm:flex-none justify-center sm:justify-start h-10 sm:h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 sm:px-4 text-xs sm:text-[13px] font-medium text-[#374151] transition hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#FAF5FF]">
              Year <ChevronDown size={16} />
            </button>

          </div>
        </div>

        {/* ================= LOADING ================= */}
        {isLoading && (
          <div className="text-sm text-gray-500 mb-6">
            Loading movies...
          </div>
        )}

        {/* ================= ERROR ================= */}
        {isError && (
          <div className="text-sm text-red-500 mb-6">
            Failed to fetch movies
          </div>
        )}

        {/* ================= GRID ================= */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          gap-3
          sm:gap-4
          md:gap-6
        ">
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