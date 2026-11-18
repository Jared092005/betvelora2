function ProviderListSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-2.5 px-2 py-2">
          <span className="h-4 w-10 animate-pulse rounded bg-white/[0.06]" />
          <span className="h-2.5 flex-1 animate-pulse rounded bg-white/[0.04]" />
        </div>
      ))}
    </>
  )
}

export default ProviderListSkeleton
