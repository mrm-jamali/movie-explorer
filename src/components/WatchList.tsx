import { useWatchList } from "../contexts/WatchListContext";
import { Trash2, Star } from "lucide-react";

export default function WatchList() {
  const { watchList, toggleWatchList } = useWatchList();

  return (
    <div className="bg-white shadow rounded-2xl p-4 md:p-6">

      <h1 className="text-2xl font-bold">Watchlist</h1>

      {watchList.length === 0 && (
        <p className="text-gray-500 text-center py-10">
          Your watchlist is empty.
        </p>
      )}

      <div className="flex flex-col gap-5 mt-4">
        {watchList.map((movie) => (
          <div
            key={movie.id}
            className="flex items-center justify-between border-b pb-4"
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                className="w-14 h-20 rounded-lg object-cover"
                alt={movie.title}
              />

              <div>
                <h3 className="font-semibold">
                  {movie.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {movie.release_date?.slice(0, 4)}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                <Star size={18} />
                {movie.rating?.toFixed(1)}
              </div>

              <button
                onClick={() => toggleWatchList(movie)}
                className="flex items-center gap-2 px-3 py-2 border rounded-lg text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Remove
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}