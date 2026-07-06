import { useFavorites } from "../../contexts/FavoriteContext";
import { useEffect, useState } from "react";
import { Clapperboard } from "lucide-react";

import QueryState from "../../components/QueryState";

import MovieItem from "./MovieItem";

export default function FavariteProfile() {
  const { favorites, removeFavorite } = useFavorites();

  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  console.log("favorites", favorites);

  return (
    <QueryState isLoading={isLoading} error={error}>
      {/* HEADER */}
      <div className="px-4 sm:px-6 md:px-8">
          <h1 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.5px] text-[#111827]">
             FavariteList 
          </h1>
        
        <p  className="text-[15px] text-[#6B7280] mt-1">
          Start adding movies and shows you love!
        </p>
      </div>
      {/* EMPTY STATE */}
      {favorites.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center">
          {/* آیکون بزرگ وسط */}
          <div className="mb-6">
            <Clapperboard size={80} className="text-purple-500" />
          </div>

          {/* متن */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Your favorites list is empty
          </h3>

          <p className="text-sm text-gray-500 max-w-xs">
            Movies you mark as favorites will appear here.
          </p>
        </div>
      ) : (
        <div className="px-[2px] sm:px-4 md:px-6">
          {/* <span className="px-3 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] text-[13px] font-medium">
            Favorite
          </span> */}
          <div className="mt-6 max-w-[1120px] mx-auto rounded-3xl border border-gray-100 overflow-hidden bg-white">
    {favorites.map((movie, index) => (
      <MovieItem
        key={movie.id}
        movie={movie}
        index={index}
        items={favorites}
        enableDrag={false}
        onRemove={() => removeFavorite(movie.id)}
      />
    ))}
  </div>
        </div>
      )}
    </QueryState>
  );
}
