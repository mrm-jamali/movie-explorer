import { useEffect, useState } from "react";

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);

        setTimeout(() => {
          onClose();
        }, 200); // زمان خروج انیمیشن
      }, 2000); // 👈 مدت نمایش کوتاه‌تر

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2
        z-50
        transition-all duration-200
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
      `}
    >
      <div className="px-4 py-2 rounded-xl bg-black text-white text-sm shadow-lg">
        {message}
      </div>
    </div>
  );
}