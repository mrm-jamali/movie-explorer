import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative transition py-1
     ${isActive ? "text-purple-500" : "text-gray-600 hover:text-purple-500"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav className="border-b border-gray-100">
      
      {/* CONTAINER (حفظ فاصله‌های دسکتاپ) */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">

        {/* TOP BAR (ارتفاع کم ولی وسط‌چین کامل) */}
        <div className="flex items-center justify-between h-14">
          
          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="p-2 rounded-lg border border-gray-200 md:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <div className="text-xl font-extrabold text-purple-500 flex items-center gap-2">
              🎬
              <span className="hidden sm:inline">MovieExplorer</span>
            </div>

          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/movies" className={navLinkClass}>Movies</NavLink>
            <NavLink to="/favorite" className={navLinkClass}>Favorites</NavLink>
            {user && (
              <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/profile">
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-9 h-9 rounded-full border border-gray-200"
                  />
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-purple-600 border border-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-3 py-1.5 text-sm font-medium text-purple-600 border border-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-3 py-1.5 text-sm font-medium bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>

        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-60 py-3" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3 text-sm font-medium">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/movies" onClick={() => setIsMenuOpen(false)}>Movies</NavLink>
            <NavLink to="/favorite" onClick={() => setIsMenuOpen(false)}>Favorites</NavLink>
            {user && (
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}