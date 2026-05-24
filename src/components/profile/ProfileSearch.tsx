import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfileSearch() {

  const [query, setQuery] =
    useState("");

  const navigate =
    useNavigate();

  const handleSearch = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!query.trim()) return;

    navigate(
      `/movies?search=${query}`
    );

  };

  return (

    <form
      onSubmit={handleSearch}
      className="relative"
    >

      <Search
        size={18}
        className="
          absolute
          left-4 top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="text"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search movies..."
        className="
          w-[280px]
          h-[46px]
          rounded-2xl
          bg-[#F3F4F6]
          border border-transparent
          pl-11 pr-4
          text-sm
          outline-none
          transition
          focus:border-purple-500
          focus:bg-white
        "
      />

    </form>
  );
}