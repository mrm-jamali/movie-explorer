import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";

export default function Navbar() {
  const [focused, setFocused] = useState(false);

  //  استایل مشترک لینک‌ها
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative transition ${
      isActive ? "text-purple-500" : "text-gray-600 hover:text-purple-500"
    }
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">

        <nav className="flex items-center justify-between py-4">

          {/*  Logo */}
          <div className="text-2xl font-extrabold text-purple-500 tracking-wide flex items-center gap-2 hover:text-purple-600 transition cursor-pointer">
  🎬 <span className="hidden sm:inline">MovieExplorer</span>
</div>

          {/*  Search */}
          <div className="hidden md:block relative">
             <Search
    size={18}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  />
            <input
              type="text"
              placeholder="Search movies..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`
                 pl-10 px-4 py-2 rounded-full
                border border-gray-200 bg-gray-50 text-sm
                focus:outline-none focus:ring-2 focus:ring-purple-400
                focus:bg-white
                transition-all duration-300 ease-in-out
                ${focused ? "w-[420px]" : "w-[300px]"}
                shadow-sm focus:shadow-md
              `}
            />
          </div>

          {/*  Menu */}
          <div className="hidden md:flex gap-6 text-sm font-medium">

            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/movies" className={navLinkClass}>
              Movies
            </NavLink>

            <NavLink to="/favorites" className={navLinkClass}>
              Favorites
            </NavLink>

            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>

          </div>

          {/*  Profile */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/60"
              alt="profile"
              className="w-10 h-10 rounded-full border border-gray-200 hover:scale-105 transition cursor-pointer"
            />
          </div>

        </nav>

      </div>
    </div>
  );
}