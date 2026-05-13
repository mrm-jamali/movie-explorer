import { useFilterStore } from "../store/filterStore";

export default function ReleaseYearFilter() {
  const releaseYear = useFilterStore(
    (state) => state.releaseYear
  );

  const setReleaseYear = useFilterStore(
    (state) => state.setReleaseYear
  );

  return (
    <div className="py-7 border-b border-gray-100">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-2">
          <span className="text-[#6C4EFF]">📅</span>

          <h3 className="font-semibold text-[#111827]">
            Release Year
          </h3>
        </div>

        <button>⌃</button>

      </div>

      {/* RANGE INPUT */}
      <input
        type="range"
        min="1980"
        max="2024"
        value={releaseYear}
        onChange={(e) =>
          setReleaseYear(Number(e.target.value))
        }
        className="w-full accent-[#6C4EFF]"
      />


      

      {/* DISPLAY */}
      <div className="flex items-center justify-between mt-5">

        <div className="w-[90px] h-[44px] border border-gray-200 rounded-xl flex items-center justify-center text-sm font-medium">
          1980
        </div>

        <span className="text-gray-400">—</span>

        <div className="w-[90px] h-[44px] border border-gray-200 rounded-xl flex items-center justify-center text-sm font-medium">
          {releaseYear}
        </div>

      </div>

    </div>
  );
}