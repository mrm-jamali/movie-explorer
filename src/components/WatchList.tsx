import { useWatchList } from "../contexts/WatchListContext";
import {
  Trash2,
  Star,
  GripVertical,
} from "lucide-react";

import {
  Reorder,
  useDragControls,
} from "framer-motion";

import {
  useState,
  useEffect,
} from "react";
import type  {MovieItemProps} from "../types/movie"



function MovieItem({
  movie,
  index,
  items,
  toggleWatchList,
}: MovieItemProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={movie}
      dragListener={false}
      dragControls={controls}
      whileDrag={{
        scale: 1.01,
      }}
      className={`
        flex items-center justify-between
        px-6 py-5 bg-white
        transition-all duration-200
        hover:bg-gray-50
        hover:shadow-sm
        ${
          index !== items.length - 1
            ? "border-b border-gray-100"
            : ""
        }
      `}
    >

      {/* LEFT */}
      <div className="flex items-center gap-5">

        {/* DRAG HANDLE */}
        <button
          onPointerDown={(e) => controls.start(e)}
          className="
            text-[#9CA3AF]
            cursor-grab
            active:cursor-grabbing
            hover:text-[#6B7280]
            transition
          "
        >
          <GripVertical size={18} />
        </button>

        {/* POSTER */}
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="
            w-[58px]
            h-[82px]
            rounded-xl
            object-cover
          "
        />

        {/* INFO */}
        <div>
          <h3 className="text-[17px] font-semibold text-[#111827]">
            {movie.title}
          </h3>

          <div className="flex items-center gap-3 mt-2">

            {/* YEAR */}
            <span className="text-[15px] text-[#6B7280]">
              {movie.release_date?.slice(0, 4)}
            </span>

            {/* TAG */}
            <span
              className="
                px-3 py-1
                rounded-full
                bg-[#F3F4F6]
                text-[#6B7280]
                text-[13px]
                font-medium
              "
            >
              Sci-Fi
            </span>

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-14">

        {/* RATING */}
        <div className="flex items-center gap-1.5">

          <Star
            size={16}
            className="
              fill-[#FBBF24]
              text-[#FBBF24]
            "
          />

          <span className="text-[16px] font-semibold text-[#111827]">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>

        {/* REMOVE */}
        <button
          onClick={() => toggleWatchList(movie)}
          className="
            h-[46px]
            px-5
            rounded-xl
            border border-[#E9D5FF]
            bg-white
            text-[#7C3AED]
            text-[15px]
            font-semibold
            flex items-center gap-2
            hover:bg-[#FAF5FF]
            transition
          "
        >
          <Trash2 size={16} />
          Remove
        </button>

      </div>
    </Reorder.Item>
  );
}

/* =========================================
   MAIN
========================================= */

export default function WatchList() {
  const { watchList, toggleWatchList } =
    useWatchList();

  const [items, setItems] = useState(watchList);

  useEffect(() => {
    setItems(watchList);
  }, [watchList]);

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border border-gray-100
        p-6
      "
    >

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-[24px] font-bold text-[#111827]">
          Watchlist
        </h1>

        <p className="text-[15px] text-[#6B7280] mt-1">
          Movies and shows you want to watch later
        </p>

      </div>

      {/* EMPTY */}
      {items.length === 0 && (
        <p className="text-gray-500 text-center py-10">
          Your watchlist is empty.
        </p>
      )}

      {/* LIST */}
      <div
        className="
          rounded-3xl
          border border-gray-100
          overflow-hidden
        "
      >

        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col"
        >

          {items.map((movie, index) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              index={index}
              items={items}
              toggleWatchList={toggleWatchList}
            />
          ))}

        </Reorder.Group>
      </div>
    </div>
  );
}