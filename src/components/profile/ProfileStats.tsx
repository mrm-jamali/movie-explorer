import { useNavigate } from "react-router-dom";

export default function ProfileStats() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

      {/* Watchlist */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
            🔖
          </div>

          <div>
            <h4 className="text-3xl font-bold">24</h4>
            <p className="text-gray-500">In Watchlist</p>
          </div>
        </div>
      </div>

      {/* ❤️ Favorites (CLICKABLE) */}
      <div
        onClick={() => navigate("/favorite")}
        className="rounded-3xl border bg-white p-6 shadow-sm cursor-pointer hover:shadow-md transition"
      >
        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-2xl">
            ❤️
          </div>

          <div>
            <h4 className="text-3xl font-bold text-purple-700">
              Favorites
            </h4>

            <p className="mt-1 text-gray-500">
              Click to view your list
            </p>
          </div>

        </div>
      </div>

      {/* Watched */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
            🕒
          </div>
          <div>
            <h4 className="text-3xl font-bold">18</h4>
            <p className="text-gray-500">Watched</p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
            ⭐
          </div>
          <div>
            <h4 className="text-3xl font-bold">4.8</h4>
            <p className="text-gray-500">Avg Rating</p>
          </div>
        </div>
      </div>

    </div>
  );
}