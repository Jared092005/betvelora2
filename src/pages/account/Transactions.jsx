import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

const filters = ['All', 'Deposits', 'Withdrawals', 'Bets / Casino']

function Transactions() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState(filters[0])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-6 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="flex items-center gap-3 text-2xl font-black uppercase tracking-wide text-white">
          <i className="fa-solid fa-receipt text-[#e50914]" aria-hidden="true" />
          {t('Transaction history')}
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? 'rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black transition'
                  : 'rounded-full border border-white/10 bg-[#111215] px-4 py-1.5 text-xs font-semibold text-zinc-400 transition hover:text-white'
              }
            >
              {t(filter)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-xs text-zinc-400">
          <span>{t('Period')}:</span>
          <select className="rounded-lg border border-white/10 bg-[#111215] px-3 py-1.5 text-xs text-white focus:border-red-500/50 focus:outline-none">
            <option>{t('Last 30 days')}</option>
            <option>{t('Last 7 days')}</option>
            <option>{t('Last 90 days')}</option>
            <option>{t('All time')}</option>
          </select>
        </label>

        <p className="text-xs text-zinc-400">
          {t('Showing')} <span className="font-bold text-white">0</span> {t('transactions')}
        </p>
      </div>

      <section className="flex min-h-[460px] flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0f1015] p-8 text-center">
        <i className="fa-solid fa-receipt text-4xl text-[#e50914]" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-bold text-white">{t('No transactions yet')}</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
          {t('Your deposits, withdrawals and bets will show up here once you start playing.')}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/account/deposit"
            className="account-btn-primary"
          >
            {t('Make a deposit')}
          </Link>
          <Link
            to="/casino"
            className="account-btn-secondary"
          >
            {t('Explore games')}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Transactions
