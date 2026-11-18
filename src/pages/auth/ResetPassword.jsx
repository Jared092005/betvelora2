import { useState } from 'react'
import { Link } from 'react-router-dom'

import AuthShell from '../../components/auth/AuthShell'
import { useLanguage } from '../../i18n/LanguageContext'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#0c0c11] px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500'

function ResetPassword() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <AuthShell showTabs={false} panelClassName="max-w-lg">
      <h1 className="text-2xl font-black uppercase tracking-wide text-white">
        {t('Reset your password')}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        {t('Enter your email address and we will send you a link to reset your password.')}
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-950/20 p-6 text-center">
          <i className="fa-regular fa-envelope text-3xl text-red-400" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-bold text-white">{t('Check your email')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {t('If an account exists for that email, we sent a reset link.')}
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300"
          >
            {t('Back to Login')}
            <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-300">
              {t('Email address')}
            </span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@email.com"
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            className="red-gradient-btn w-full rounded-xl py-4 text-sm font-bold uppercase tracking-wider text-white"
          >
            {t('Send reset link')}
          </button>
        </form>
      )}

      {!submitted && (
        <p className="mt-6 text-center text-xs text-zinc-400">
          {t('Remembered your password?')}{' '}
          <Link to="/login" className="font-semibold text-red-400 hover:text-red-300">
            {t('Back to Login')}
          </Link>
        </p>
      )}
    </AuthShell>
  )
}

export default ResetPassword
