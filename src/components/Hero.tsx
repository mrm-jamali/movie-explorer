type Props = {
  title: string;
  backdrop: string;
  overview: string;
};

export default function Hero({ title, backdrop, overview }: Props) {
  return (
    <div className="mt-6">
      
      <div className="max-w-[1400px] mx-auto px-6">

        <div
          className="w-full h-[520px] bg-cover bg-center relative rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-end justify-center text-center">

            <div className="text-white pb-12 flex flex-col items-center">

              <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">
                {title}
              </h1>

              <p className="text-sm text-gray-300 line-clamp-3 mb-6 max-w-2xl">
                {overview}
              </p>

              <div className="flex gap-3">
                <button className="px-5 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition cursor-pointer">
                  ▶ Play
                </button>

                <button className="px-5 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer">
                  + My List
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}