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
      {/* TOAST */}
      <Toast message={toast} onClose={() => setToast(null)} />

      {/* WRAPPER (مثل بقیه صفحاتت) */}
      <div className="max-w-6xl mx-auto px-6">

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
        <div className="flex items-center gap-4 flex-wrap mb-6">

          {/* SEARCH */}
          <SearchBar onSearch={setSearch} />

          {/* GENRES */}
          <button className="flex h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[13px] font-medium text-[#374151] transition hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#FAF5FF]">
            Genres <ChevronDown size={16} />
          </button>

          {/* YEAR */}
          <button className="flex h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[13px] font-medium text-[#374151] transition hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#FAF5FF]">
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

        {/* GRID */}
        <div className="grid grid-cols-6 gap-x-6 gap-y-10">
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
    </>
  );
}