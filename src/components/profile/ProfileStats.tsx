export default function ProfileStats() {
  return (
    

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Card 1 */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
              🔖
            </div>

            <div>
              <h4 className="text-3xl font-bold text-gray-900">
                24
              </h4>

              <p className="mt-1 text-gray-500">
                In Watchlist
              </p>
            </div>

          </div>

        </div>

        {/* Card 2 */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-2xl">
              ❤️
            </div>

            <div>
              <h4 className="text-3xl font-bold text-gray-900">
                56
              </h4>

              <p className="mt-1 text-gray-500">
                Favorites
              </p>
            </div>

          </div>

        </div>

        {/* Card 3 */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              🕒
            </div>

            <div>
              <h4 className="text-3xl font-bold text-gray-900">
                18
              </h4>

              <p className="mt-1 text-gray-500">
                Watched
              </p>
            </div>

          </div>

        </div>

        {/* Card 4 */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
              ⭐
            </div>

            <div>
              <h4 className="text-3xl font-bold text-gray-900">
                4.8
              </h4>

              <p className="mt-1 text-gray-500">
                Avg Rating
              </p>
            </div>

          </div>

        </div>

      </div>

  
  );
}