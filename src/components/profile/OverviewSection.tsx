import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HeroSlider from "./HeroSlider";
import {
  fetchHeroMovies,
  fetchTrendingMovies,
} from "../../services/movieApi";

export default function OverviewSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const heroQuery = useQuery({
    queryKey: ["hero"],
    queryFn: fetchHeroMovies,
  });

  const trendingQuery = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingMovies,
  });

  const trendingMovies = trendingQuery.data?.results ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">

      {/*  HERO  */}
      <section className="pt-6 md:pt-8">

        {/* 💻 DESKTOP HERO TEXT */}
        <div className="hidden sm:block mb-7">
          <h1 className="text-xl sm:text-2xl md:text-[34px] font-bold tracking-[-0.5px] text-[#111827]">
            Welcome back, {user?.username}!
          </h1>

          <p className="mt-2 text-sm md:text-[16px] text-[#6B7280]">
            Discover something amazing to watch today
          </p>
        </div>

        {/*  MOBILE HERO (clean + modern) */}
        <div className="sm:hidden mb-6">
          <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">

            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

            <h2 className="text-base font-semibold">
              Hi {user?.username} 
            </h2>

            <p className="text-xs opacity-80 mt-1">
              Ready to discover your next favorite movie?
            </p>

            <button
              onClick={() => navigate("/movies")}
              className="mt-4 text-xs bg-white text-purple-700 px-3 py-1.5 rounded-lg font-medium"
            >
              Start Exploring
            </button>

          </div>
        </div>

        {/* 💻 HERO SLIDER */}
        <div className="hidden sm:block">
          <HeroSlider />
        </div>

      </section>

      {/*  TRENDING  */}
      <section className="mt-6 md:mt-10 pb-10">

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#111827]">
            Trending Now
          </h3>

          <button
            onClick={() => navigate("/movies?type=trending")}
            className="text-[#7C3AED] text-sm md:text-[14px] self-start sm:self-auto"
          >
            View All
          </button>
        </div>

        {/* GRID RESPONSIVE */}
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-6 
          gap-3 
          sm:gap-4 
          md:gap-5
        ">

          {trendingMovies.slice(0, 12).map((movie: any) => (
            <div
              key={movie.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="overflow-hidden rounded-[18px] md:rounded-[22px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="
                    w-full 
                    h-[160px] 
                    sm:h-[200px] 
                    md:h-[220px] 
                    lg:h-[260px] 
                    object-cover 
                    group-hover:scale-105 
                    transition
                  "
                />
              </div>

              <h4 className="text-[12px] sm:text-[14px] mt-2 text-[#111827] line-clamp-1">
                {movie.title}
              </h4>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}