import { Trash2, GripVertical } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import type { MovieItemProps } from "../../types/movie";

type Props = MovieItemProps & {
  index: number;
  items: any[];
  enableDrag?: boolean;
  onRemove: (movie: any) => void;
};

export default function MovieItem({
  movie,
  index,
  items,
  enableDrag = false,
  onRemove,
}: Props) {
  const controls = useDragControls();
  const isLast = index === items.length - 1;

  return enableDrag ? (
    <Reorder.Item
      value={movie}
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.02 }}
      className="lg:border-b lg:border-gray-100 last:border-none"
    >
      <CardContent movie={movie} onRemove={onRemove} isLast={isLast} />
    </Reorder.Item>
  ) : (
    <CardContent movie={movie} onRemove={onRemove} isLast={isLast} />
  );
}

function CardContent({
  movie,
  onRemove,
  isLast,
}: {
  movie: any;
  onRemove: (movie: any) => void;
  isLast: boolean;
}) {
  return (
    <div
      className={`
        group bg-white rounded-2xl lg:rounded-none lg:border-b lg:border-gray-100
        overflow-hidden transition-all duration-200
        hover:shadow-md lg:hover:shadow-none lg:hover:bg-gray-50
        ${isLast ? "lg:border-b-0" : ""}
      `}
    >
      {/* ================= MOBILE & TABLET - CARD VIEW ================= */}
      <div className="lg:hidden p-4 flex flex-col">
        <div className="flex gap-3">
          {/* Poster */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : movie.poster
                ? `https://image.tmdb.org/t/p/w200${movie.poster}`
                : "/no-image.png"
            }
            alt={movie.title}
            className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight line-clamp-2 text-gray-900">
              {movie.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              {movie.release_date?.slice(0, 4) || "N/A"}
            </p>
            <span className="inline-block mt-2 px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              Sci-Fi
            </span>
          </div>
        </div>

        {/* Remove Button - Mobile (بنفش مثل دسکتاپ) */}
        <button
          onClick={() => onRemove(movie)}
          className="mt-4 w-full py-2.5 text-purple-700 hover:bg-purple-50 border border-purple-200 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2"
        >
          <Trash2 size={17} />
          Remove from Favorites
        </button>
      </div>

      {/* ================= DESKTOP - LIST VIEW ================= */}
      <div className="hidden lg:flex items-center justify-between px-6 py-4 hover:bg-gray-50">
        {/* Left */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : movie.poster
                ? `https://image.tmdb.org/t/p/w200${movie.poster}`
                : "/no-image.png"
            }
            alt={movie.title}
            className="w-16 h-16 rounded-xl object-cover"
          />

          <div>
            <h3 className="text-[16px] font-semibold text-gray-900">
              {movie.title}
            </h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-sm text-gray-500">
                {movie.release_date?.slice(0, 4) || "N/A"}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                Sci-Fi
              </span>
            </div>
          </div>
        </div>

        {/* Right - Remove Button */}
        <button
          onClick={() => onRemove(movie)}
          className="px-4 py-2.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 flex items-center gap-2 text-sm font-medium transition"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}