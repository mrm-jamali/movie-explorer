export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-gray-950 to-black text-gray-300">

      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              🎬 MovieExplorer
            </h2>

            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              Explore trending movies, discover new genres, and build your personal watchlist with a smooth cinematic experience.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">

            <div>
              <h3 className="text-white font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-purple-400 transition cursor-pointer">Home</li>
                <li className="hover:text-purple-400 transition cursor-pointer">Movies</li>
                <li className="hover:text-purple-400 transition cursor-pointer">Genres</li>
                <li className="hover:text-purple-400 transition cursor-pointer">Trending</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-purple-400 transition cursor-pointer">Profile</li>
                <li className="hover:text-purple-400 transition cursor-pointer">Favorites</li>
                <li className="hover:text-purple-400 transition cursor-pointer">Settings</li>
              </ul>
            </div>

          </div>

          {/* CTA  Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>

            <p className="text-sm text-gray-400 mb-4">
              Follow for updates and new features.
            </p>

            <div className="flex gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 hover:bg-purple-500/30 transition cursor-pointer text-xs">
                GitHub
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 hover:bg-purple-500/30 transition cursor-pointer text-xs">
                Twitter
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 hover:bg-purple-500/30 transition cursor-pointer text-xs">
                Instagram
              </span>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">

          <p>
            © {new Date().getFullYear()} MovieExplorer. Crafted with React + Tailwind.
          </p>

          <p className="mt-3 md:mt-0 text-purple-400">
            Built for portfolio purposes 🚀
          </p>

        </div>

      </div>

    </footer>
  );
}