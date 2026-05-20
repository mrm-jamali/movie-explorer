import { useAuth } from "../../contexts/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex flex-col items-center gap-6 sm:flex-row">

        {/* Avatar */}
        
        <img
  src={user?.avatar}
  alt={user?.username}
  className="h-24 w-24 rounded-full border object-cover"
/>

        {/* User info */}
        <div className="text-center sm:text-left">

          <h2 className="text-2xl font-bold text-gray-900">
            {user?.username || "Unknown User"}
          </h2>

          <p className="mt-1 text-gray-500">
            {user?.email || "No email"}
          </p>

          <span className="mt-3 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-600">
            Active User
          </span>
        

        </div>

      </div>

    </div>
  );
}