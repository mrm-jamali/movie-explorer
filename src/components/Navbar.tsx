import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

          {/* Logo */}
          <div className="text-2xl font-extrabold text-purple-500 tracking-wide flex items-center gap-2 hover:text-purple-600 transition cursor-pointer">
            🎬
            <span className="hidden sm:inline">
              MovieExplorer
            </span>
          </div>

          {/* Menu */}
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

          {/* Right Side */}
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
  className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-500 rounded-full
             hover:bg-purple-500 hover:text-white transition-all duration-300"
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

      </div>
    </div>
  );
}