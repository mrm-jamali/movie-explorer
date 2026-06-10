import { useState } from "react";
import { MapPin, Calendar, Pencil } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";
import EditProfileModal from "./EditProfileModal";
import RecentActivity from "./RecentActivity";
import ProfileStats from "./ProfileStats";

export default function ProfileSection() {
  const { user } = useAuth();
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <div className="flex-1 bg-[#F8F9FB] p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#111827]">
          My Profile
        </h1>

        <p className="mt-2 text-[15px] text-[#6B7280]">
          Manage your personal information and preferences
        </p>
      </div>

      {/* PROFILE CARD */}
     <div
  className="
    group
    relative
    overflow-hidden
    rounded-[32px]
    border
    border-slate-200
    bg-white
    p-8
    shadow-md
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
  "
>
  {/* Decorative Gradient */}
  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500" />

  <div className="flex items-start justify-between">

    <div className="flex items-center gap-7">

      {/* Avatar */}
      <div className="relative">

        <div
          className="
            rounded-full
            bg-gradient-to-r
            from-purple-500
            via-pink-500
            to-indigo-500
            p-1
          "
        >
          <img
            src={user?.avatar}
            alt="avatar"
            className="
              h-[120px]
              w-[120px]
              rounded-full
              border-4
              border-white
              object-cover
            "
          />
        </div>

        {/* Online Badge */}
        <span
          className="
            absolute
            bottom-3
            right-3
            h-5
            w-5
            rounded-full
            border-4
            border-white
            bg-green-500
          "
        />
      </div>

      {/* User Info */}
      <div>

        <div className="flex items-center gap-3">

          <h2 className="text-[30px] font-bold text-slate-900">
            {user?.username}
          </h2>

          <span
            className="
              rounded-full
              bg-purple-100
              px-3
              py-1
              text-xs
              font-semibold
              text-purple-700
            "
          >
            PRO
          </span>

        </div>

        <p className="mt-1 text-sm text-slate-400">
          Welcome back 👋
        </p>

        <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-500">

          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
            <MapPin size={15} />
            {user?.location}
          </div>

          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
            <Calendar size={15} />
            Joined{" "}
            {user?.joined
              ? new Date(user.joined).toLocaleDateString()
              : ""}
          </div>

        </div>

      </div>
    </div>

    {/* Button */}
    <button
      onClick={() => setOpenEditModal(true)}
      className="
        flex
        items-center
        gap-2
        rounded-2xl
        bg-gradient-to-r
        from-purple-600
        to-indigo-600
        px-6
        py-3
        font-medium
        text-white
        shadow-lg
        transition
        hover:scale-105
      "
    >
      <Pencil size={16} />
      Edit Profile
    </button>

  </div>
</div>

      {/* STATS (اینجا منتقل شد 👇) */}
      <ProfileStats />

      {/* ACTIVITY */}
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