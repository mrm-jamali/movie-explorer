import { useEffect, useState } from "react";
import FavoriteMovieMenu from "../components/FavoriteMovieMenu";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Your List Of Favorite Movies
          </h1>
          <p className="text-gray-500 mt-1">
            Here are the movies you have added to your favorite
          </p>
        </div>

        {/*  Counter Button */}
        {/*  Counter Button (Improved UI) */}
<div className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full">
  
  {/* Dot indicator */}
  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>

  {/* Text */}
  <span className="text-sm font-semibold text-gray-700">
    {favorites.length} Movies
  </span>

</div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">

        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite movies yet.</p>
        ) : (
          favorites.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center gap-4 bg-white shadow-md rounded-xl py-5 px-4 relative"
            >
              {/*  Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-[120px] h-[120px] rounded-xl object-cover"
              />

              {/*  Info */}
              <div className="flex flex-col h-[120px] justify-between w-full">

                {/* Title + Rating */}
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {movie.title}
                  </h2>

                  <span className="text-black text-sm font-bold flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>

                {/* Year + Genres */}
                <div className="flex items-center gap-1">
                  <p className="text-sm text-gray-500">
                    {movie.release_date?.slice(0, 4)}
                  </p>

                  <div className="flex flex-wrap gap-1 text-sm text-gray-600">
                    {movie.genres?.slice(0, 3)?.map((g: any) => (
                      <span
                        key={g.id}
                        className="bg-gray-100 px-2 py-0.5 rounded-full text-xs"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Production */}
                <div className="flex items-center gap-2 bg-purple-100 px-2 py-[2px] rounded-md w-fit">
                  <button className="text-gray-500 hover:text-black text-lg leading-none">
                    ☰
                  </button>

                  <p className="text-[11px] text-gray-600 leading-none">
                    {movie.production_companies?.[0]?.name}
                  </p>
                </div>

                {/* Overview */}
                <p className="text-xs text-gray-500 line-clamp-2 w-[55%]">
                  {movie.overview}
                </p>

              </div>

              {/* Menu */}
              <FavoriteMovieMenu
                movie={movie}
                onRemove={(id) => {
                  const updated = favorites.filter((m) => m.id !== id);
                  setFavorites(updated);
                  localStorage.setItem("favorites", JSON.stringify(updated));
                }}
              />

            </div>
          ))
        )}
      </div>
    </div>
  );
}