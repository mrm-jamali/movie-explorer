import {
  MapPin,
  Calendar,
  Pencil,
  Star,
  Heart,
  Eye,
  Bookmark,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";


export default function ProfileSection() {
  const { user } = useAuth();
  return (
    <div className="p-6 md:p-8">

      {/* PAGE HEADER */}
      <div className="mb-8">

        <h1
          className="
            text-[34px]
            leading-tight
            font-bold
            tracking-[-0.5px]
            text-[#111827]
          "
        >
          My Profile
        </h1>

        <p
          className="
            mt-2
            text-[15px]
            text-[#6B7280]
          "
        >
          Manage your personal information and preferences
        </p>

      </div>

      {/* PROFILE CARD */}
      <div
        className="
          rounded-[28px]
          border border-gray-200
          bg-white
          p-7
          shadow-sm
        "
      >

        <div className="flex items-start justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-6">

            {/* AVATAR */}
            <img
              src={user?.avatar}
              alt="avatar"
              className="
                h-[120px]
                w-[120px]
                rounded-full
                object-cover
              "
            />

            {/* INFO */}
            <div>

              {/* NAME */}
              <div className="flex items-center gap-3">

                <h2
                  className="
                    text-[28px]
                    font-semibold
                    tracking-[-0.5px]
                    text-[#111827]
                  "
                >
                 {user?.username}
                </h2>

                <span
                  className="
                    rounded-full
                    bg-[#F3E8FF]
                    px-4 py-1.5
                    text-[13px]
                    font-medium
                    text-[#7C3AED]
                  "
                >
                  Premium
                </span>

              </div>

              {/* META */}
              <div
                className="
                  mt-4
                  flex items-center gap-6
                  text-[#6B7280]
                "
              >

                <div className="flex items-center gap-2">

                  <MapPin size={16} />

                  <span className="text-[14px]">
                   {user?.location}
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <Calendar size={16} />

                  <span className="text-[14px]">
                  Joined {user?.joined}
                  </span>

                </div>

              </div>

              {/* BIO */}
              <p
                className="
                  mt-5
                  max-w-[620px]
                  text-[15px]
                  leading-7
                  text-[#4B5563]
                "
              >
                Movie explorer, dreamer and front-end developer.
                Always looking for something amazing to watch.
              </p>

            </div>

          </div>

          {/* EDIT BUTTON */}
          <button
            className="
              h-[48px]
              px-5
              rounded-2xl
              border border-[#D8B4FE]
              bg-white
              text-[#7C3AED]
              text-[14px]
              font-medium
              flex items-center gap-2
              hover:bg-[#FAF5FF]
              transition
            "
          >

            <Pencil size={16} />

            Edit Profile

          </button>

        </div>

      </div>

      {/* STATS */}
      <section className="mt-8">

        <h3
          className="
            mb-5
            text-[22px]
            font-semibold
            text-[#111827]
          "
        >
          Watchlist Summary
        </h3>

        <div className="grid grid-cols-4 gap-5">

          <StatCard
            icon={
              <Bookmark
                size={20}
                className="text-[#7C3AED]"
              />
            }
            value="24"
            label="In Watchlist"
            bg="bg-[#F3E8FF]"
          />

          <StatCard
            icon={
              <Heart
                size={20}
                className="text-[#EC4899]"
              />
            }
            value="56"
            label="Favorites"
            bg="bg-[#FCE7F3]"
          />

          <StatCard
            icon={
              <Eye
                size={20}
                className="text-[#0EA5E9]"
              />
            }
            value="18"
            label="Watched"
            bg="bg-[#E0F2FE]"
          />

          <StatCard
            icon={
              <Star
                size={20}
                className="text-[#22C55E]"
              />
            }
            value="4.8"
            label="Avg Rating"
            bg="bg-[#DCFCE7]"
          />

        </div>

      </section>

      {/* RECENT ACTIVITY */}
      <section className="mt-10">

        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between">

          <h3
            className="
              text-[22px]
              font-semibold
              text-[#111827]
            "
          >
            Recent Activity
          </h3>

          <button
            className="
              text-[14px]
              font-medium
              text-[#7C3AED]
              hover:opacity-70
              transition
            "
          >
            View All Activity
          </button>

        </div>

        {/* LIST */}
        <div
          className="
            overflow-hidden
            rounded-[28px]
            border border-gray-200
            bg-white
          "
        >

          <ActivityItem
            image="https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
            title="Added Dune: Part Two to watchlist"
            time="2 hours ago"
          />

          <ActivityItem
            image="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
            title="Watched Interstellar"
            rating="9.0"
            time="1 day ago"
          />

          <ActivityItem
            image="https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg"
            title="Added Stranger Things to favorites"
            favorite
            time="2 days ago"
          />

          <ActivityItem
            image="https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
            title="Watched Inception"
            rating="8.8"
            time="3 days ago"
          />

        </div>

      </section>

    </div>
  );
}

/* =========================================
   STAT CARD
========================================= */

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
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
        rounded-[24px]
        border border-gray-200
        bg-white
        p-5
        shadow-sm
      "
    >

      <div className="flex items-center gap-4">

        <div
          className={`
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            ${bg}
          `}
        >
          {icon}
        </div>

        <div>

          <h4
            className="
              text-[28px]
              leading-none
              font-semibold
              text-[#111827]
            "
          >
            {value}
          </h4>

          <p
            className="
              mt-1.5
              text-[13px]
              text-[#6B7280]
            "
          >
            {label}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================
   ACTIVITY ITEM
========================================= */

type ActivityItemProps = {
  image: string;
  title: string;
  time: string;
  rating?: string;
  favorite?: boolean;
};

function ActivityItem({
  image,
  title,
  time,
  rating,
  favorite,
}: ActivityItemProps) {
  return (
    <div
      className="
        flex items-center justify-between
        border-b border-gray-100
        px-6 py-4
        last:border-b-0
        hover:bg-gray-50
        transition
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <img
          src={image}
          alt={title}
          className="
            h-[68px]
            w-[68px]
            rounded-2xl
            object-cover
          "
        />

        <div className="flex items-center gap-3">

          <h4
            className="
              text-[16px]
              font-medium
              text-[#111827]
            "
          >
            {title}
          </h4>

          {/* RATING */}
          {rating && (
            <div className="flex items-center gap-1.5">

              <Star
                size={16}
                className="
                  fill-[#FBBF24]
                  text-[#FBBF24]
                "
              />

              <span
                className="
                  text-[15px]
                  font-semibold
                  text-[#111827]
                "
              >
                {rating}
              </span>

            </div>
          )}

          {/* FAVORITE */}
          {favorite && (
            <div
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-full
                bg-[#FCE7F3]
              "
            >

              <Heart
                size={14}
                className="
                  fill-[#EC4899]
                  text-[#EC4899]
                "
              />

            </div>
          )}

        </div>

      </div>

      {/* TIME */}
      <span
        className="
          text-[13px]
          text-[#6B7280]
        "
      >
        {time}
      </span>

    </div>
  );
}