import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import {Heart } from "lucide-react";

import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
} from "../services/movieApi";

import { useFavorites } from "../contexts/FavoriteContext";
import { useWatchList } from "../contexts/WatchListContext";
import { useAuth } from "../contexts/AuthContext";

function MovieDetails() {
  const { id } = useParams();

  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleWatchList, isInWatchList } =
    useWatchList();

  const { user } = useAuth();

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

  // 🎬 Similar movies
  const { data: similarData } = useQuery({
    queryKey: ["similar", id],
    queryFn: () => fetchSimilarMovies(id!),
  });

  if (isLoading)
    return (
      <p className="text-center mt-10">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading movie
      </p>
    );

  const favorite = isFavorite(data.id);

  const watchListed = isInWatchList(
    data.id
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 md:px-6">

      {/* MAIN CARD */}
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-md p-4 md:p-6">

        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          className="w-full md:w-[220px] rounded-xl object-cover"
        />

        {/* Info */}
        <div className="flex flex-col flex-1">

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">
            {data.title}
          </h1>

          {/* Year + Genres */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-2">
            <span>
              {data.release_date?.slice(0, 4)}
            </span>

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
          <div className="text-yellow-500 font-semibold mt-3">
            ⭐ {data.vote_average?.toFixed(1)}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3 mt-4">

            {/* FAVORITE */}
           <button
  onClick={() => {
    if (!user) {
      alert("Please login first");
      return;
    }

    toggleFavorite({
      id: data.id,
      title: data.title,
      poster: data.poster_path,
      release_date: data.release_date,
      rating: data.vote_average,
    });
  }}
  className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${
    favorite
      ? "bg-purple-500 text-white hover:bg-purple-600"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }`}
>
  <Heart
    size={18}
    className={
      favorite ? "fill-white text-white" : "text-gray-600"
    }
  />

  {favorite ? "Added to Favorites" : "Add to Favorite"}
</button>

            {/* WATCHLIST */}
            <button
              onClick={() => {
                if (!user) {
                  alert(
                    "Please login first"
                  );
                  return;
                }

                toggleWatchList({
                  id: data.id,
                  title: data.title,
                  poster:
                    data.poster_path,
                  release_date:
                    data.release_date,
                  rating:
                    data.vote_average,
                });
              }}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${
  watchListed
    ? "bg-purple-500 text-white hover:bg-purple-600"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
}`}
            >
              <Bookmark size={18} />

              {watchListed
                ? "Added to WatchList"
                : "Add to WatchList"}
            </button>

          </div>

          {/* Overview */}
          <h2 className="text-lg font-bold mt-4">
            Overview
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            {data.overview}
          </p>

        </div>
      </div>

      {/* CAST */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">
          Cast
        </h2>

        <div className="flex gap-4 flex-wrap">
          {castData?.cast
            ?.filter(
              (actor: any) =>
                actor.profile_path
            )
            ?.slice(0, 6)
            .map((actor: any) => (
              <div
                key={actor.id}
                className="w-[90px] text-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  className="w-[70px] h-[70px] rounded-lg object-cover mx-auto"
                />

                <p className="text-xs mt-1">
                  {actor.name}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* SIMILAR MOVIES */}
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-4">
          Similar Movies
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
       {similarData?.results
  ?.slice(0, 10)
  .map((movie: any) => (
    <Link
      to={`/movie/${movie.id}`}
      key={movie.id}
      className="w-[140px] flex-shrink-0 block"
    >
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          className="rounded-lg w-full h-[200px] object-cover"
        />

        <p className="text-xs mt-1 line-clamp-2">
          {movie.title}
        </p>

        <p className="text-[11px] text-gray-400">
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>
    </Link>
  ))}
        </div>
      </div>

    </div>
  );
}

export default MovieDetails;