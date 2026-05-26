import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeDropdown() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "dark") {
      root.classList.add("dark");
    }

    if (theme === "light") {
      root.classList.add("light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const themes = [
    {
      name: "Light",
      value: "light",
      icon: <Sun size={16} />,
    },
    {
      name: "Dark",
      value: "dark",
      icon: <Moon size={16} />,
    },
    {
      name: "System",
      value: "system",
      icon: <Monitor size={16} />,
    },
  ];

  return (
    <div className="border-b border-gray-100 pb-2 mb-2">
      <p
        className="
          px-4
          py-2
          text-xs
          font-medium
          text-gray-400
        "
      >
        Theme
      </p>

      {themes.map((item) => (
        <button
          key={item.value}
          onClick={() => setTheme(item.value)}
          className={`
            w-full
            flex items-center
            gap-3
            px-4 py-3
            rounded-xl
            transition
            text-sm

            ${
              theme === item.value
                ? "bg-purple-100 text-purple-700"
                : "hover:bg-gray-100"
            }
          `}
        >
          {item.icon}
          {item.name}
        </button>
      ))}
    </div>
  );
}