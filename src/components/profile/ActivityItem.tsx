import { Heart, Bookmark, User, Clapperboard } from "lucide-react";
import { getPosterUrl } from "../../utils/image";

type ActivityType = "favorite" | "watchlist" | "profile";

type ActivityItemProps = {
  image?: string;
  title: string;
  time: string;
  type: ActivityType;
};

export default function ActivityItem({
  image,
  title,
  time,
  type,
}: ActivityItemProps) {
  const Icon =
    type === "favorite"
      ? Heart
      : type === "watchlist"
      ? Bookmark
      : User;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
      <div className="flex items-center gap-3">
        {/* Poster */}
        <div className="relative flex-shrink-0">
          {image ? (
            <img
              src={getPosterUrl(image)}
              alt={title}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
              <Clapperboard size={22} className="text-purple-500" />
            </div>
          )}

          {/* Action Icon */}
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow">
            <Icon
              size={14}
              className="text-purple-500"
            />
          </div>
        </div>

        {/* Title + Time on mobile */}
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-medium text-[#111827]">
            {title}
          </h4>
          {/* فقط در موبایل و تبلت (زیر 700px) */}
          <span className="md:hidden text-[12px] text-[#9CA3AF] mt-1 block">
            {time}
          </span>
        </div>
      </div>

      {/* Time in desktop */}
      <span className="hidden md:inline text-[12px] text-[#9CA3AF] whitespace-nowrap">
        {time}
      </span>
    </div>
  );
}