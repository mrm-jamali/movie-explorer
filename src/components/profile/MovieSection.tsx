import {
  Search,
  Star,
  ChevronDown,
} from "lucide-react";

import { useMovies } from "../../hooks/useMovies";
import { useState } from "react";

import Pagination from "../Pagination";


export default function MoviesSection() {
  const [page, setPage] = useState(1);
 const {
  data,
  isLoading,
  isError,
} = useMovies(page);

const movies = data?.results || [];


  return (
    <div className="p-5 md:p-6">

      {/* HEADER */}
      <div className="mb-6">

        <h1
          className="
            text-[26px]
            font-semibold
            tracking-[-0.5px]
            text-[#111827]
          "
        >
          Movies
        </h1>

        <p
          className="
            mt-1
            text-[14px]
            text-[#6B7280]
          "
        >
          Discover and browse all movies
        </p>

      </div>

      {/* FILTERS */}
      <div className="mb-7 flex items-center gap-3">

        {/* SEARCH */}
        <div
          className="
            flex h-[44px]
            w-[260px]
            items-center gap-2
            rounded-xl
            border border-gray-200
            bg-white
            px-3
          "
        >

          <Search
            size={16}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search movies..."
            className="
              w-full
              bg-transparent
              text-[13px]
              outline-none
              placeholder:text-gray-400
            "
          />

        </div>

        {/* GENRE */}
        <button
          className="
            flex h-[44px]
            items-center gap-2
            rounded-xl
            border border-gray-200
            bg-white
            px-4
            text-[13px]
            font-medium
            text-[#374151]
            hover:bg-gray-50
            transition
          "
        >
          Genres

          <ChevronDown size={16} />

        </button>

        {/* YEAR */}
        <button
          className="
            flex h-[44px]
            items-center gap-2
            rounded-xl
            border border-gray-200
            bg-white
            px-4
            text-[13px]
            font-medium
            text-[#374151]
            hover:bg-gray-50
            transition
          "
        >
          Year

          <ChevronDown size={16} />

        </button>

      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="text-[14px] text-gray-500">
          Loading movies...
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="text-[14px] text-red-500">
          Failed to fetch movies
        </div>
      )}

      {/* MOVIES GRID */}
      <div
        className="
          grid
          grid-cols-6
          gap-5
        "
      >

        {movies?.map((movie) => (

          <div
            key={movie.id}
            className="
              group
              cursor-pointer
            "
          >

            {/* POSTER */}
            <div
              className="
                overflow-hidden
                rounded-[18px]
                bg-gray-200
              "
            >

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="
                  h-[250px]
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

            </div>

            {/* INFO */}
            <div className="mt-2.5">

              <h3
                className="
                  truncate
                  text-[14px]
                  font-medium
                  text-[#111827]
                "
              >
                {movie.title}
              </h3>

              <div
                className="
                  mt-1.5
                  flex items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-[12px]
                    text-[#6B7280]
                  "
                >
                  {movie.release_date?.slice(0, 4)}
                </span>

                <div className="flex items-center gap-1">

                  <Star
                    size={13}
                    className="
                      fill-[#FBBF24]
                      text-[#FBBF24]
                    "
                  />

                  <span
                    className="
                      text-[12px]
                      font-medium
                      text-[#111827]
                    "
                  >
                    {movie.vote_average.toFixed(1)}
                  </span>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>
      {data && (
  <Pagination
    page={page}
    setPage={setPage}
    totalPages={Math.min(data.total_pages, 500)}
  />
)}

    </div>
  );
}