export default function SkeletonCard() {
  return (
    <div className="animate-pulse w-full">
      <div className="h-[270px] bg-gray-300 rounded-xl mb-2" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
    </div>
  )
}