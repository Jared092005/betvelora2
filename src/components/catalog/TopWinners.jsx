import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

function TopWinners({ items = [] }) {
  const { t } = useLanguage()
  const scrollRef = useRef(null)
  const [paused, setPaused] = useState(false)

  const scrollPage = (direction) => {
    const element = scrollRef.current
    if (!element) return

    const atStart = element.scrollLeft <= 8
    const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 8

    if (direction === 'next') {
      if (atEnd) element.scrollTo({ left: 0, behavior: 'smooth' })
      else element.scrollBy({ left: element.clientWidth, behavior: 'smooth' })
    } else if (atStart) {
      element.scrollTo({ left: element.scrollWidth, behavior: 'smooth' })
    } else {
      element.scrollBy({ left: -element.clientWidth, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (paused || items.length === 0) return undefined

    const interval = setInterval(() => {
      const element = scrollRef.current
      if (!element) return

      const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 8
      if (atEnd) element.scrollTo({ left: 0, behavior: 'smooth' })
      else element.scrollBy({ left: element.clientWidth, behavior: 'smooth' })
    }, 4000)

    return () => clearInterval(interval)
  }, [paused, items.length])

  if (items.length === 0) return null

  return (
    <section
      className="mb-10"
      data-purpose="top-winners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-black tracking-tight text-white md:text-2xl">{t('Top Winners of the Month')}</h2>
          <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-600/20 px-2 py-0.5 text-[10px] font-bold text-red-500">
            <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
            {t('LIVE')}
          </span>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollPage('prev')}
            aria-label="Ganadores anteriores"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-red-500/50 hover:text-white"
          >
            <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollPage('next')}
            aria-label="Siguientes ganadores"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-red-500/50 hover:text-white"
          >
            <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="-mt-2 mb-4 text-xs text-zinc-400">{t('Latest big wins distributed to lucky players')}</p>

      <div className="relative">
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2"
        >
          {items.map((winner) => (
          <div
            key={`${winner.id}-${winner.game}`}
            className="group w-[85%] shrink-0 snap-start cursor-pointer rounded-2xl border border-white/[0.08] bg-[#121318] p-4 shadow-lg transition-all duration-200 hover:border-red-600/40 hover:shadow-red-950/20 sm:w-[48%] lg:w-[32%] xl:w-[23.5%]"
          >
            <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center space-x-1.5">
                <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium text-zinc-300">{winner.id}</span>
              </span>
              <span className="text-[11px] text-zinc-400">{winner.time}</span>
            </div>

            <div className="mb-3 text-lg font-black tracking-tight text-white">€ {winner.amount}</div>

            <div className="flex items-center space-x-3 border-t border-white/[0.05] pt-2">
              <img
                src={winner.image}
                alt={winner.game}
                className="h-9 w-9 rounded-lg border border-white/10 object-cover transition-transform group-hover:scale-105"
              />
              <div>
                <div className="text-xs font-bold text-white transition-colors group-hover:text-red-400">{winner.game}</div>
                <div className="text-[11px] text-zinc-400">{winner.provider}</div>
              </div>
            </div>
          </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TopWinners
