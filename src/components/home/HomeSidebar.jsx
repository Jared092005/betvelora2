import { useState } from 'react'
import { Link } from 'react-router-dom'

import { homeCategories } from '../../config/navigation'
import { useBrands } from '../../hooks/useBrands'
import { useLanguage } from '../../i18n/LanguageContext'

function HomeSidebar() {
  const { t } = useLanguage()
  const { brands, loading } = useBrands(null)
  const [providerQuery, setProviderQuery] = useState('')
  const term = providerQuery.trim().toLowerCase()
  const visibleBrands = brands.filter((brand) => brand.name.toLowerCase().includes(term))

  return (
    <aside
      className="hidden w-60 shrink-0 flex-col justify-between overflow-y-auto border-r border-white/[0.08] bg-[#09090d]/80 backdrop-blur-md lg:flex xl:w-64"
      data-purpose="navigation-sidebar"
    >
      <div className="space-y-7 p-5">
        <div data-purpose="sidebar-categories">
          <h2 className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">{t('Categories')}</h2>
          <nav className="space-y-1">
            {homeCategories.map((category) => (
              <Link
                key={t(category.label)}
                to={category.to}
                className="group flex items-center rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.04] hover:text-white"
              >
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-transparent transition-colors duration-200 group-hover:bg-[#d91528]" />
                {t(category.label)}
              </Link>
            ))}
          </nav>
        </div>

        <div data-purpose="sidebar-providers">
          <div className="mb-3 flex items-center justify-between px-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">{t('Providers')}</h2>
            <span className="text-[10px] font-semibold text-red-500">
              All ({brands.length})
            </span>
          </div>

          <div className="relative mb-4 px-1">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-zinc-500">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
              </svg>
            </span>
            <input
              className="w-full rounded-lg border border-white/10 bg-[#121218] py-1.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 transition duration-150 focus:border-[#d91528] focus:outline-none focus:ring-1 focus:ring-[#d91528]"
              placeholder={t('Search...')}
              type="search"
              value={providerQuery}
              onChange={(event) => setProviderQuery(event.target.value)}
              aria-label="Buscar proveedor"
            />
          </div>

          <div className="space-y-1 px-1 pt-1">
            {loading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2.5 px-2 py-2">
                  <span className="h-4 w-10 animate-pulse rounded bg-white/[0.06]" />
                  <span className="h-2.5 flex-1 animate-pulse rounded bg-white/[0.04]" />
                </div>
              ))}

            {!loading && visibleBrands.length === 0 && (
              <p className="px-2 py-2 text-xs text-zinc-500">{t('No results found')}</p>
            )}

            {visibleBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/casino?brand=${brand.id}`}
                className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-white/[0.04]"
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    onError={(event) => {
                      if (brand.logoExternal && event.currentTarget.src !== brand.logoExternal) {
                        event.currentTarget.src = brand.logoExternal
                      }
                    }}
                    className="h-4 w-auto max-w-[56px] object-contain opacity-75 transition group-hover:opacity-100"
                  />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition-colors group-hover:bg-red-500" />
                )}
                <span className="truncate text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-white">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default HomeSidebar
