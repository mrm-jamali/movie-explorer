import { useState, useMemo } from "react";
import { Star, Heart, Bookmark } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

/* =========================
   TYPES
========================= */

type Activity = {
  id: string;
  type: "favorite" | "watchlist";
  movieId: number;
  title: string;
  poster: string;
  time: string;
};

/* =========================
   ACTIVITY ITEM
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
  type: "favorite" | "watchlist";
}) {
  const Icon = type === "favorite" ? Heart : Bookmark;

  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={
              image ||
              "https://via.placeholder.com/80x120?text=No+Image"
            }
            alt={title}
            className="h-[68px] w-[52px] rounded-xl object-cover"
          />

          {/* TYPE ICON */}
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow">
            <Icon
              size={14}
              className={
                type === "favorite"
                  ? "text-pink-500"
                  : "text-purple-500"
              }
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col">
          <h4 className="font-medium text-[#111827] text-[14px]">
            {title}
          </h4>
        </div>
      </div>

      {/* TIME */}
      <span className="text-[12px] text-[#9CA3AF] whitespace-nowrap">
        {time}
      </span>

    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function RecentActivity() {
  const { user } = useAuth();

  const activities: Activity[] = user?.activities || [];
  const [showAll, setShowAll] = useState(false);

  /* =========================
     SORT + GROUP LOGIC
  ========================= */

  const sortedActivities = useMemo(() => {
    return [...activities].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
  }, [activities]);

  const visibleActivities = showAll
    ? sortedActivities
    : sortedActivities.slice(0, 5);

  /* =========================
     GROUP BY DATE
  ========================= */

  const grouped = visibleActivities.reduce((acc, item) => {
    const date = new Date(item.time);
    const today = new Date();

    const isToday =
      date.toDateString() === today.toDateString();

    const key = isToday ? "Today" : "Older";

    if (!acc[key]) acc[key] = [];
    acc[key].push(item);

    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <section className="mt-10">

      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[22px] font-semibold text-[#111827]">
          Recent Activity
        </h3>

        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="text-[14px] font-medium text-[#7C3AED]"
        >
          {showAll ? "Show Less" : "View All Activity"}
        </button>
      </div>

      {/* CARD */}
      <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white">

        {activities.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            No activity yet
          </p>
        ) : (
          Object.entries(grouped).map(([group, items]) => (
            <div key={group}>

              {/* GROUP TITLE */}
              <div className="px-6 py-3 text-xs font-semibold text-gray-400 bg-gray-50">
                {group}
              </div>

              {/* ITEMS */}
              {items.map((act) => (
                <ActivityItem
                  key={act.id}
                  image={act.poster}
                  title={
                    act.type === "watchlist"
                      ? `Added ${act.title} to watchlist`
                      : `Added ${act.title} to favorites`
                  }
                  type={act.type}
                  time={new Date(act.time).toLocaleString()}
                />
              ))}
            </div>
          ))
        )}

      </div>
    </section>
  );
}