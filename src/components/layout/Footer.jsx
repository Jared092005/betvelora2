import { Link } from 'react-router-dom'

import { footerLinks } from '../../config/navigation'
import { useLanguage } from '../../i18n/LanguageContext'
import Logo from '../ui/Logo'

function Footer() {
  const { t } = useLanguage()
  return (
    <footer
      className="relative z-10 w-full shrink-0 border-t border-white/[0.08] bg-[#050508] font-sans text-zinc-400"
      data-purpose="site-footer"
    >
      <div className="mx-auto max-w-7xl space-y-6 px-6 pb-16 pt-10 lg:px-8">
        <div className="space-y-3">
          <Logo className="h-6" />
          <p className="text-xs text-zinc-400">{t('2026 VELORA | All rights reserved.')}</p>
        </div>

        <div className="w-full border-t border-white/10" />

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">{t('CASINO')}</h3>
          <ul className="space-y-2 text-xs text-zinc-400">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors duration-150 hover:text-white">
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full border-t border-white/10" />

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-lg border border-white/20 bg-white/[0.02] px-3.5 py-1.5 text-xs text-zinc-300">
            Alp-Pay (Transferencia local LatAm)
          </span>
          <span className="rounded-lg border border-white/20 bg-white/[0.02] px-3.5 py-1.5 text-xs text-zinc-300">
            Alp-Pay (Tarjeta 3DS)
          </span>
          <span className="rounded-lg border border-white/20 bg-white/[0.02] px-3.5 py-1.5 text-xs text-zinc-300">
            Bank Transfer
          </span>
        </div>

        <div className="space-y-2.5 pt-1 text-xs text-zinc-400">
          <div className="flex items-center space-x-1.5 text-zinc-400">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-500 text-[8px] font-bold">
              18+
            </span>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-500 text-[8px]">
              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-500 font-serif text-[8px] font-bold italic">
              i
            </span>
          </div>

          <p className="max-w-5xl text-[11px] leading-relaxed text-zinc-400">
            Notice: This is an advertisement for gambling services. Gambling should not be considered a solution to
            financial difficulties. Please read the terms and conditions carefully and gamble responsibly.
          </p>

          <button
            type="button"
            className="flex w-fit items-center space-x-1 pt-0.5 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
          >
            <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" x2="22" y1="12" y2="12" />
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            <span className="pl-0.5">{t('English')} ▾</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
