import { useWatchList } from "../../contexts/WatchListContext";
import { Reorder } from "framer-motion";
import { useState, useEffect } from "react";

import QueryState from "../QueryState";
import MovieItem from "./MovieItem";

export default function WatchList() {
  const { watchList, toggleWatchList } = useWatchList();

  const [items, setItems] = useState(watchList);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
      <div>
        Watchlist

        <p className="text-[15px] text-[#6B7280] mt-1">
          Movies and shows you want to watch later
        </p>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mb-4 text-5xl">🎬</div>

          <h3 className="text-lg font-semibold text-gray-800">
            Your watchlist is empty
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Movies you save for later will appear here.
          </p>
        </div>
      ) : (
        <div className="rounded-3xl border border-gray-100 overflow-hidden bg-white">
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