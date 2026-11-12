import { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { mainNav } from '../../config/navigation'
import { useLanguage } from '../../i18n/LanguageContext'
import Logo from '../ui/Logo'

const desktopLinkClass = ({ isActive }) =>
  [
    'flex items-center space-x-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] tracking-wider transition-all duration-150 xl:space-x-2 xl:px-3.5 xl:text-xs',
    isActive
      ? 'bg-[#d91528] font-semibold text-white shadow-md shadow-red-900/40'
      : 'font-medium text-zinc-300 hover:bg-white/[0.05] hover:text-white',
  ].join(' ')

const mobileLinkClass = ({ isActive }) =>
  [
    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-widest transition-all',
    isActive
      ? 'border border-velora-ruby/30 bg-velora-ruby/15 text-velora-ruby'
      : 'text-zinc-300 hover:bg-white/5 hover:text-white',
  ].join(' ')

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const navRef = useRef(null)
  const dragRef = useRef({ dragging: false, startX: 0, scrollLeft: 0, moved: false })

  const closeMenu = () => setMenuOpen(false)

  const handleDragStart = (event) => {
    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      scrollLeft: navRef.current?.scrollLeft ?? 0,
      moved: false,
    }
  }

  const handleDragMove = (event) => {
    if (!dragRef.current.dragging || !navRef.current) return

    const distance = event.clientX - dragRef.current.startX
    if (Math.abs(distance) > 4) dragRef.current.moved = true
    navRef.current.scrollLeft = dragRef.current.scrollLeft - distance
  }

  const handleDragEnd = () => {
    dragRef.current.dragging = false
  }

  const handleNavClick = (event) => {
    if (!dragRef.current.moved) return
    event.preventDefault()
    event.stopPropagation()
    dragRef.current.moved = false
  }

  return (
    <>
      <header
        className="subtle-glass sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/[0.08] px-4 shadow-2xl backdrop-blur-md lg:px-6"
        data-purpose="main-header"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 xl:gap-4">
          <div className="shrink-0">
            <Logo className="h-8 sm:h-9" />
          </div>

          <div className="hidden min-w-0 flex-1 items-center lg:flex">
            <nav
              ref={navRef}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onDragStart={(event) => event.preventDefault()}
              onClickCapture={handleNavClick}
              className="no-scrollbar flex min-w-0 flex-1 cursor-grab select-none items-center space-x-0.5 overflow-x-auto active:cursor-grabbing"
              data-purpose="main-nav"
            >
              {mainNav.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={desktopLinkClass} draggable={false}>
                  {({ isActive }) => (
                    <>
                      <span className={isActive ? 'text-white' : 'text-zinc-400'} aria-hidden="true">
                        <i className={`${item.icon} text-[13px]`} />
                      </span>
                      <span>{t(item.label).toUpperCase()}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex shrink-0 items-center space-x-2 sm:space-x-3 lg:space-x-3" data-purpose="user-actions">
          <Link
            to="/account/messages"
            aria-label="Mensajes"
            className="relative hidden h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition duration-150 hover:bg-white/[0.08] hover:text-white lg:flex"
          >
            <i className="fa-regular fa-envelope text-sm" aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-velora-ruby ring-2 ring-[#070709]" />
          </Link>

          <div className="flex items-center rounded-full border border-white/10 bg-[#101015] py-1 pl-2.5 pr-1 shadow-inner sm:pl-3.5">
            <div className="mr-2 flex items-center space-x-1.5 sm:mr-3 sm:space-x-2">
              <i className="fa-solid fa-wallet text-xs text-zinc-300" aria-hidden="true" />
              <span className="whitespace-nowrap text-[11px] font-bold tracking-wide text-white sm:text-xs">0.00 €</span>
            </div>
            <Link
              to="/account/deposit"
              className="flex items-center cursor-pointer space-x-1 rounded-full bg-gradient-to-r from-[#d91528] to-[#b30e1f] px-2.5 py-1 text-[11px] font-bold text-white shadow-md shadow-red-950/60 transition-all duration-200 hover:brightness-110 sm:px-3 sm:text-xs"
            >
              <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
              <span>{t('Add')}</span>
            </Link>
          </div>

          <div className="relative hidden lg:flex">
            <button
              type="button"
              onClick={() => setLanguageOpen((open) => !open)}
              aria-label="Seleccionar idioma"
              aria-haspopup="listbox"
              aria-expanded={languageOpen}
              className="flex h-9 items-center gap-1 rounded-full cursor-pointer border border-white/10 bg-white/[0.04] px-2.5 text-zinc-300 transition hover:bg-white/[0.08] hover:text-white sm:gap-1.5 sm:px-3"
            >
              <i className="fa-solid fa-globe text-sm" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{language}</span>
            </button>

            {languageOpen && (
              <div
                role="listbox"
                aria-label="Idioma"
                className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#121318] p-1 shadow-2xl"
              >
                {[
                  { code: 'es', label: 'Español' },
                  { code: 'en', label: 'English' },
                ].map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    role="option"
                    aria-selected={language === option.code}
                    onClick={() => {
                      setLanguage(option.code)
                      setLanguageOpen(false)
                    }}
                    className={
                      language === option.code
                        ? 'flex w-full items-center justify-between rounded-lg bg-[#d91528] px-3 py-2 text-xs font-semibold text-white'
                        : 'flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white'
                    }
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-globe" aria-hidden="true" />
                      {option.label}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{option.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/account"
            aria-label="Cuenta de usuario"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#181820] text-zinc-300 transition-all duration-150 hover:border-white/30 hover:text-white lg:flex"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            to="/login"
            aria-label="Cerrar sesión"
            className="hidden items-center space-x-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-zinc-400 transition duration-200 hover:border-red-900/50 hover:bg-red-950/20 hover:text-red-400 lg:flex"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{t('Logout')}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:bg-white/[0.08] hover:text-white lg:hidden"
          >
            <i className="fa-solid fa-bars" aria-hidden="true" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-start bg-black/80 p-6 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Logo className="h-7" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:text-white"
            >
              <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2 py-6">
            {mainNav.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={mobileLinkClass} onClick={closeMenu}>
                <i className={`${item.icon} w-4 text-center`} aria-hidden="true" />
                <span>{t(item.label)}</span>
              </NavLink>
            ))}
            <Link
              to="/account"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-widest text-zinc-300 transition-all hover:bg-white/5 hover:text-white"
            >
              <i className="fa-regular fa-user w-4 text-center" aria-hidden="true" />
              <span>{t('Profile')}</span>
            </Link>
            <Link
              to="/account/messages"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-widest text-zinc-300 transition-all hover:bg-white/5 hover:text-white"
            >
              <i className="fa-regular fa-envelope w-4 text-center" aria-hidden="true" />
              <span>{t('Messages')}</span>
            </Link>

            <button
              type="button"
              onClick={() => setLanguageMenuOpen((open) => !open)}
              aria-expanded={languageMenuOpen}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-widest text-zinc-300 transition-all hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-3">
                <i className="fa-solid fa-globe w-4 text-center" aria-hidden="true" />
                <span>{t('Language')}</span>
              </span>
              <span className="flex items-center gap-2 text-[11px] font-bold text-zinc-400">
                {language}
                <i className={`fa-solid fa-chevron-${languageMenuOpen ? 'up' : 'down'} text-[10px]`} aria-hidden="true" />
              </span>
            </button>

            {languageMenuOpen && (
              <div className="ml-7 flex gap-2 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('es')
                    setLanguageMenuOpen(false)
                  }}
                  className={
                    language === 'es'
                      ? 'flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#d91528] px-3 py-2 text-xs font-semibold text-white'
                      : 'flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white'
                  }
                >
                  <i className="fa-solid fa-globe" aria-hidden="true" />
                  Español
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en')
                    setLanguageMenuOpen(false)
                  }}
                  className={
                    language === 'en'
                      ? 'flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#d91528] px-3 py-2 text-xs font-semibold text-white'
                      : 'flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white'
                  }
                >
                  <i className="fa-solid fa-globe" aria-hidden="true" />
                  English
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  )
}

export default Header
