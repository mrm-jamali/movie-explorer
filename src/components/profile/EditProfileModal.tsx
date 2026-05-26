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
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    location: user?.location || "",
    avatar: user?.avatar || "",
    bio:
      "Movie explorer, dreamer and front-end developer. Always looking for something amazing to watch.",
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
    // فعلاً فقط log
    // بعداً به Context یا API وصلش می‌کنیم
    console.log(formData);

    onClose();
  };

  return (
    <div
      className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/40
      backdrop-blur-sm
    "
    >
      <div
        className="
        w-full max-w-xl
        rounded-3xl
        bg-white
        p-7
        shadow-lg
      "
      >
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Edit Profile
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm">
              Username
            </label>

            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="
                w-full rounded-xl
                border p-3
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Location
            </label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="
                w-full rounded-xl
                border p-3
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Avatar URL
            </label>

            <input
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="
                w-full rounded-xl
                border p-3
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Bio
            </label>

            <textarea
              rows={4}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="
                w-full rounded-xl
                border p-3
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          <button
            onClick={handleSubmit}
            className="
              w-full rounded-2xl
              bg-[#7C3AED]
              py-3
              text-white
              font-medium
              hover:opacity-90
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}