export default function ProfileCard() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Side */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center">

          {/* Avatar */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/300"
              alt="profile"
              className="h-32 w-32 rounded-full object-cover"
            />

            <button className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg">
              ✎
            </button>
          </div>

          {/* User Info */}
          <div>
            {/* Name + Badge */}
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-3xl font-bold text-gray-900">
                Armin:Dev
              </h2>

              <span className="rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
                Movie Explorer
              </span>
            </div>

            {/* Meta */}
            <div className="mb-4 flex flex-wrap items-center gap-5 text-gray-500">
              <span>📍 Tehran, Iran</span>
              <span>📅 Joined May 2024</span>
            </div>

            {/* Bio */}
            <p className="max-w-2xl leading-8 text-gray-600">
              I love exploring movies and TV shows from different genres.
              Always looking for something amazing to watch!
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-300 px-6 py-3 font-medium text-purple-700 transition hover:bg-purple-50">
          ✎ Edit Profile
        </button>

      </div>
    </div>
  );
}