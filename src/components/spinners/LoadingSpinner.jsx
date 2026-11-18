function LoadingSpinner({ inline = false, label, size, className = '' }) {
  const spinnerSize = size ?? (inline ? 'text-xs' : 'text-3xl')
  const spinner = (
    <i className={`fa-solid fa-spinner fa-spin text-[#d91528] ${spinnerSize}`} aria-hidden="true" />
  )

  if (inline) {
    return (
      <span
        className={`inline-flex items-center gap-2 text-xs text-zinc-400 ${className}`}
        role="status"
      >
        {spinner}
        {label && <span>{label}</span>}
      </span>
    )
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
    >
      {spinner}
      {label && <span className="text-sm text-zinc-400">{label}</span>}
    </div>
  )
}

export default LoadingSpinner
