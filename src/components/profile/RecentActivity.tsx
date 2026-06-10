import { useState, useMemo } from "react";
import { Star, Heart, Bookmark, User } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

// import { getPosterUrl } from "../../utils/image";
import { getPosterUrl } from "../../utils/image";

/* =========================
TYPES
========================= */

type ActivityType = "favorite" | "watchlist" | "profile";

type Activity = {
  id: string;
  type: ActivityType;
  movieId?: number;
  title: string;
  poster?: string;
  time: string;
};

/* =========================
ITEM
========================= */

function ActivityItem({
  image,
  title,
  time,
  type,
}: {
  image?: string;
  title: string;
  time: string;
  type: ActivityType;
}) {
  const Icon =
    type === "favorite"
      ? Heart
      : type === "watchlist"
      ? Bookmark
      : User;
// console.log("ACTIVITY:", user?.activities);
  return (
    <div className="flex items-center justify-between py-3 px-6">
      <div className="flex items-center gap-3">

        <div className="relative">
          <img
            src={getPosterUrl(image)}
            alt={title}
            className="h-[68px] w-[52px] rounded-xl object-cover"
          />

          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow">
            <Icon
              size={14}
              className={
                type === "favorite"
                  ? "text-pink-500"
                  : type === "watchlist"
                  ? "text-purple-500"
                  : "text-blue-500"
              }
            />
          </div>
        </div>

        <h4 className="text-[14px] font-medium text-[#111827]">
          {title}
        </h4>
      </div>

      <span className="text-[12px] text-[#9CA3AF] whitespace-nowrap">
        {time}
      </span>
    </div>
  );
}

/* =========================
MAIN
========================= */

export default function RecentActivity() {
  const { user } = useAuth();

  const activities: Activity[] = user?.activities || [];
  const [showAll, setShowAll] = useState(false);

  const sortedActivities = useMemo(() => {
    return [...activities].sort(
      (a, b) =>
        new Date(b.time).getTime() - new Date(a.time).getTime()
    );
  }, [activities]);

  const displayedActivities = useMemo(() => {
    return showAll
      ? sortedActivities
      : sortedActivities.slice(0, 3);
  }, [sortedActivities, showAll]);

  const grouped = useMemo(() => {
    return displayedActivities.reduce((acc, item) => {
      const key =
        new Date(item.time).toDateString() ===
        new Date().toDateString()
          ? "Today"
          : "Older";

      if (!acc[key]) acc[key] = [];
      acc[key].push(item);

      return acc;
    }, {} as Record<string, Activity[]>);
  }, [displayedActivities]);

 return (
 <section className="space-y-5">
  <div className="flex items-center justify-between">
    <h3 className="text-xl font-bold text-gray-900">
      Recent Activity
    </h3>

    {activities.length > 0 && (
      <button
        onClick={() => setShowAll((p) => !p)}
        className="
          text-sm
          font-medium
          text-violet-600
          hover:text-violet-700
          transition-colors
        "
      >
        {showAll ? "Show Less" : "View All"}
      </button>
    )}
  </div>

  {activities.length === 0 ? (
    <div className="py-1 text-center">
      <div className="mb-3 text-4xl">🎬</div>

      <p className="font-medium text-gray-700">
        No activity yet
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Your recent movie actions will appear here.
      </p>
    </div>
  ) : (
    <div className="space-y-6">
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group}>
          <h4
            className="
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
            "
          >
            {group}
          </h4>

          <div className="space-y-3">
            {items.map((act) => (
              <div
                key={act.id}
                className="
                  rounded-2xl
                  bg-white
                  p-3
                  shadow-sm
                  hover:shadow-md
                  transition-all
                "
              >
                <ActivityItem
                  image={act.poster}
                  type={act.type}
                  time={new Date(act.time).toLocaleString()}
                  title={
                    act.type === "watchlist"
                      ? `Added ${act.title} to watchlist`
                      : act.type === "favorite"
                      ? `Added ${act.title} to favorites`
                      : `Updated profile`
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</section>
);
}