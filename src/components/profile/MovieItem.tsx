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

  const content = (
    <>
      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        {/* DRAG HANDLE */}
        {enableDrag && (
          <button
            onPointerDown={(e) => controls.start(e)}
            className="text-[#9CA3AF] cursor-grab active:cursor-grabbing hover:text-[#6B7280] transition p-1 hidden sm:block"
          >
            <GripVertical size={18} />
          </button>
        )}

        {/* POSTER */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : movie.poster
              ? `https://image.tmdb.org/t/p/w200${movie.poster}`
              : "/no-image.png"
          }
          alt={movie.title}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
        />

        {/* INFO */}
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-[17px] font-semibold text-[#111827] line-clamp-1">
            {movie.title}
          </h3>

          <div className="flex items-center gap-2 sm:gap-3 mt-1.5">
            <span className="text-sm sm:text-[15px] text-[#6B7280]">
              {movie.release_date?.slice(0, 4)}
            </span>

            <span className="hidden lg:inline px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] text-xs sm:text-[13px] font-medium whitespace-nowrap">
  Sci-Fi
</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-14 flex-shrink-0">
        <button
          onClick={() => onRemove(movie)}
          className="
            h-10 sm:h-[46px]
            px-4 sm:px-5
            rounded-xl
            border border-[#E9D5FF]
            bg-white
            text-[#7C3AED]
            text-sm sm:text-[15px]
            font-semibold
            flex items-center gap-2
            hover:bg-[#FAF5FF]
            transition
          "
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </>
  );

  const baseClasses = `
    flex items-center justify-between 
    px-4 sm:px-6 py-4 sm:py-5 
    bg-white
    transition-all duration-200
    hover:bg-gray-50
    hover:shadow-sm
    ${index !== items.length - 1 ? "border-b border-gray-100" : ""}
  `;

  return enableDrag ? (
    <Reorder.Item
      value={movie}
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.01 }}
      className={baseClasses}
    >
      {content}
    </Reorder.Item>
  ) : (
    <div className={baseClasses}>{content}</div>
  );
}