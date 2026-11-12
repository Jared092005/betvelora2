import { Link, useLocation, useSearchParams } from 'react-router-dom'

import { sidebarNav } from '../../config/navigation'
import { useBrands } from '../../hooks/useBrands'
import { useGames } from '../../hooks/useGames'
import { useLanguage } from '../../i18n/LanguageContext'

const itemClass = (active) =>
  [
    'group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-all',
    active
      ? 'bg-gradient-to-r from-[#d91528] to-[#b30e1f] font-semibold text-white shadow-glow-sm'
      : 'font-medium text-zinc-300 hover:bg-[#15151e] hover:text-white',
  ].join(' ')

const iconClass = (active) =>
  active ? 'text-white' : 'text-zinc-400 transition-colors group-hover:text-red-500'

function CasinoSidebar({ brands: providedBrands }) {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || 'all'
  const activeBrand = searchParams.get('brand') || ''
  const hasBrandsProp = Array.isArray(providedBrands)
  const { brands: fetchedBrands } = useBrands('casino', { enabled: !hasBrandsProp })
  const brands = hasBrandsProp ? providedBrands : fetchedBrands
  const { total } = useGames({ category: 'casino', perPage: 1 })
  const items = sidebarNav.map((item) =>
    item.label === 'Lobby' ? { ...item, to: '/casino' } : item,
  )

  const providerLink = (brandId) => {
    const params = new URLSearchParams()
    const localFilter = activeFilter === 'favorites' || activeFilter === 'my'
    if (activeFilter && activeFilter !== 'all' && !(brandId && localFilter)) {
      params.set('filter', activeFilter)
    }
    if (brandId) params.set('brand', String(brandId))
    const query = params.toString()
    return query ? `/casino?${query}` : '/casino'
  }

  return (
    <aside
      className="hidden w-60 shrink-0 border-r border-white/[0.08] bg-[#0d0d12] p-4 lg:sticky lg:top-16 lg:block lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto xl:w-64"
      data-purpose="casino-sidebar"
    >
      <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">{t('Casino')}</p>

      <nav className="space-y-1">
        {items.map((item) => {
          const target = new URL(item.to, 'http://velora.local')
          const targetFilter = target.searchParams.get('filter') || 'all'
          const active =
            pathname === target.pathname &&
            (item.label === 'Lobby' ? !activeBrand && activeFilter === 'all' : targetFilter === activeFilter && !activeBrand)

          return (
            <Link key={item.label} to={item.to} className={itemClass(active)}>
              <span className="flex items-center gap-3">
                <i className={`${item.icon} ${iconClass(active)}`} aria-hidden="true" />
                <span>{t(item.label)}</span>
              </span>

              {item.label === 'Lobby' && total > 0 && (
                <span
                  className={
                    active
                      ? 'rounded-md border border-red-400/30 bg-red-950/60 px-2 py-0.5 font-mono text-xs text-white'
                      : 'rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white'
                  }
                >
                  {total.toLocaleString('en-US')}
                </span>
              )}
              {item.tag && (
                <span className="rounded border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-red-400">
                  {item.tag}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 border-t border-white/10 pt-6" data-purpose="provider-menu">
        <div className="mb-2 flex items-center justify-between px-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">{t('By Provider')}</span>
          <span className="text-[10px] font-semibold text-zinc-500">{brands.length}</span>
        </div>

        <Link
          to={providerLink()}
          className={
            activeBrand
              ? 'mb-3 flex w-full items-center justify-between rounded-xl border border-transparent px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all hover:bg-white/5 hover:text-white'
              : 'mb-3 flex w-full items-center justify-between rounded-xl border border-red-600/40 bg-gradient-to-r from-red-600/20 to-transparent px-3.5 py-2 text-xs font-medium text-white shadow-inner'
          }
        >
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-cubes text-red-500" aria-hidden="true" />
            {t('All providers')}
          </span>
          {!activeBrand && <i className="fa-solid fa-check text-[10px] text-red-400" aria-hidden="true" />}
        </Link>

        <div className="space-y-1 text-xs font-semibold text-zinc-400">
          {brands.map((brand) => {
            const active = String(brand.id) === activeBrand

            return (
              <Link
                key={brand.id}
                to={providerLink(brand.id)}
                className={
                  active
                    ? 'group flex w-full items-center justify-between rounded-lg bg-white/[0.06] px-3 py-2 text-white transition-all'
                    : 'group flex w-full items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-white/5 hover:text-white'
                }
              >
                <span className="flex items-center gap-2.5 tracking-wide">
                  <span
                    className={
                      active
                        ? 'h-2 w-2 rounded-full bg-red-500'
                        : 'h-2 w-2 rounded-full bg-slate-600 transition-colors group-hover:bg-red-500'
                    }
                  />
                  {brand.name}
                </span>
                {active && <i className="fa-solid fa-check text-[10px] text-red-400" aria-hidden="true" />}
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export default CasinoSidebar
