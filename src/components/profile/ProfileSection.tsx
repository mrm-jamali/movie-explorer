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
<div className="px-4 sm:px-8 lg:px-12">
      {/* HEADER */}
      <div className="mb-6">
       <h1 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.5px] text-[#111827]">
          My Profile
        </h1>

        <p className="mt-2 text-sm sm:text-[15px] text-[#6B7280]">
          Manage your personal information and preferences
        </p>
      </div>

      {/* PROFILE CARD */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[24px] sm:rounded-[32px]
          border border-slate-200
          bg-white
          p-5 sm:p-6 lg:p-8
          shadow-md
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-2xl
        "
      >
        {/* MAIN CONTENT */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7 text-center sm:text-left">
          
          {/* Avatar */}
          <div className="relative">
            <div className="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-1">
              <img
                src={user?.avatar}
                alt="avatar"
                className="
                  h-24 w-24 sm:h-28 sm:w-28 lg:h-[120px] lg:w-[120px]
                  rounded-full border-4 border-white object-cover
                "
              />
            </div>

            {/* Online Badge */}
            <span
              className="
                absolute bottom-2 right-2 sm:bottom-3 sm:right-3
                h-4 w-4 sm:h-5 sm:w-5
                rounded-full border-2 sm:border-4 border-white bg-green-500
              "
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
              <h2 className="text-xl sm:text-2xl lg:text-[30px] font-bold text-slate-900">
                {user?.username}
              </h2>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                PRO
              </span>
            </div>

            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Welcome back 
            </p>

            <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm text-slate-500 justify-center sm:justify-start">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                <MapPin size={15} />
                {user?.location}
              </div>

              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                <Calendar size={15} />
                Joined{" "}
                {user?.joined ? new Date(user.joined).toLocaleDateString() : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center sm:justify-start">
          <button
            onClick={() => setOpenEditModal(true)}
            className="
              flex items-center gap-2
              rounded-2xl
              bg-gradient-to-r from-purple-600 to-indigo-600
              px-5 sm:px-6 py-3
              text-sm sm:text-base
              font-medium text-white
              shadow-lg
              transition hover:scale-105
            "
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* STATS */}
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