import { useEffect, useRef, useState } from "react";
import { useFavorites } from "../contexts/FavoriteContext";
import { useAuth } from "../contexts/AuthContext";
import { Star, Trash2, Share2, Clapperboard } from "lucide-react";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const { user } = useAuth();

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close menu bu clicking outside
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = (movie: any) => {
    const url = window.location.origin + `/movie/${movie.id}`;

    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: `Watch: ${movie.title}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">
            Favorite Movies
          </h1>
          <p className="text-gray-500 mt-1">Your personal movie collection</p>
        </div>

        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
          {favorites.length} Movies
        </div>
      </div>

      {/* EMPTY STATES */}
      {!user ? (
        <p className="text-center text-gray-500 mt-20">Please login first</p>
      ) : favorites.length === 0 ? (
        <p className="text-center mt-20 flex items-center justify-center gap-3 text-lg font-semibold text-gray-700">
          <Clapperboard size={26} className="text-purple-500" />
          No favorites yet
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="flex gap-5 bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition relative"
            >
              {/* POSTER */}
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
                className="w-[110px] h-[150px] object-cover rounded-xl"
              />

              {/* INFO */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {movie.title}
                  </h2>

                  <p className="text-sm text-purple-500 mt-1">
                    {movie.release_date?.slice(0, 4)}
                  </p>

                  {/*  rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-purple-600 text-sm font-bold">
                      <Star
                        size={14}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      {movie.rating?.toFixed(1) || "N/A"}
                    </span>
                  </div>

                  {/* overview */}
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {movie.overview ||
                      "No description available for this movie."}
                  </p>
                </div>
              </div>

              {/* MENU */}
              <div className="relative" ref={menuRef}>
                {/* 3 dots */}
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === movie.id ? null : movie.id)
                  }
                  className="text-purple-600 text-2xl font-bold px-2"
                >
                  ⋮
                </button>

                {/* dropdown */}
                {openMenuId === movie.id && (
                  <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-white shadow-xl overflow-hidden border border-purple-100">
                    <button
                      onClick={() => {
                        handleShare(movie);
                        setOpenMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition"
                    >
                      <Share2 size={16} className="text-indigo-500" />
                      Share
                    </button>

                    {/* REMOVE */}
                    <button
                      onClick={() => {
                        removeFavorite(movie.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 size={16} className="text-red-500" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
