import {
  Search,
  ChevronDown,
  User,
  LogOut,
  Menu,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import NotificationDropdown from "./NotificationDropdown";
import ProfileSearch from "./ProfileSearch";

type Props = {
  section: string;
  setSection: (section: string) => void;
};

export default function ProfileNavbar({ section, setSection }: Props) {
  const titles: Record<string, string> = {
    overview: "Overview",
    watchlist: "Watchlist",
    favorites: "Favorites",
    profile: "Profile",
    movie: "Movie",
    theme: "Theme",
  };

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between px-4 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU BUTTON (بنفش، جمع‌وجور) */}
          <button
            onClick={() => setMobileMenu((p) => !p)}
            className="md:hidden p-2 rounded-xl bg-purple-600 text-white shadow-md"
          >
            <Menu size={18} />
          </button>

          {/* TITLE */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {titles[section]}
            </h2>

            {/* فقط دسکتاپ */}
            <p className="hidden md:block text-xs text-gray-500 mt-1">
              Manage your movies & account
            </p>
          </div>
        </div>

        {/* RIGHT - DESKTOP */}
        <div className="hidden md:flex items-center gap-4">

          <div className="bg-gray-50 rounded-2xl px-3 py-2">
            <ProfileSearch />
          </div>

          <NotificationDropdown />

          <div ref={menuRef} className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 transition"
            >
              <img
                src={user?.avatar}
                className="w-10 h-10 rounded-full ring-2 ring-purple-300"
              />

              <div className="text-left leading-tight">
                <p className="text-[11px] text-purple-500">Welcome</p>
                <p className="text-sm font-semibold text-gray-800">
                  {user?.username}
                </p>
              </div>

              <ChevronDown size={16} />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-2xl shadow-lg p-2 z-50">

                <button
                  onClick={() => {
                    setSection("profile");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-gray-100 text-sm"
                >
                  <User size={16} />
                  Profile
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>

        {/* MOBILE RIGHT ACTIONS */}
        <div className="md:hidden flex items-center gap-2">

          {/* SEARCH BUTTON */}
          <button
            onClick={() => setMobileSearch((p) => !p)}
            className="p-2 rounded-xl bg-gray-50"
          >
            <Search size={18} />
          </button>

          {/* USER BUTTON (بنفش‌تر) */}
          <button
            onClick={() => setOpen((p) => !p)}
            className="p-2 rounded-xl bg-purple-600 text-white"
          >
            <User size={18} />
          </button>
        </div>

      </div>

      {/* ================= MOBILE SEARCH ================= */}
      {mobileSearch && (
        <div className="md:hidden px-4 pb-3">
          <div className="bg-gray-50 rounded-2xl px-3 py-2">
            <ProfileSearch />
          </div>
        </div>
      )}

      {/* ================= MOBILE MENU ================= */}
      {mobileMenu && (
        <div className="md:hidden px-4 pb-4 space-y-2">

          <button
            onClick={() => {
              setSection("profile");
              setMobileMenu(false);
            }}
            className="w-full flex items-center gap-2 p-3 rounded-xl bg-gray-50"
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}

    </header>
  );
}