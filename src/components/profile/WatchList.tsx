import { useWatchList } from "../../contexts/WatchListContext";
import { Reorder } from "framer-motion";
import { useState, useEffect } from "react";

import QueryState from "../QueryState";
import MovieItem from "./MovieItem";
import { Clapperboard } from "lucide-react";
// import type { MovieItemProps } from "../../types/movie";

export default function WatchList() {
  const { watchList, toggleWatchList } = useWatchList();

  const [items, setItems] = useState(watchList);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<Error | null>(null);

  useEffect(() => {
    setItems(watchList);
  }, [watchList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryState isLoading={isLoading} error={error}>
      {/* HEADER */}
      <div className="mb-8">
      
           <h1 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.5px] text-[#111827] ml-4">
             Watchlist
          </h1>

        <p className="text-[15px] text-[#6B7280] mt-1  ml-4">
          Movies and shows you want to watch later
        </p>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
       <div className="py-16 text-center flex flex-col items-center ">
          {/* آیکون بزرگ وسط */}
          <div className="mb-6">
            <Clapperboard size={80} className="text-purple-500" />
          </div>

          {/* متن */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
             Your watchlist is empty
          </h3>

          <p className="text-sm text-gray-500 max-w-xs">
              Movies you save for later will appear here.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-[1120px]  rounded-3xl border border-gray-100 overflow-hidden bg-white">
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
                enableDrag={true}
                onRemove={() => toggleWatchList(movie)}
              />
            ))}
          </Reorder.Group>
        </div>
      )}
    </QueryState>
  );
}