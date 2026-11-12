import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

function EmptyCard({ icon, iconClass, title, text }) {
  return (
    <section className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111215] p-6 text-center">
      <span className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconClass}`}>
        <i className={`${icon} text-2xl`} aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-lg font-bold text-white">{title}</h2>
      <p className="mt-2 max-w-xs text-xs leading-relaxed text-zinc-400">{text}</p>
    </section>
  )
}

function Dashboard() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-black uppercase tracking-wide text-white">{t('Hi, user')}</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-[#111215] p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{t('Available balance')}</h2>
          <p className="mt-2 text-3xl font-black text-[#e50914]">0.00 €</p>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-xs">
            <div>
              <p className="text-zinc-500">{t('Withdrawable')}</p>
              <p className="mt-1 font-bold text-white">0.00 €</p>
            </div>
            <div>
              <p className="text-zinc-500">{t('Bonus')}</p>
              <p className="mt-1 font-bold text-white">0.00 €</p>
            </div>
            <div>
              <p className="text-zinc-500">{t('Non withdrawable')}</p>
              <p className="mt-1 font-bold text-white">0.00 €</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/account/deposit"
              className="account-btn-primary"
            >
              {t('Deposit')}
            </Link>
            <Link
              to="/account/withdrawal"
              className="account-btn-secondary"
            >
              {t('Withdrawal')}
            </Link>
          </div>
        </section>

        <EmptyCard
          icon="fa-solid fa-gift"
          iconClass="bg-amber-950/50 text-amber-400"
          title={t('No promotions yet')}
          text={t('Offers aimed at your account will show up here.')}
        />

        <EmptyCard
          icon="fa-solid fa-gamepad"
          iconClass="bg-indigo-950/50 text-indigo-300"
          title={t('No sessions yet')}
          text={t('Your recent game sessions will appear here.')}
        />

        <EmptyCard
          icon="fa-solid fa-star"
          iconClass="bg-yellow-950/50 text-yellow-400"
          title={t('No favorites yet')}
          text={t('Tap the heart on a game to keep it here.')}
        />
      </div>
    </div>
  )
}

export default Dashboard
