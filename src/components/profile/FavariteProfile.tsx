
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

      {/* EMPTY STATE */}
      {favorites.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mb-4 text-5xl"><Clapperboard size={26} className="text-purple-500" /></div>
          <h3 className="text-lg font-semibold text-gray-800">
            Your favorites list is empty
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Movies you mark as favorites will appear here.
          </p>
        </div>
      ) : (
        <div className="px-[2px] sm:px-4 md:px-6">
          <span className="px-3 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] text-[13px] font-medium">
            Favorite
          </span>
          <div className="rounded-3xl border border-gray-100 overflow-hidden bg-white mt-6 mx-[2px] sm:mx-0">
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
