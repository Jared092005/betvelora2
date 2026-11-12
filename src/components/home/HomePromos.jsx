import { useLanguage } from '../../i18n/LanguageContext'

function HomePromos() {
  const { t } = useLanguage()
  return (
    <section className="mx-auto max-w-7xl" data-purpose="promo-banners">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-[#111116] to-[#070709] p-5 transition-all duration-300 hover:border-red-500/60 hover:shadow-xl hover:shadow-red-950/30">
          <div className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-[#d91528]/10 blur-2xl transition-all duration-500 group-hover:bg-[#d91528]/20" />
          <div className="relative z-10 space-y-2.5">
            <div className="inline-flex items-center space-x-1.5 rounded-full border border-red-800/40 bg-red-950/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400 shadow-sm">
              <span>{t('Deposit Bonus')}</span>
            </div>
            <h3 className="text-base font-bold tracking-wide text-white transition-colors group-hover:text-red-400">
              {t('Deposit $50 & Get $10')}
            </h3>
            <p className="text-xs leading-relaxed text-zinc-400">{t('Instant compensation on your first deposit')}</p>
          </div>
          <div className="relative z-10 mt-auto pt-4">
            <button
              type="button"
              className="group-hover:scale-105 inline-flex cursor-pointer items-center space-x-2 rounded-full bg-[#d91528] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-white shadow-md shadow-red-950/60 transition-all duration-200 hover:bg-[#bd1122] active:scale-90"
            >
              <span>{t('Claim Bonus')}</span>
              <i className="fa-solid fa-chevron-right text-[10px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#181820] via-[#111116] to-[#070709] p-5 transition-all duration-300 hover:border-white/30 hover:shadow-xl hover:shadow-black/50">
          <div className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:bg-white/10" />
          <div className="relative z-10 space-y-2.5">
            <div className="inline-flex items-center space-x-1.5 rounded-full border border-white/20 bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-300 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              <span>{t('Free Spins')}</span>
            </div>
            <h3 className="text-base font-bold tracking-wide text-white transition-colors group-hover:text-zinc-200">{t('20 Free Spins')}</h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              {t('Spin risk-free on selected titles with boosted multipliers.')}
            </p>
          </div>
          <div className="relative z-10 mt-auto pt-4">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center space-x-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-white transition-all duration-200 hover:bg-white/10 active:scale-90 group-hover:border-white/30"
            >
              <span>{t('Get Spins')}</span>
              <i className="fa-solid fa-chevron-right text-[10px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePromos
