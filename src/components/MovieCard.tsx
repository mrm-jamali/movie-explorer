import { Heart, Star } from "lucide-react";
import { useFavorites } from "../contexts/FavoriteContext";
import { Link } from "react-router-dom";

type Props = {
  movie: {
    id: number;
    title: string;
    poster_path?: string;
    release_date?: string;
    vote_average?: number;

  };
  showFavorite?: boolean;
    isFavorite?: boolean;
      onFavorite?: () => void;
  onToast?: (msg: string) => void;
};

export default function MovieCard({ movie, showFavorite = true }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!movie) return null; // 👈 جلوگیری از crash

  const fav = isFavorite(movie.id);

  const formattedMovie = {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path || "",
    release_date: movie.release_date || "",
    rating: movie.vote_average || 0,
  };

  return (
    <div className="group cursor-pointer">
      {/* POSTER */}
<Link to={`/movie/${movie.id}`}>
      <div className="relative overflow-hidden rounded-[18px] bg-gray-200">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* HEART */}
        {showFavorite && (
          <button
            onClick={() => toggleFavorite(formattedMovie)}
            className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition"
          >
            <Heart
              size={18}
              className={fav ? "fill-red-500 text-red-500" : "text-white"}
            />
          </button>
        )}
      </div>
</Link>
      {/* INFO */}
      <div className="mt-2.5">
        <h3 className="truncate text-[14px] font-medium text-[#111827] ">
          {movie.title}
        </h3>

        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[12px] text-[#6B7280]">
            {movie.release_date?.slice(0, 4)}
          </span>

          <div className="flex items-center gap-1">
            <Star size={13} className="fill-[#FBBF24] text-[#FBBF24]" />
            <span className="text-[12px] font-medium text-[#111827]">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
