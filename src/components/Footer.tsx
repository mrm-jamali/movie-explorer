import {
  FaInstagram,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  const socials = [
    { name: "Instagram", icon: FaInstagram },
    { name: "Telegram", icon: FaTelegram },
    { name: "Twitter", icon: FaXTwitter },
  ];

  return (
    <footer className="bg-[#0b0b0f] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              🎬 MovieExplorer
            </h2>

            <p className="text-sm text-gray-400 mt-5 leading-relaxed">
              Explore trending movies, discover new genres, and build your personal watchlist with a smooth cinematic experience.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-14">

            <div>
              <h3 className="text-white font-semibold mb-5 relative inline-block">
                Explore
                <span className="absolute left-0 -bottom-2 w-8 h-[2px] bg-purple-500 rounded-full"></span>
              </h3>

              <ul className="space-y-3 text-sm text-gray-400">
                {["Home", "Movies", "Genres", "Trending"].map((item) => (
                  <li
                    key={item}
                    className="hover:text-white hover:translate-x-1 transition cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 relative inline-block">
                Account
                <span className="absolute left-0 -bottom-2 w-8 h-[2px] bg-purple-500 rounded-full"></span>
              </h3>

              <ul className="space-y-3 text-sm text-gray-400">
                {["Profile", "Favorites", "Settings"].map((item) => (
                  <li
                    key={item}
                    className="hover:text-white hover:translate-x-1 transition cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-5 relative inline-block">
              Stay Connected
              <span className="absolute left-0 -bottom-2 w-8 h-[2px] bg-purple-500 rounded-full"></span>
            </h3>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Follow for updates and new features.
            </p>

            <div className="flex flex-wrap gap-3">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <span
                    key={item.name}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full
                    bg-white/5 border border-white/10
                    text-xs text-gray-300
                    hover:bg-purple-500/25 hover:text-white
                    hover:scale-105 hover:border-purple-400
                    transition cursor-pointer"
                  >
                    <Icon size={14} />
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-3">

          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} MovieExplorer. Crafted with React + Tailwind.
          </p>

          <p className="text-purple-400/80 hover:text-purple-300 transition">
            Built for portfolio purposes 🚀
          </p>

        </div>

      </div>
    </footer>
  );
}