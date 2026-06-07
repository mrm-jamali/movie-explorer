import {
  MapPin,
  Calendar,
  Pencil,
  Heart,
  Bookmark,
  Star, // 👈 اینو اضافه کن
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import RecentActivity from "./RecentActivity";

export default function ProfileSection() {
  const { user } = useAuth();

  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <div className="p-6 md:p-8">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-[34px] font-bold tracking-[-0.5px] text-[#111827]">
          My Profile
        </h1>

        <p className="mt-2 text-[15px] text-[#6B7280]">
          Manage your personal information and preferences
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">
        <div className="flex items-start justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <img
              src={user?.avatar}
              alt="avatar"
              className="h-[120px] w-[120px] rounded-full object-cover"
            />

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-[28px] font-semibold tracking-[-0.5px] text-[#111827]">
                  {user?.username}
                </h2>

                <span className="rounded-full bg-[#F3E8FF] px-4 py-1.5 text-[13px] font-medium text-[#7C3AED]">
                  Premium
                </span>
              </div>

              <div className="mt-4 flex items-center gap-6 text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="text-[14px]">{user?.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="text-[14px]">
                    Joined{" "}
                    {user?.joined
                      ? new Date(user.joined).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>

              <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-[#4B5563]">
                Movie explorer, dreamer and front-end developer. Always looking
                for something amazing to watch.
              </p>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => setOpenEditModal(true)}
            className="h-[48px] px-5 rounded-2xl border border-[#D8B4FE] bg-white text-[#7C3AED] text-[14px] font-medium flex items-center gap-2 hover:bg-[#FAF5FF] transition"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* STATS */}
      <section className="mt-8">
        <h3 className="mb-5 text-[22px] font-semibold text-[#111827]">
          Watchlist Summary
        </h3>

        <div className="grid grid-cols-3 gap-5">
          {/* WATCHLIST */}
          <StatCard
            icon={<Bookmark size={20} className="text-[#7C3AED]" />}
            value={user?.watchlist?.length || 0}
            label="In Watchlist"
            bg="bg-[#F3E8FF]"
          />

          {/* FAVORITES */}
          <StatCard
            icon={<Heart size={20} className="text-[#EC4899]" />}
            value={user?.favorites?.length || 0}
            label="Favorites"
            bg="bg-[#FCE7F3]"
          />

          {/* REMOVE WATCHED & AVG RATING */}
        </div>
      </section>

      {/* RECENT ACTIVITY (فعلاً ثابت) */}
      <section className="mt-10">
        <RecentActivity />
      </section>

      {/* MODAL */}
      <EditProfileModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  );
}

/* ========================= */

function StatCard({ icon, value, label, bg }: any) {
  return (
    <div className="rounded-[24px] border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg}`}
        >
          {icon}
        </div>

        <div>
          <h4 className="text-[28px] font-semibold">{value}</h4>
          

          <p className="text-[13px] text-[#6B7280]">{label}</p>
        </div>
      </div>
    </div>
  );
}

/* ========================= */

function ActivityItem({ image, title, time, rating }: any) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={title}
          className="h-[68px] w-[68px] rounded-2xl object-cover"
        />

        <div className="flex items-center gap-3">
          <h4 className="font-medium">{title}</h4>

          {rating && (
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-[#FBBF24] text-[#FBBF24]" />
              {rating}
            </div>
          )}
        </div>
      </div>

      <span className="text-[13px] text-[#6B7280]">{time}</span>
    </div>
  );
}
