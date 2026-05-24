import { Star } from "lucide-react";

import { useAuth }
  from "../../contexts/AuthContext";

import { useNavigate }
  from "react-router-dom";

import HeroSlider
  from "./HeroSlider";

export default function OverviewSection() {

  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  return (

    <div className="flex-1 bg-[#F8F9FB]">

      {/* HERO */}
      <section className="px-8 pt-8">

        {/* TITLE */}
        <div className="mb-7">

          <h1
            className="
              text-[34px]
              leading-tight
              font-bold
              tracking-[-0.5px]
              text-[#111827]
            "
          >
            Welcome back, {user?.username}!
          </h1>

          <p
            className="
              mt-2
              text-[16px]
              text-[#6B7280]
            "
          >
            Discover something amazing to watch today
          </p>

        </div>

        {/* HERO SLIDER */}
        <HeroSlider />

      </section>

      {/* TRENDING */}
      <section className="px-8 mt-10 pb-10">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <h3
            className="
              text-[24px]
              font-semibold
              tracking-[-0.5px]
              text-[#111827]
            "
          >
            Trending Now
          </h3>

          <button
            onClick={() =>
              navigate("/movies")
            }
            className="
              text-[#7C3AED]
              text-[14px]
              font-medium
              hover:opacity-70
              transition
            "
          >
            View All
          </button>

        </div>

        {/* MOVIES */}
        <div className="grid grid-cols-6 gap-5">

          {[
            {
              title: "Dune: Part Two",
              year: "2024",
              rating: "8.6",
              image:
                "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
            },
            {
              title: "Interstellar",
              year: "2014",
              rating: "8.6",
              image:
                "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            },
          ].map((movie) => (

            <div
              key={movie.title}
              className="
                group
                cursor-pointer
              "
            >

              {/* POSTER */}
              <div
                className="
                  overflow-hidden
                  rounded-[22px]
                "
              >

                <img
                  src={movie.image}
                  alt={movie.title}
                  className="
                    h-[260px]
                    w-full
                    object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />

              </div>

              {/* INFO */}
              <div className="mt-3">

                <h4
                  className="
                    text-[16px]
                    font-medium
                    text-[#111827]
                  "
                >
                  {movie.title}
                </h4>

                <div
                  className="
                    mt-2
                    flex items-center justify-between
                  "
                >

                  <span
                    className="
                      text-[13px]
                      text-[#6B7280]
                    "
                  >
                    {movie.year}
                  </span>

                  <div className="flex items-center gap-1.5">

                    <Star
                      size={14}
                      className="
                        fill-[#FBBF24]
                        text-[#FBBF24]
                      "
                    />

                    <span
                      className="
                        text-[13px]
                        font-semibold
                        text-[#111827]
                      "
                    >
                      {movie.rating}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}