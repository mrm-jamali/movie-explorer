import MainLayout from "../components/layout/MainLayout";

import Preferences from "../components/profile/Preferences";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileStats from "../components/profile/ProfileStats";
import RecentActivity from "../components/profile/RecentActivity";

export default function ProfilePage() {
  return (
    <MainLayout>

      <div className="p-6 md:p-8">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your profile information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <ProfileCard />

        {/* Watchlist Summary */}
        <section className="mb-8">

          <h3 className="mb-6 text-2xl font-bold text-gray-900">
            Watchlist Summary
          </h3>

          <ProfileStats />

        </section>

        {/* Recent Activity */}
        <section className="mb-8">

          <h3 className="mb-6 text-2xl font-bold text-gray-900">
            Recent Activity
          </h3>

          <RecentActivity />

        </section>

        {/* Preferences */}
        <section>

          <h3 className="mb-6 text-2xl font-bold text-gray-900">
            Preferences
          </h3>

          <Preferences />

        </section>

      </div>

    </MainLayout>
  );
}