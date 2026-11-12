import { useState } from 'react'
import { Link } from 'react-router-dom'

import HomePromos from '../components/home/HomePromos'
import { useLanguage } from '../i18n/LanguageContext'

const tabs = [
  { id: 'available', label: 'Available bonuses', count: '0' },
  { id: 'active', label: 'Active bonuses', count: '0' },
  { id: 'history', label: 'Bonus history', chevron: true },
]

const emptyStates = {
  available: {
    title: 'No bonuses available',
    text: 'No bonuses available at the moment.',
  },
  active: {
    title: 'No active bonuses',
    text: 'Activate a bonus to see it listed here.',
  },
  history: {
    title: 'No bonus history',
    text: 'Your claimed bonuses will appear here.',
  },
}

function Promotions() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('available')
  const emptyState = emptyStates[activeTab]

  return (
    <div className="flex min-w-0 flex-1 bg-casino-pattern">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-black uppercase tracking-wide text-white">{t('Available Bonuses')}</h1>
          <p className="mt-1 text-sm text-zinc-400">
            {t('Explore active promotions, deposit match perks, and rewarded spins')}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#121318] p-4">
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">{t('Bonuses')}</h2>
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-pressed={active}
                      className={
                        active
                          ? 'flex w-full cursor-pointer items-center justify-between rounded-full bg-[#d91528] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-950/50 transition-colors'
                          : 'flex w-full cursor-pointer items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-red-950/20 hover:text-red-400'
                      }
                    >
                      <span>{t(tab.label)}</span>
                      {tab.count && <span className="text-[11px]">{tab.count}</span>}
                      {tab.chevron && <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121318] p-4">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">{t('Bonus Code')}</h3>
              <input
                className="mb-3 w-full rounded-lg border border-white/10 bg-[#0b0b0f] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#d91528] focus:outline-none"
                placeholder={t('Enter bonus code...')}
                type="text"
                aria-label="Código de bono"
              />
              <button
                type="button"
                className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/[0.05] py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 active:scale-90"
              >
                {t('Apply code')}
              </button>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#121318] p-8 text-center">
              <i className="fa-solid fa-gift text-5xl text-amber-500" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-white">{t(emptyState.title)}</h2>
              <p className="mt-2 text-sm text-zinc-400">{t(emptyState.text)}</p>
              <Link
                to="/casino"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d91528] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-950/50 transition-all hover:bg-[#bd1122] active:scale-90"
              >
                {t('Explore games')}
                <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
              </Link>
            </div>

            <HomePromos />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Promotions
