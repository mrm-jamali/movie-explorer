import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import ProfileNavbar from "../components/profile/ProfileNavbar";

import WatchList from "../components/profile/WatchList";
import MovieSection from "../components/profile/MovieSection";
import ProfileSection from "../components/profile/ProfileSection";
import OverviewSection from "../components/profile/OverviewSection";
import FavariteProfile from "../components/profile/FavariteProfile";

type Section =
  | "overview"
  | "movie"
  | "watchlist"
  | "favorites"
  | "profile"
  | "theme";

export default function ProfilePage() {
  const [section, setSection] = useState<Section>("overview");

  // 📱 mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardLayout>

      <div className="flex min-h-screen">

        {/* ================= DESKTOP SIDEBAR ================= */}
        <div className="hidden md:block w-[260px]">
          <Sidebar section={section} setSection={setSection} />
        </div>

        {/* ================= MOBILE SIDEBAR (DRAWER) ================= */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">

            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* SIDEBAR PANEL */}
            <div className="relative w-[260px] h-full bg-white shadow-xl">
              <Sidebar
                section={section}
                setSection={(val) => {
                  setSection(val);
                  setSidebarOpen(false); // auto close after select
                }}
              />
            </div>

          </div>
        )}

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex-1 bg-[#F8F9FB]">

          {/* 📱 MOBILE TOP BAR */}
          <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              Menu
            </button>

            <ProfileNavbar
              section={section}
              setSection={setSection}
            />
          </div>

          {/* 💻 DESKTOP NAVBAR */}
          <div className="hidden md:block">
            <ProfileNavbar
              section={section}
              setSection={setSection}
            />
          </div>

          {/* ================= CONTENT ================= */}
          <div className="p-4 md:p-8">

            {section === "overview" && <OverviewSection />}
            {section === "movie" && <MovieSection />}
            {section === "favorites" && <FavariteProfile />}

            {section === "watchlist" && (
              <div className="p-6 md:p-8">
                <WatchList />
              </div>
            )}

            {section === "profile" && <ProfileSection />}

            {section === "theme" && (
              <div className="p-6 md:p-8">
                <div className="rounded-3xl border bg-white p-10 text-gray-500">
                  Theme settings coming soon...
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </DashboardLayout>
  );
}