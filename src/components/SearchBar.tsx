import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search, onSearch]);

  return (
    <div className="relative hidden md:block">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search movies..."
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          pl-10 pr-4 py-2 rounded-full
          border border-gray-200 bg-gray-50 text-sm
          focus:outline-none focus:ring-2 focus:ring-purple-400
          focus:bg-white
          transition-all duration-300 ease-in-out
          ${focused ? "w-[420px]" : "w-[300px]"}
          shadow-sm focus:shadow-md
        `}
      />
    </div>
  );
}