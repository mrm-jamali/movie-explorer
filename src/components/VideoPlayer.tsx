type Props = {
  videoKey: string;
  onClose: () => void;
};

export default function VideoPlayer({ videoKey, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4">
      <div className="relative w-full max-w-[1000px] aspect-video">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 text-white text-4xl hover:text-gray-300 transition z-10"
        >
          ✕
        </button>

        <iframe
  className="w-full h-full rounded-2xl"
  src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
  title="Movie Trailer"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  referrerPolicy="strict-origin-when-cross-origin"
/>
      </div>
    </div>
  );
}