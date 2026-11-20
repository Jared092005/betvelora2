import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

/**
 * MobileNavDrawer — barra de navegación inferior para móvil y tablet.
 * Recreada a partir de la referencia `assets/mobileNavDrawer.png` y adaptada
 * al design system: estado activo en dorado, mismos iconos que el Header
 * de escritorio y cinco accesos que caben desde 320px.
 *
 * Solo se muestra por debajo de `lg` (1024px); en escritorio manda el Header.
 */
const navItems = [
  { label: 'Home', to: '/', icon: 'fa-house', end: true },
  { label: 'Casino', to: '/casino', icon: 'fa-dice' },
  { label: 'Live', to: '/casino-live', icon: 'fa-video' },
  { label: 'Crash', to: '/crash-games', icon: 'fa-rocket' },
  { label: 'Virtual', to: '/virtual', icon: 'fa-gamepad' },
]

export default function MobileNavDrawer() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <nav
      aria-label="Mobile navigation"
      data-purpose="mobile-nav-drawer"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#333333] bg-[#141414] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-out lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <ul className="mx-auto flex w-full max-w-2xl items-stretch">
        {navItems.map((item) => (
          <li key={item.to} className="min-w-0 flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex h-16 flex-col items-center justify-center gap-1.5 px-0.5 transition-colors duration-200 ${
                  isActive
                    ? 'text-velora-red drop-shadow-[0_0_8px_rgba(245,158,11,0.35)]'
                    : 'text-[#818286] hover:text-slate-200'
                }`
              }
            >
              <i className={`fa-solid ${item.icon} text-lg leading-none`} aria-hidden="true" />
              <span className="w-full truncate text-center text-[9px] font-bold uppercase leading-none tracking-[0.02em] sm:text-[10px]">
                {t(item.label)}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
