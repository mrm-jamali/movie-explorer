import { useFilterStore } from "../store/filterStore";

export default function RatingFilter() {
  const rating = useFilterStore((state) => state.rating);
  const setRating = useFilterStore((state) => state.setRating);

  const options = [
    { label: "★★★★★", value: 9 },
    { label: "★★★★ & up", value: 7 },
    { label: "★★★ & up", value: 5 },
  ];

  return (
    <div className="pt-7">

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[#6C4EFF]">⭐</span>
          <h3 className="font-semibold text-[#111827]">
            Rating
          </h3>
        </div>
        <button>⌃</button>
      </div>

      <div className="space-y-4">

        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 cursor-pointer"
          >
            {/* 👇 radio واقعی */}
            <input
              type="radio"
              name="rating"
              checked={rating === opt.value}
              onChange={() => setRating(opt.value)}
              className="accent-[#6C4EFF]"
            />

            <span className="text-[#FDBA12]">
              {opt.label}
            </span>
          </label>
        ))}

      </div>
    </div>
  );
}