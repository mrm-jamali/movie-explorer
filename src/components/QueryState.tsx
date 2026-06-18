import SkeletonCard from "./SkeletonCard";

export default function QueryState({ isLoading, error, children }: Props) {
  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 mt-20 grid grid-cols-5 gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (error) {
  return (
    <div className="flex flex-col items-center justify-center mt-24 px-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md w-full text-center shadow-sm">
        
        <div className="text-4xl mb-3">⚠️</div>

        <h2 className="text-lg font-semibold text-red-600 mb-2">
          Something went wrong
        </h2>

        <p className="text-sm text-gray-600 mb-5">
          We couldn’t load data. Please check your connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

  return <>{children}</>;
}