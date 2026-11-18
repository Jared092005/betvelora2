import { useEffect, useRef } from 'react'

import LoadingSpinner from '../spinners/LoadingSpinner'

function InfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  disabled = false,
  rootMargin = '0px 0px',
  loadingLabel,
  className = '',
}) {
  const sentinelRef = useRef(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || disabled || !hasMore) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !loading) {
          onLoadMore()
        }
      },
      { rootMargin, threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [disabled, hasMore, loading, onLoadMore, rootMargin])

  if (disabled || !hasMore) return null

  return (
    <>
      <div ref={sentinelRef} className={`h-1 w-full ${className}`} aria-hidden="true" />

      {loading && loadingLabel && (
        <div className="mt-6 flex items-center justify-center">
          <LoadingSpinner inline label={loadingLabel} />
        </div>
      )}
    </>
  )
}

export default InfiniteScroll
