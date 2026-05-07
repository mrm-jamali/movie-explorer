import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();

  // 🎬 Movie details
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id!),
  });

  // 🎭 Cast
  const { data: castData } = useQuery({
    queryKey: ["cast", id],
    queryFn: () => fetchMovieCredits(id!),
  });

  // 🎬 Similar
  const { data: similarData } = useQuery({
    queryKey: ["similar", id],
    queryFn: () => fetchSimilarMovies(id!),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading movie</p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 md:px-6">
      {/* 🎬 MAIN CARD */}
      <div className="flex flex-col md:flex-row gap-6 items-start bg-white rounded-2xl shadow-md p-4 md:p-6">
        {/* 🎬 Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          className="w-full md:w-[220px] rounded-xl shadow-sm"
        />

        {/* 📄 Info */}
        <div className="flex flex-col flex-1">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>

          {/* Year + Genres */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm text-gray-500 mt-2 mb-3">
            <span>{data.release_date?.slice(0, 4)}</span>

            {data.genres?.map((g: any) => (
              <span
                key={g.id}
                className="bg-gray-100 px-2 py-1 rounded-full text-xs"
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="text-yellow-500 font-semibold mb-4">
            ⭐ {data.vote_average.toFixed(1)}
          </div>

          {/* Favorite Button */}
          <button className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition w-fit">
            ❤️ Add to Favorite
          </button>

          {/* Overview */}
          <h2 className="text-lg font-bold mt-3">Overview</h2>

          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            {data.overview}
          </p>
        </div>
      </div>

      {/* 🎭 CAST */}
    <div className="mt-10">

  <h2 className="text-lg font-bold mb-4">
    Cast
  </h2>

  <div className="flex flex-wrap gap-4">

    {castData?.cast
      ?.filter((actor: any) => actor.profile_path)
      ?.slice(0, 6)
      .map((actor: any) => (
        <div
          key={actor.id}
          className="flex flex-col items-center w-[90px]"
        >

          {/* Image */}
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] object-cover rounded-lg shadow-sm"
          />

          {/* Name */}
          <p className="text-xs text-center mt-2 font-semibold text-gray-700 line-clamp-1">
            {actor.name}
          </p>

          {/* Character */}
          {actor.character && (
            <p className="text-[10px] text-center text-gray-400 line-clamp-1">
              {actor.character}
            </p>
          )}

        </div>
      ))}

  </div>

</div>

      {/* 🎬 SIMILAR MOVIES */}
      {/* 🎬 SIMILAR MOVIES */}
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-4">Similar Movies</h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1">
          {similarData?.results?.slice(0, 10).map((movie: any) => (
            <div
              key={movie.id}
              className="w-[140px] flex-shrink-0 cursor-pointer hover:scale-105 transition"
            >
              {/* 🎬 Poster wrapper */}
              <div className="relative">
                {/* Poster */}
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="rounded-lg w-full h-[200px] object-cover"
                />

                {/* ⭐ Rating Badge */}
                {movie.vote_average && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </div>
                )}
              </div>

              {/* Title */}
              <p className="text-xs mt-1 text-gray-700 line-clamp-2">
                {movie.title}
              </p>

              {/* Year */}
              <p className="text-[11px] text-gray-400">
                {movie.release_date?.slice(0, 4)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
