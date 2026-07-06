import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { fetchMovieVideos } from "../services/movieApi";


type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
};


type Props = {
  heroMovies: Movie[];
  currentHero: number;
  setCurrentHero: (index: number) => void;
};


export default function HeroSlider({
  heroMovies,
  currentHero,
  setCurrentHero,
}: Props) {


  const [trailerKey, setTrailerKey] = useState("");


  if (!heroMovies.length) return null;


  const currentMovie = heroMovies[currentHero];


  const handlePlay = async () => {
    try {

      const data = await fetchMovieVideos(currentMovie.id);


      const trailer = data.results.find(
        (video:any) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );


      if(trailer){
        setTrailerKey(trailer.key);
      }
      else{
        console.log("No trailer found");
      }


    } catch(error){
      console.log(error);
    }
  };


  return (

    <>
    <AnimatePresence mode="wait">

      <motion.div
        key={currentMovie.id}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.9 }}
        className="relative h-[460px] rounded-[22px] overflow-hidden"
      >


        {/* BACKDROP */}
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          className="absolute inset-0 w-full h-full object-cover"
        />


        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />



        {/* CONTENT */}
        <div className="absolute bottom-12 left-8 max-w-[520px] text-white">


          <h1 className="text-3xl font-bold leading-tight">
            {currentMovie.title}
          </h1>


          <p className="mt-3 text-sm text-gray-200 line-clamp-3">
            {currentMovie.overview}
          </p>



          <div className="mt-5 flex items-center gap-3">


            {/* PLAY */}
            <button
              onClick={handlePlay}
              className="
              h-[40px]
              md:h-[54px]
              px-4
              md:px-7
              rounded-full
              bg-[#7C3AED]
              text-white
              text-[12px]
              md:text-[15px]
              font-medium
              shadow-md
              hover:scale-[1.02]
              hover:bg-[#6D28D9]
              transition
              cursor-pointer
              "
            >
              ▶ Play Now
            </button>



            {/* WATCHLIST */}
            <button
              className="
              px-4
              py-2
              bg-white/10
              hover:bg-white/20
              rounded-xl
              text-sm
              transition
              cursor-pointer
              "
            >
              + Watchlist
            </button>


          </div>


        </div>


      </motion.div>


    </AnimatePresence>



    {/* DOTS */}
    <div className="mt-4 flex justify-center items-center gap-2">

      {heroMovies.map((_, index)=>(
        <button
          key={index}
          onClick={()=>setCurrentHero(index)}
          className={`
          transition-all duration-500 rounded-full

          ${
            currentHero === index
            ? "w-7 h-2 bg-purple-500"
            : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
          }

          `}
        />

      ))}


    </div>



    {/* VIDEO */}
    {trailerKey && (
      <VideoPlayer
        videoKey={trailerKey}
        onClose={()=>setTrailerKey("")}
      />
    )}


    </>
  );
}