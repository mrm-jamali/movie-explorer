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
      poster: formData.avatar,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="space-y-5">
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            placeholder="Username"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            placeholder="Location"
          />

          <input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            placeholder="Avatar URL"
          />

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            placeholder="Bio"
          />

          <button
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-[#7C3AED] py-3 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}