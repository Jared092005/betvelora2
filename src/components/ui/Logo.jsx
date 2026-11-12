import { Link } from 'react-router-dom'

function Logo({ className = 'h-9', src = '/logoBetVelora.png', link = true }) {
  const image = (
    <img
      src={src}
      alt="Velora Casino"
      className={`w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 ${className}`}
    />
  )

  if (!link) return image

  return (
    <Link to="/" className="group flex shrink-0 items-center" aria-label="Velora Casino — Inicio">
      {image}
    </Link>
  )
}

export default Logo
