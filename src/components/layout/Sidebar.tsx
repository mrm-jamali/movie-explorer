import {
  House,
  Clapperboard,
  Bookmark,
  Heart,
  User,
} from "lucide-react";

type Section =
  | "overview"
  | "watchlist"
  | "favorites"
  | "preferences";

type SidebarProps = {
  section: Section;
  setSection: (s: Section) => void;
};

export default function Sidebar({
  section,
  setSection,
}: SidebarProps) {
  return (
    <aside className="w-[260px] min-h-screen border-r border-gray-200 bg-white px-6 py-8">

      {/* Logo */}
      <div className="mb-12 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
          🎬
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Movie Explore
        </h1>
      </div>

      {/* Menu */}
      <div className="space-y-2">

        <SidebarItem
          icon={<House size={20} />}
          title="Overview"
          active={section === "overview"}
          onClick={() => setSection("overview")}
        />

        <SidebarItem
          icon={<Bookmark size={20} />}
          title="Watchlist"
          active={section === "watchlist"}
          onClick={() => setSection("watchlist")}
        />

        <SidebarItem
          icon={<Heart size={20} />}
          title="Favorites"
          active={section === "favorites"}
          onClick={() => setSection("favorites")}
        />
      </div>

      {/* Bottom */}
      <div className="mt-10">
        <SidebarItem
          icon={<User size={20} />}
          title="Profile Settings"
          active={section === "preferences"}
          onClick={() => setSection("preferences")}
        />
      </div>

    </aside>
  );
}

/* ===== ITEM ===== */

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
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all
      ${
        active
          ? "bg-purple-100 text-purple-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}