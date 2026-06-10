import { useAuth } from "../../contexts/AuthContext";
import { Bookmark, Heart } from "lucide-react";

type StatCardProps = {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  bg: string;
};

function StatCard({
  icon,
  value,
  label,
  bg,
}: StatCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        border
        border-gray-100
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${bg}
          `}
        >
          {icon}
        </div>

        <div>
          <h4 className="text-3xl font-bold text-gray-900">
            {value}
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProfileStats() {
  const { user } = useAuth();

  const watchlistCount = user?.watchlist?.length || 0;
  const favoritesCount = user?.favorites?.length || 0;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Your Statistics
        </h2>

        <p className="mt-1 text-gray-500">
          Quick overview of your movie activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StatCard
          icon={
            <Bookmark
              size={26}
              className="text-purple-600"
            />
          }
          value={watchlistCount}
          label="Movies in Watchlist"
          bg="bg-purple-100"
        />

        <StatCard
          icon={
            <Heart
              size={26}
              className="text-pink-600"
            />
          }
          value={favoritesCount}
          label="Favorite Movies"
          bg="bg-pink-100"
        />
      </div>
    </div>
  );
}