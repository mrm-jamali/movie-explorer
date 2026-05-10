import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";

export default function MoviesList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchPopularMovies,
  });

  const movies = data?.results ?? [];

  if (isLoading)
    return <p className="text-center mt-10">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading movies
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Movies</h1>
        <p className="text-gray-500 text-sm">
          Discover and explore all the movies.
        </p>
      </div>

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div></div>

        <div className="flex items-center gap-3">
          <button className="px-3 py-2 border rounded-md text-sm">
            Sort by: Latest
          </button>

          <button className="px-3 py-2 border rounded-md text-sm">
            Filter
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">

        {/* Sidebar */}
        <div className="w-64 bg-white p-4 rounded-xl shadow">
          Filters Sidebar
        </div>

        {/* Movies Section */}
        <div className="flex-1">

          {/* Count */}
          <p className="mb-4 text-sm text-gray-500">
            {movies.length} Movies found
          </p>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

        </div>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        Pagination
      </div>

    </div>
  );
}