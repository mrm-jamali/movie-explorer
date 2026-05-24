import {
  Bell,
  Check,
  Film,
  Heart,
  Star,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

export default function NotificationDropdown() {

  const [open, setOpen] =
    useState(false);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const notifications = [
    {
      id: 1,

      title: "New movie added",

      text:
        "Interstellar is now available.",

      icon: <Film size={18} />,
    },

    {
      id: 2,

      title: "Favorite updated",

      text:
        "Your favorites list was synced.",

      icon: <Heart size={18} />,
    },

    {
      id: 3,

      title: "Top rated movie",

      text:
        "Dune Part Two reached 9.1 rating.",

      icon: <Star size={18} />,
    },
  ];

  return (
    <div
      ref={notificationRef}
      className="relative"
    >

      {/* BUTTON */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          relative
          w-11 h-11
          rounded-2xl
          bg-[#F3F4F6]
          flex items-center justify-center
          hover:bg-gray-200
          transition
        "
      >

        <Bell
          size={20}
          className="text-gray-700"
        />

        <span
          className="
            absolute
            top-2 right-2
            w-2 h-2
            rounded-full
            bg-red-500
          "
        />

      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-16
            w-[360px]
            bg-white
            border border-gray-200
            rounded-3xl
            shadow-2xl
            overflow-hidden
            z-50
          "
        >

          {/* HEADER */}
          <div
            className="
              px-5 py-4
              border-b border-gray-100
              flex items-center justify-between
            "
          >

            <div>

              <h3
                className="
                  text-sm
                  font-semibold
                  text-gray-800
                "
              >
                Notifications
              </h3>

              <p
                className="
                  text-xs
                  text-gray-500
                  mt-1
                "
              >
                Latest updates from MovieExplorer
              </p>

            </div>

            <button
              className="
                text-xs
                text-purple-500
                hover:text-purple-600
                font-medium
              "
            >
              Mark all read
            </button>

          </div>

          {/* ITEMS */}
          <div className="max-h-[350px] overflow-y-auto">

            {notifications.map((item) => (
              <div
                key={item.id}
                className="
                  px-5 py-4
                  flex items-start gap-4
                  hover:bg-gray-50
                  transition
                  border-b border-gray-100
                  last:border-none
                "
              >

                <div
                  className="
                    w-10 h-10
                    rounded-2xl
                    bg-purple-100
                    text-purple-600
                    flex items-center justify-center
                    shrink-0
                  "
                >
                  {item.icon}
                </div>

                <div className="flex-1">

                  <div
                    className="
                      flex items-center justify-between
                    "
                  >

                    <h4
                      className="
                        text-sm
                        font-semibold
                        text-gray-800
                      "
                    >
                      {item.title}
                    </h4>

                    <span
                      className="
                        text-[11px]
                        text-gray-400
                      "
                    >
                      now
                    </span>

                  </div>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    {item.text}
                  </p>

                </div>

              </div>
            ))}

          </div>

          {/* FOOTER */}
          <div
            className="
              p-4
              border-t border-gray-100
            "
          >

            <button
              className="
                w-full
                h-11
                rounded-2xl
                bg-purple-500
                text-white
                text-sm
                font-medium
                hover:bg-purple-600
                transition
                flex items-center justify-center gap-2
              "
            >

              <Check size={16} />

              View all notifications

            </button>

          </div>

        </div>
      )}

    </div>
  );
}