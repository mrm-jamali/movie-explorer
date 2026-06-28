import { useQuery } from "@tanstack/react-query";
import { fetchFilteredMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { useEffect, useRef, useState } from "react";
import MoviesFilter from "../components/MoviesFilter";
import { useFilterStore } from "../store/filterStore";
import QueryState from "../components/QueryState";
import { X } from "lucide-react";


export default function MoviesList() {
  const [page, setPage] = useState(1);

  const [desktopFiltersOpen, setDesktopFiltersOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const selectedGenres = useFilterStore((state) => state.selectedGenres);
  const releaseYear = useFilterStore((state) => state.releaseYear);
  const rating = useFilterStore((state) => state.rating);

  const resetFilters = useFilterStore((state) => state.resetFilters);

  const topRef = useRef<HTMLDivElement | null>(null);

  const handleReset = () => {
    resetFilters();
    setPage(1);
  };

  const { data, isLoading, error  } = useQuery({
    queryKey: ["movies", page, selectedGenres.join(","), releaseYear, rating],
    queryFn: () =>
      fetchFilteredMovies(page, selectedGenres, releaseYear, rating),
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  useEffect(() => {
    topRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  // Toggle Logic
  const toggleFilter = () => {
    if (window.innerWidth >= 1024) {
      setDesktopFiltersOpen((prev) => !prev);
    } else {
      setMobileFiltersOpen(true);
    }
  };

  return (
    <QueryState isLoading={isLoading} error={error}>
      <div className="max-w-7xl mx-auto px-4 mt-6">
        {/* TITLE */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Movies</h1>
          <p className="text-gray-500 text-sm">
            Discover and explore all the movies.
          </p>
        </div>

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <div />

          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border rounded-md text-sm">
              Sort by: Latest
            </button>

            {/* Filter Button */}
            <button
              onClick={toggleFilter}
              className="px-3 py-2 border rounded-md text-sm hover:bg-gray-100 transition"
            >
              {desktopFiltersOpen && window.innerWidth >= 1024 ? "Hide Filters" : "Filter"}
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div ref={topRef} className="flex flex-col lg:flex-row gap-6">
          {/* DESKTOP SIDEBAR */}
          <div
            className={`hidden lg:block transition-all duration-300 ${
              desktopFiltersOpen ? "w-[290px]" : "w-0 overflow-hidden"
            }`}
          >
            {desktopFiltersOpen && <MoviesFilter onReset={handleReset} />}
          </div>

          {/* CONTENT AREA - Full width when filters closed */}
          <div
            className={`flex-1 transition-all duration-300 ${
              desktopFiltersOpen ? "" : "lg:ml-0"
            }`}
          >
            <div
              className="
                grid gap-4
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
              "
            >
              {movies.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>

        {/* MOBILE OVERLAY    */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileFiltersOpen(false)}
            />

            {/* PANEL */}
            <div className="relative w-full h-full bg-white p-6 overflow-y-auto">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-2xl"
                >
                   <X size={24} />
                </button>
              </div>

              <MoviesFilter onReset={handleReset} />
            </div>
          </div>
        )}
      </div>
    </QueryState>
  );
}