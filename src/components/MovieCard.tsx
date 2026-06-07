import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../contexts/FavoriteContext";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  id: number;
  title: string;
  poster: string;
  release_date: string;
  rating?: number;
};

export default function MovieCard({
  id,
  title,
  poster,
  release_date,
  rating,
}: Props) {
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  const isFavorite = favorites.some(
    (movie) => movie.id === id
  );

  const year = release_date?.slice(0, 4);

  return (
    <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

      {/* FAVORITE BUTTON */}
      <button
        onClick={() => {
          if (!user) {
            alert("Please login first");
            return;
          }

          toggleFavorite({
            id,
            title,
            poster,
            release_date,
            rating,
          });
        }}
        className="
          absolute
          top-3
          right-3
          z-10
          h-9
          w-9
          flex
          items-center
          justify-center
          rounded-full
          bg-white/90
          backdrop-blur-md
          border
          border-gray-200
          shadow-sm
          hover:scale-110
          active:scale-95
          transition-all
          duration-300
        "
      >
        <FaHeart
          className={`
            text-[18px]
            transition-all
            duration-300
            ${
              isFavorite
                ? "text-red-500 scale-110"
                : "text-gray-400 hover:text-gray-500"
            }
          `}
        />
      </button>

      {/* IMAGE */}
      <Link
        to={`/movie/${id}`}
        className="flex flex-col h-full"
      >
        <div className="h-[250px] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
            className="
              w-full
              h-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* INFO */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          <h3 className="text-[14px] font-semibold text-[#111827] line-clamp-2">
            {title}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-[12px] text-[#6B7280]">
              {year}
            </p>

            {rating && (
              <div className="text-[12px] font-medium text-[#111827]">
                ⭐ {rating.toFixed(1)}
              </div>
            )}
          </div>
        </div>
      </Link>

    </div>
  );
}