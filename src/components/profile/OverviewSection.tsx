import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HeroSlider from "./HeroSlider";
import QueryState from "../QueryState";

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

  const isLoading = heroQuery.isLoading || trendingQuery.isLoading;
  const error = heroQuery.error || trendingQuery.error;

  const trendingMovies = trendingQuery.data?.results ?? [];

 return (
  <QueryState isLoading={isLoading} error={error}>
    
    <div className="max-w-6xl mx-auto px-4 md:px-6">

      {/* HERO */}
      <section className="pt-8">
        <div className="mb-7">
          <h1 className="text-[34px] font-bold tracking-[-0.5px] text-[#111827]">
            Welcome back, {user?.username}!
          </h1>

          <p className="mt-2 text-[16px] text-[#6B7280]">
            Discover something amazing to watch today
          </p>
        </div>

        <HeroSlider />
      </section>

      {/* TRENDING */}
      <section className="mt-10 pb-10">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-[24px] font-semibold text-[#111827]">
            Trending Now
          </h3>

          <button
            onClick={() => navigate("/movies?type=trending")}
            className="text-[#7C3AED] text-[14px]"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-6 gap-5">
          {trendingMovies.slice(0, 6).map((movie: any) => (
            <div key={movie.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-[22px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="h-[260px] w-full object-cover"
                />
              </div>

              <h4 className="text-[14px] mt-2 text-[#111827]">
                {movie.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

    </div>

  </QueryState>
);
}