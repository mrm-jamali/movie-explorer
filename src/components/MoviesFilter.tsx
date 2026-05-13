import GenresFilter from "./GenresFilter";
import ReleaseYearFilter from "./ReleaseYearFilter";
import RatingFilter from "./RatingFilter";

export default function MoviesFilter({ onReset }: { onReset: () => void }) {
   
  return (
    <aside className="w-[290px] bg-white rounded-[28px] p-6 shadow-sm h-fit">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[28px] font-bold text-[#111827]">
          Filters
        </h2>

       
       
<button
  onClick={onReset}
  className="text-[#6C4EFF] text-sm font-medium"
>
  Reset
</button>
      </div>

      {/* FILTER SECTIONS */}
      <GenresFilter />

      <ReleaseYearFilter />

      <RatingFilter />

    </aside>
  );
}