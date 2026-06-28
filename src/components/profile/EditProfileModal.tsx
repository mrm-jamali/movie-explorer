import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EditProfileModal({
  isOpen,
  onClose,
}: EditProfileModalProps) {
  const { user, syncCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    location: user?.location || "",
    avatar: user?.avatar || "",
    bio: user?.bio || "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      username: formData.username,
      location: formData.location,
      avatar: formData.avatar,
      bio: formData.bio,
    };

    const newActivity = {
      id: crypto.randomUUID(),
      type: "profile" as const,
      title: "Profile updated",
        poster_path: formData.avatar,
      movieId: 0,
      time: new Date().toISOString(),
    };

    syncCurrentUser({
      ...updatedUser,
      activities: [newActivity, ...(user.activities || [])],
    });

    onClose();
  };

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-4 sm:p-6 shadow-lg">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Edit Profile
        </h2>

        <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {/* FORM */}
      <div className="space-y-3 sm:space-y-5">
        
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-xl border px-3 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          placeholder="Username"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full rounded-xl border px-3 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          placeholder="Location"
        />

        <input
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full rounded-xl border px-3 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          placeholder="Avatar URL"
        />

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full rounded-xl border px-3 py-2 sm:py-3 text-sm sm:text-base min-h-[90px] sm:min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          placeholder="Bio"
        />

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-[#7C3AED] py-2.5 sm:py-3 text-white text-sm sm:text-base font-medium hover:bg-[#6D28D9] transition"
        >
          Save Changes
        </button>

      </div>
    </div>
  </div>
);
}