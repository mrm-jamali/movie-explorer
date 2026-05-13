import { useQuery } from "@tanstack/react-query";
import { fetchFilteredMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { useEffect, useRef, useState } from "react";
import MoviesFilter from "../components/MoviesFilter";
import { useFilterStore } from "../store/filterStore";

export default function MoviesList() {
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);

  const selectedGenres = useFilterStore((state) => state.selectedGenres);
  const releaseYear = useFilterStore((state) => state.releaseYear);
  const rating = useFilterStore((state) => state.rating);

  const resetFilters = useFilterStore((state) => state.resetFilters);

  const topRef = useRef<HTMLDivElement | null>(null);

  const handleReset = () => {
    resetFilters();
    setPage(1);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "movies",
      page,
      selectedGenres.join(","),
      releaseYear,
      rating,
    ],
    queryFn: () =>
      fetchFilteredMovies(page, selectedGenres, releaseYear, rating),
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  const isInitialLoading = isLoading && movies.length === 0;

  useEffect(() => {
    topRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading movies
      </p>
    );

  return (
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

          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            Filter
          </button>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div ref={topRef} className="flex gap-6">

        {/* SIDEBAR */}
        {showFilters && (
          <MoviesFilter onReset={handleReset} />
        )}

        {/* CONTENT */}
        <div className="flex-1">

          {/* LOADING */}
          {isInitialLoading && (
            <p className="text-center mt-10">Loading...</p>
          )}

          {/* COUNT */}
          {!isInitialLoading && (
            <p className="mb-4 text-sm text-gray-500">
              {movies.length} Movies found
            </p>
          )}

          {/* GRID (🔥 اینجا مهمه) */}
          <div
            className={`grid gap-4 transition-all duration-300 ${
              showFilters
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            }`}
          >
            {movies.map((movie: any) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                release_date={movie.release_date}
                rating={movie.vote_average}
              />
            ))}
          </div>

          {/* PAGINATION */}
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}