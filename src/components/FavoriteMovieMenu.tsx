import { useEffect, useRef, useState } from "react";

type Props = {
  movie: any;
  onRemove: (id: number) => void;
};

export default function FavoriteMovieMenu({ movie, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: movie.title,
      text: movie.overview,
      url: `${window.location.origin}/movie/${movie.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div ref={ref} className="relative ml-auto self-start mt-2">

      {/* ⋮ Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-800 hover:text-black text-2xl font-bold"
      >
        ⋮
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md overflow-hidden z-20">

          {/* Remove */}
          <button
            onClick={() => {
              onRemove(movie.id);
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-100"
          >
            Remove
          </button>

          {/* Share */}
          <button
            onClick={() => {
              handleShare();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
          >
            Share
          </button>

        </div>
      )}
    </div>
  );
}