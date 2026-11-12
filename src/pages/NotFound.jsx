import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <span className="font-display text-7xl font-black text-red-600">404</span>
      <h1 className="text-xl font-bold text-white">Página no encontrada</h1>
      <p className="max-w-sm text-sm text-slate-400">
        La pantalla que buscas no existe o todavía no forma parte del lobby.
      </p>
      <Link
        to="/"
        className="red-gradient-btn mt-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
      >
        Volver al Lobby
      </Link>
    </div>
  )
}

export default NotFound
