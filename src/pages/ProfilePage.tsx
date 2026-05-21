import { useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import Sidebar from "../components/layout/Sidebar";

import ProfileCard from "../components/profile/ProfileCard";
import ProfileStats from "../components/profile/ProfileStats";
import RecentActivity from "../components/profile/RecentActivity";
import Preferences from "../components/profile/Preferences";
import WatchList from "../components/WatchList";

type Section =
  | "overview"
  | "watchlist"
  | "favorites"
  | "preferences";

export default function ProfilePage() {
  const [section, setSection] = useState<Section>("overview");

  return (
    <MainLayout>
      <div className="flex">

        {/* LEFT SIDEBAR */}
        <Sidebar
          section={section}
          setSection={setSection}
        />

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-6 md:p-8">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your profile information and preferences
            </p>
          </div>

          {/* OVERVIEW */}
          {section === "overview" && (
            <>
              <ProfileCard />

              <section className="mb-8 mt-8">
                <h3 className="mb-6 text-2xl font-bold">
                  Watchlist Summary
                </h3>
                <ProfileStats />
              </section>

              <section className="mb-8">
                <h3 className="mb-6 text-2xl font-bold">
                  Recent Activity
                </h3>
                <RecentActivity />
              </section>
            </>
          )}

          {/* WATCHLIST */}
          {section === "watchlist" && (
            <WatchList />
          )}

          {/* FAVORITES (placeholder) */}
          {section === "favorites" && (
            <div className="text-gray-500">
              Favorites section coming soon...
            </div>
          )}

          {/* PREFERENCES */}
          {section === "preferences" && (
            <Preferences />
          )}

        </div>
      </div>
    </MainLayout>
  );
}