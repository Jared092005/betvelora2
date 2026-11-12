import AuthShell from '../components/auth/AuthShell'
import { useLanguage } from '../i18n/LanguageContext'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#0c0c11] px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500'

function Login() {
  const { t } = useLanguage()
  return (
    <AuthShell active="login">
      <h1 className="text-4xl font-black uppercase tracking-wide text-white">{t('Welcome back.')}</h1>
      <p className="mt-2 text-sm text-zinc-400">{t('Enter your credentials to access the high-stakes lobby.')}</p>

      <form onSubmit={(event) => event.preventDefault()} className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            {t('Email or username')}
          </span>
          <input type="text" autoComplete="username" placeholder="email@email.com" className={inputClass} />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-zinc-300">
            {t('Password')}
            <button type="button" className="text-[11px] font-bold normal-case tracking-normal text-red-400 hover:text-red-300">
              {t('Forgot?')}
            </button>
          </span>
          <input type="password" autoComplete="current-password" placeholder="••••••••" className={inputClass} />
        </label>

        <button
          type="submit"
          className="red-gradient-btn w-full rounded-xl py-4 text-sm font-bold uppercase tracking-wider text-white"
        >
          {t('Enter the lobby')}
        </button>

        <p className="text-center text-xs leading-relaxed text-zinc-400">
          By entering, you confirm you are 18+ and agree to our{' '}
          <span className="text-red-400">Terms of Service</span> and{' '}
          <span className="text-red-400">Privacy Policy</span>.
        </p>
      </form>
    </AuthShell>
  )
}

export default Login
