import { Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useFavorites } from "../../contexts/FavoriteContext";

export default function FavariteProfile() {
  const navigate = useNavigate();

  const { favorites, removeFavorite } = useFavorites();

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
     <div className="mb-6">
  <h2  className="text-[24px] font-bold text-[#111827]">
    Favorites
  </h2>

  <p className="text-[15px] text-[#6B7280] mt-1">
    Your favorite movies and TV shows
  </p>
</div>

  
      {/* EMPTY */}
     {favorites.length > 0 && (

  <div className="rounded-3xl border border-gray-100 overflow-hidden bg-white">
    {favorites.map((movie, index) => (
      <div
        key={movie.id}
        className={`
          flex items-center justify-between
          px-6 py-5 bg-white
          transition-all duration-200
          hover:bg-gray-50
          hover:shadow-sm
          ${
            index !== favorites.length - 1
              ? "border-b border-gray-100"
              : ""
          }
        `}
      >
        {/* LEFT */}
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <img
            src={
              movie.poster?.startsWith("http")
                ? movie.poster
                : `https://image.tmdb.org/t/p/w200${movie.poster}`
            }
            alt={movie.title}
            className="w-20 h-20 rounded-xl object-cover"
          />


    <div>
  <h3 className="text-[17px] font-semibold text-[#111827]">
    {movie.title}
  </h3>

  <div className="flex items-center gap-3 mt-2">
    <span className="text-[15px] text-[#6B7280]">
      {movie.release_date?.slice(0, 4)}
    </span>

    <span className="px-3 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] text-[13px] font-medium">
      Favorite
    </span>
  </div>
</div>
    </div>

    {/* RIGHT */}
    <button
      onClick={() => removeFavorite(movie.id)}
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
))}


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
         
        </div>
      )}
    </div>
  );
}
