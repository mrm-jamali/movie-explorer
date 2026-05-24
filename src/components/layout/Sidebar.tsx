import {
  House,
  Clapperboard,
  Bookmark,
  Heart,
  User,
  Palette,
} from "lucide-react";

type Section =
  | "overview"
  | "movie"
  | "watchlist"
  | "favorites"
  | "profile"
  | "theme";

type SidebarProps = {
  section: Section;
  setSection: (s: Section) => void;
};

export default function Sidebar({
  section,
  setSection,
}: SidebarProps) {
  return (
    <aside
      className="
        w-[270px]
        min-h-screen
        border-r border-gray-200
        bg-white
        px-5 py-7
        flex flex-col
        justify-between
      "
    >

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-12 flex items-center gap-3 px-2">

          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-2xl
              bg-[#7C3AED]
              text-white
              text-lg
            "
          >
            🎬
          </div>

          <h1
            className="
              text-[22px]
              font-bold
              text-[#111827]
            "
          >
            MovieExplore
          </h1>
        </div>

        {/* MENU */}
        <div className="space-y-2">

          <SidebarItem
            icon={<House size={20} />}
            title="Overview"
            active={section === "overview"}
            onClick={() => setSection("overview")}
          />

          <SidebarItem
            icon={<Clapperboard size={20} />}
            title="Movie"
            active={section === "movie"}
            onClick={() => setSection("movie")}
          />

          <SidebarItem
            icon={<Heart size={20} />}
            title="Favorite"
            active={section === "favorites"}
            onClick={() => setSection("favorites")}
          />

          <SidebarItem
            icon={<Bookmark size={20} />}
            title="Watchlist"
            active={section === "watchlist"}
            onClick={() => setSection("watchlist")}
          />

          <SidebarItem
            icon={<User size={20} />}
            title="Profile"
            active={section === "profile"}
            onClick={() => setSection("profile")}
          />

        </div>
      </div>

      {/* BOTTOM */}
      <div>

        <div className="mb-5 border-t border-gray-200" />

        <SidebarItem
          icon={<Palette size={20} />}
          title="Theme"
          active={section === "theme"}
          onClick={() => setSection("theme")}
        />

      </div>
    </aside>
  );
}

/* ========================================
   ITEM
======================================== */

type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
};

function SidebarItem({
  icon,
  title,
  active,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        h-[52px]
        px-4
        rounded-2xl
        flex items-center gap-3
        text-[15px]
        font-medium
        transition-all duration-200

        ${
          active
            ? `
              bg-[#F3E8FF]
              text-[#7C3AED]
            `
            : `
              text-[#6B7280]
              hover:bg-[#F9FAFB]
              hover:text-[#111827]
            `
        }
      `}
    >

      {icon}

      <span>{title}</span>
    </button>
  );
}