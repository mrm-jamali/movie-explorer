import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative transition ${
      isActive
        ? "text-purple-500"
        : "text-gray-600 hover:text-purple-500"
    }
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <nav className="flex items-center justify-between py-4">
          
          {/* LEFT SIDE - Hamburger + Logo */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu - فقط در موبایل */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900 transition"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Logo */}
            <div className="text-2xl font-extrabold text-purple-500 tracking-wide flex items-center gap-2 hover:text-purple-600 transition cursor-pointer">
              🎬
              <span className="hidden sm:inline">MovieExplorer</span>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/movies" className={navLinkClass}>
              Movies
            </NavLink>
            <NavLink to="/favorite" className={navLinkClass}>
              Favorites
            </NavLink>
            {user && (
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <Link to="/profile">
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-10 h-10 rounded-full border border-gray-200 hover:scale-105 transition cursor-pointer"
                  />
                </Link>

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col gap-4 text-base font-medium">
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 hover:bg-gray-100 rounded-lg transition"
              >
                Home
              </NavLink>
              <NavLink
                to="/movies"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 hover:bg-gray-100 rounded-lg transition"
              >
                Movies
              </NavLink>
              <NavLink
                to="/favorite"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 hover:bg-gray-100 rounded-lg transition"
              >
                Favorites
              </NavLink>
              {user && (
                <NavLink
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 hover:bg-gray-100 rounded-lg transition"
                >
                  Profile
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}