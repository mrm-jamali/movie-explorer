

export default function RecentActivity() {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

    {/* Item 1 */}
    <div className="flex items-center justify-between border-b border-gray-100 p-5">

      <div className="flex items-center gap-4">

        <img
          src="https://image.tmdb.org/t/p/w200/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
          alt="Dune"
          className="h-20 w-16 rounded-xl object-cover"
        />

        <div>
          <p className="text-gray-700">
            Added <span className="font-semibold">Dune: Part Two</span> to watchlist
          </p>
        </div>

      </div>

      <span className="text-sm text-gray-400">
        2 hours ago
      </span>

    </div>

    {/* Item 2 */}
    <div className="flex items-center justify-between border-b border-gray-100 p-5">

      <div className="flex items-center gap-4">

        <img
          src="https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
          alt="Interstellar"
          className="h-20 w-16 rounded-xl object-cover"
        />

        <div>
          <p className="text-gray-700">
            Watched <span className="font-semibold">Interstellar</span>
            <span className="ml-3 text-yellow-500">
              ⭐ 5.0
            </span>
          </p>
        </div>

      </div>

      <span className="text-sm text-gray-400">
        1 day ago
      </span>

    </div>

    {/* Item 3 */}
    <div className="flex items-center justify-between border-b border-gray-100 p-5">

      <div className="flex items-center gap-4">

        <img
          src="https://image.tmdb.org/t/p/w200/49WJfeN0moxb9IPfGn8AIqMGskD.jpg"
          alt="Stranger Things"
          className="h-20 w-16 rounded-xl object-cover"
        />

        <div>
          <p className="text-gray-700">
            Added <span className="font-semibold">Stranger Things</span> to favorites
            <span className="ml-3 text-pink-500">
              ❤️
            </span>
          </p>
        </div>

      </div>

      <span className="text-sm text-gray-400">
        2 days ago
      </span>

    </div>

    {/* Item 4 */}
    <div className="flex items-center justify-between p-5">

      <div className="flex items-center gap-4">

        <img
          src="https://image.tmdb.org/t/p/w200/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
          alt="Inception"
          className="h-20 w-16 rounded-xl object-cover"
        />

        <div>
          <p className="text-gray-700">
            Watched <span className="font-semibold">Inception</span>

            <span className="ml-3 text-yellow-500">
              ⭐ 4.5
            </span>
          </p>
        </div>

      </div>

      <span className="text-sm text-gray-400">
        3 days ago
      </span>

    </div>

  </div>
  )
}

