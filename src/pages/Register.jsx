import { Link } from 'react-router-dom'

import AuthShell from '../components/auth/AuthShell'
import { useLanguage } from '../i18n/LanguageContext'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#0c0c11] px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500'

function Register() {
  const { t } = useLanguage()
  return (
    <AuthShell active="register">
      <h1 className="text-4xl font-black uppercase tracking-wide text-white">{t('Join the club.')}</h1>
      <p className="mt-2 text-sm text-zinc-400">{t('Create your account and unlock the full Velora experience.')}</p>

      <form onSubmit={(event) => event.preventDefault()} className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-300">{t('Full name')}</span>
          <input type="text" autoComplete="name" placeholder="Your name" className={inputClass} />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            {t('Email or username')}
          </span>
          <input type="email" autoComplete="email" placeholder="email@email.com" className={inputClass} />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-300">{t('Password')}</span>
          <input type="password" autoComplete="new-password" placeholder="••••••••" className={inputClass} />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            {t('Confirm password')}
          </span>
          <input type="password" autoComplete="new-password" placeholder="••••••••" className={inputClass} />
        </label>

        <label className="flex items-start gap-2 text-xs text-zinc-400">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#0c0c11] accent-red-600" />
          <span>{t('I confirm I am 18+ and accept the Terms of Service and Privacy Policy.')}</span>
        </label>

        <button
          type="submit"
          className="red-gradient-btn w-full rounded-xl py-4 text-sm font-bold uppercase tracking-wider text-white"
        >
          {t('Create account')}
        </button>

        <p className="text-center text-xs text-zinc-400">
          {t('Already have an account?')}{' '}
          <Link to="/login" className="font-semibold text-red-400 hover:text-red-300">
            {t('Log in')}
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}

export default Register
