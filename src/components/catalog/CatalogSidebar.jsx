import { useSearchParams } from 'react-router-dom'

import { useBrands } from '../../hooks/useBrands'
import { useLanguage } from '../../i18n/LanguageContext'
import { useLibrary } from '../../library/LibraryContext'

function CatalogSidebar({
  title,
  filters = [],
  groups = [],
  brandCategory,
  brands: brandsProp,
  providersTitle = 'By Provider',
}) {
  const { t } = useLanguage()
  const { favorites } = useLibrary()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || filters[0]?.key || 'all'
  const activeBrand = searchParams.get('brand') || ''
  const hasBrandsProp = Array.isArray(brandsProp)
  const { brands: fetchedBrands } = useBrands(brandCategory, {
    enabled: Boolean(brandCategory) && !hasBrandsProp,
  })
  const brands = hasBrandsProp ? brandsProp : fetchedBrands

  const updateParam = (key, value) => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (value) next.set(key, value)
        else next.delete(key)
        if (key === 'filter') next.delete('q')
        if (key === 'brand' && value) {
          const currentFilter = next.get('filter')
          if (currentFilter === 'favorites' || currentFilter === 'my') {
            next.delete('filter')
            next.delete('q')
          }
        }
        return next
      },
      { replace: true },
    )
  }

  return (
    <aside
      className="hidden w-60 shrink-0 border-r border-white/[0.08] bg-[#0d0d12] p-5 lg:sticky lg:top-16 lg:block lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto xl:w-64"
      data-purpose="catalog-sidebar"
    >
      <h2 className="mb-4 text-base font-bold tracking-wide text-white">{t(title)}</h2>

      <div className="mb-8 space-y-1">
        {filters.map((item) => {
          const active = item.key === activeFilter

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => updateParam('filter', item.key)}
              className={
                active
                  ? 'flex w-full cursor-pointer items-center justify-between rounded-full bg-[#d91528] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-950/50 transition-all'
                  : 'flex w-full cursor-pointer items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-white/[0.04] hover:text-white'
              }
            >
              <span>{t(item.label)}</span>
              {item.key === 'favorites' && favorites.length > 0 && (
                <span className="text-[11px] font-semibold">{favorites.length}</span>
              )}
            </button>
          )
        })}
      </div>

      {groups.map((group) => (
        <div key={group.title} className="mb-8">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            {t(group.title)}
          </div>
          <div className="space-y-1 text-sm">
            {group.items.map((item) => {
              const active = item.filter ? item.filter === activeFilter : false

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => updateParam('filter', item.filter)}
                  className={
                    active
                      ? 'flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.03] px-3 py-2 text-left transition-all hover:bg-white/[0.06]'
                      : 'flex w-full cursor-pointer items-center justify-between rounded-xl border border-transparent px-3 py-2 text-left text-zinc-300 transition-all hover:bg-white/[0.04] hover:text-white'
                  }
                >
                  <span className={active ? 'text-xs font-bold tracking-wider text-white' : 'text-xs font-medium'}>
                    {t(item.label)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {brands.length > 0 && (
        <div className="mb-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              {t(providersTitle)}
            </span>
            <span className="text-[10px] font-semibold text-zinc-500">{brands.length}</span>
          </div>

          <button
            type="button"
            onClick={() => updateParam('brand', '')}
            className={
              activeBrand
                ? 'mb-2 flex w-full cursor-pointer items-center justify-between rounded-xl border border-transparent px-3 py-2 text-left text-xs font-medium text-zinc-300 transition-all hover:bg-white/[0.04] hover:text-white'
                : 'mb-2 flex w-full cursor-pointer items-center justify-between rounded-xl border border-red-600/40 bg-gradient-to-r from-red-600/20 to-transparent px-3 py-2 text-left text-xs font-medium text-white shadow-inner'
            }
          >
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-cubes text-red-500" aria-hidden="true" />
              {t('All providers')}
            </span>
            {!activeBrand && <i className="fa-solid fa-check text-[10px] text-red-400" aria-hidden="true" />}
          </button>

          <div className="space-y-1 text-xs font-semibold text-zinc-400">
            {brands.map((brand) => {
              const active = String(brand.id) === activeBrand

              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => updateParam('brand', active ? '' : String(brand.id))}
                  className={
                    active
                      ? 'group flex w-full cursor-pointer items-center justify-between rounded-lg bg-white/[0.06] px-3 py-2 text-white transition-all'
                      : 'group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-white/5 hover:text-white'
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
                </button>
              )
            })}
          </div>
        </div>
      )}
    </aside>
  )
}

export default CatalogSidebar
