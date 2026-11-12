import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'
import Logo from '../ui/Logo'

function AuthShell({ active, children }) {
  const { t } = useLanguage()
  const tabClass = (isActive) =>
    [
      'flex-1 rounded-full py-3 text-center text-sm font-semibold transition-all',
      isActive
        ? 'border border-red-500 bg-red-950/30 text-red-400 shadow-[0_0_18px_rgba(217,21,40,0.25)]'
        : 'text-zinc-400 hover:text-white',
    ].join(' ')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-casino-pattern bg-[radial-gradient(circle_at_50%_0%,rgba(217,21,40,0.16),transparent_55%)] px-4 py-10">
      <div className="mb-8">
        <Logo className="h-16" link={false} />
      </div>

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#121318]/95 p-8 shadow-2xl lg:p-12">
        <div className="mx-auto mb-10 flex max-w-md items-center rounded-full border border-white/10 bg-black/40 p-1">
          <Link to="/login" className={tabClass(active === 'login')}>
            {t('Login')}
          </Link>
          <Link to="/register" className={tabClass(active === 'register')}>
            {t('Register')}
          </Link>
        </div>

        {children}
      </div>
    </div>
  )
}

export default AuthShell
