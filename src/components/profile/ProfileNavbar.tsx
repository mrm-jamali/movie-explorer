import { Search, ChevronDown, User, LogOut } from "lucide-react";

import { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import NotificationDropdown from "./NotificationDropdown";

import ProfileSearch from "./ProfileSearch";
type Props = {
  section: string;
};

export default function ProfileNavbar({ section }: Props) {
  const titles: Record<string, string> = {
    overview: "Overview",
    watchlist: "Watchlist",
    favorites: "Favorites",
    preferences: "Preferences",
  };

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* CLOSE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="
        h-[84px]
        bg-white
        border-b border-gray-200
        px-8
        flex items-center justify-between
      "
    >
      {/* LEFT */}
      <div>
        <h1
          className="
            text-[28px]
            font-bold
            text-[#111827]
          "
        >
          {titles[section]}
        </h1>

        <p
          className="
            text-sm
            text-gray-500
            mt-1
          "
        >
          Manage your account and movies
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* SEARCH */}
       <ProfileSearch />

        {/* NOTIFICATION */}
        <NotificationDropdown />

        {/* USER MENU */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-3
              hover:bg-gray-100
              px-3 py-2
              rounded-2xl
              transition
            "
          >
            <img
              src={user?.avatar}
              alt={user?.username}
              className="
                w-11 h-11
                rounded-full
                object-cover
                ring-2 ring-purple-200
              "
            />

            <div className="flex items-center gap-2">
              <div className="text-left">
                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  Welcome
                </p>

                <h4
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                  "
                >
                  {user?.username}
                </h4>
              </div>

              <ChevronDown
                size={18}
                className="
                  text-gray-500
                "
              />
            </div>
          </button>

          {/* DROPDOWN */}
          {open && (
            <div
              className="
                absolute
                right-0
                top-16
                w-56
                bg-white
                border border-gray-200
                rounded-2xl
                shadow-xl
                p-2
                z-50
              "
            >
              {/* PROFILE */}
              <Link
                to="/profile"
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  hover:bg-gray-100
                  transition
                  text-sm
                "
              >
                <User size={18} />
                My Profile
              </Link>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  logout();

                  setTimeout(() => {
                    navigate("/");
                  }, 0);
                }}
                className="
                  w-full
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  hover:bg-red-50
                  text-red-500
                  transition
                  text-sm
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
