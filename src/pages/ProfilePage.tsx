import { useState } from "react";
import { useLocation } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import Sidebar from "../components/layout/Sidebar";
import ProfileNavbar from "../components/profile/ProfileNavbar";

import WatchList from "../components/WatchList";
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

console.log("PROFILE PAGE RENDERED");

  return (
    <DashboardLayout>
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <Sidebar
          section={section}
          setSection={setSection}
        />

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-[#F8F9FB]">

          {/* NAVBAR */}
         <ProfileNavbar
  section={section}
  setSection={setSection}
/>

          {/* CONTENT */}
          <div>

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
                <div className="rounded-3xl border border-gray-200 bg-white p-10 text-gray-500">
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