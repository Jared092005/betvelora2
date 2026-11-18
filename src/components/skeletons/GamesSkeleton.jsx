function GamesSkeleton({
  count = 8,
  aspect = 'aspect-[4/3]',
  className = 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5',
}) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-white/10 bg-[#111116]"
        >
          <div className={`${aspect} animate-pulse bg-white/[0.05]`} />
          <div className="space-y-2 p-3">
            <div className="h-3 w-3/4 animate-pulse rounded bg-white/[0.07]" />
            <div className="h-2.5 w-1/3 animate-pulse rounded bg-white/[0.05]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default GamesSkeleton
