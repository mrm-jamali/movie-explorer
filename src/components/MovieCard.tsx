import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../contexts/FavoriteContext";

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

  // 👇 چون الان favorites آبجکت movie هست نه فقط id
  const isFavorite = favorites.some((m) => m.id === id);

  const year = release_date?.slice(0, 4);

  return (
    <div className="relative w-[160px] h-[320px] bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">

      {/* Favorite Button */}
      <button
        onClick={() =>
          toggleFavorite({
            id,
            title,
            poster,
            release_date,
            rating,
          })
        }
        className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-purple-200 transition"
      >
        <FaHeart
          className={`text-lg transition duration-200
            ${isFavorite ? "text-purple-600" : "text-white"}
          `}
        />
      </button>

      <Link to={`/movie/${id}`} className="block">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          className="w-full h-[240px] object-cover"
        />

        <div className="p-2 flex flex-col gap-1">
          <h3 className="font-bold text-sm line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-400">{year}</p>
        </div>
      </Link>

      {rating !== undefined && (
        <div className="absolute bottom-[90px] left-2 bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded-full shadow">
          {rating.toFixed(1)}
        </div>
      )}
    </div>
  );
}