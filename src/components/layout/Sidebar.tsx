import {
  House,
  Clapperboard,
  Tv,
  Users,
  Compass,
  Bookmark,
  List,
  Heart,
  History,
  User,
} from "lucide-react";

export default function Sidebar() {
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

      {/* Main Menu */}
      <div className="space-y-2">

        <SidebarItem icon={<House size={20} />} title="Home" active />

        <SidebarItem
          icon={<Clapperboard size={20} />}
          title="Movies"
        />

       

        {/* <SidebarItem icon={<Compass size={20} />} title="Discover" /> */}

        <SidebarItem icon={<Bookmark size={20} />} title="Watchlist" />
          <SidebarItem icon={<Heart size={20} />} title="Favorites" />
      </div>

     

      {/* Bottom */}
      <div className="mt-10">

        <SidebarItem
          icon={<User size={20} />}
          title="Profile"
          
        />

      </div>
    </aside>
  );
}

type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
};

function SidebarItem({
  icon,
  title,
  active,
}: SidebarItemProps) {
  return (
    <button
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