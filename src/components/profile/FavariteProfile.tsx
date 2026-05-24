import {
  Heart,
  Star,
} from "lucide-react";

import { useNavigate }
  from "react-router-dom";

import {
  useFavorites,
} from "../../contexts/FavoriteContext";

export default function FavariteProfile() {

  const navigate =
    useNavigate();

  const {
    favorites,
    removeFavorite,
  } = useFavorites();

  return (

    <div
      className="
        flex-1
        bg-[#F8F9FB]
        min-h-screen
        px-10
        py-10
      "
    >

      {/* HEADER */}
      <div className="mb-10">

        <h1
          className="
            text-[42px]
            font-bold
            tracking-[-1px]
            text-[#111827]
          "
        >
          Favorites
        </h1>

        <p
          className="
            mt-2
            text-[17px]
            text-[#6B7280]
          "
        >
          Your favorite movies and TV shows
        </p>

      </div>

      {/* EMPTY */}
      {favorites.length === 0 && (

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-32
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              h-24
              w-24
              rounded-full
              bg-[#EEE7FF]
            "
          >
            <Heart
              size={40}
              className="
                text-[#7C3AED]
              "
            />
          </div>

          <h2
            className="
              mt-6
              text-[28px]
              font-bold
              text-[#111827]
            "
          >
            No favorites yet
          </h2>

          <p
            className="
              mt-3
              text-[16px]
              text-[#6B7280]
            "
          >
            Start adding movies to your favorites list
          </p>

          <button
            onClick={() =>
              navigate("/movies")
            }
            className="
              mt-8
              h-[52px]
              px-8
              rounded-full
              bg-[#7C3AED]
              text-white
              text-[15px]
              font-medium
              hover:bg-[#6D28D9]
              transition
            "
          >
            Browse Movies
          </button>

        </div>

      )}

      {/* GRID */}
      {favorites.length > 0 && (

        <div
          className="
            grid
            grid-cols-5
            gap-x-8
            gap-y-10
          "
        >

          {favorites.map((movie) => (

            <div
              key={movie.id}
              onClick={() =>
                navigate(`/movie/${movie.id}`)
              }
              className="
                group
                cursor-pointer
              "
            >

              {/* POSTER */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[24px]
                "
              >

                <img
                  src={
                    movie.poster?.startsWith("http")
                      ? movie.poster
                      : `https://image.tmdb.org/t/p/w500${movie.poster}`
                  }
                  alt={movie.title}
                  className="
                    h-[380px]
                    w-full
                    object-cover
                    transition-all
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/50
                    via-transparent
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                />

                {/* REMOVE FAVORITE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(movie.id);
                  }}
                  className="
                    absolute
                    top-4
                    right-4
                    flex
                    items-center
                    justify-center
                    h-11
                    w-11
                    rounded-full
                    bg-black/40
                    backdrop-blur-md
                    hover:bg-black/60
                    transition
                  "
                >

                  <Heart
                    size={20}
                    className="
                      fill-red-500
                      text-red-500
                    "
                  />

                </button>

              </div>

              {/* INFO */}
              <div className="mt-4">

                <h3
                  className="
                    text-[22px]
                    leading-8
                    font-semibold
                    text-[#111827]
                    line-clamp-2
                  "
                >
                  {movie.title}
                </h3>

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-[17px]
                      text-[#6B7280]
                    "
                  >
                    {movie.release_date?.split("-")[0]}
                  </span>

                  <div className="flex items-center gap-2">

                    <Star
                      size={18}
                      className="
                        fill-[#FBBF24]
                        text-[#FBBF24]
                      "
                    />

                    <span
                      className="
                        text-[17px]
                        font-semibold
                        text-[#111827]
                      "
                    >
                      {movie.rating?.toFixed(1)}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}