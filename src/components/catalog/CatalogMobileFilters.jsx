import { useSearchParams } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'
import DraggableCarousel from '../ui/DraggableCarousel'

const baseChip =
  'snap-start shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition-all active:scale-95'
const idleChip = 'border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white'
const activeChip = 'border-transparent bg-[#d91528] font-semibold text-white shadow-md shadow-red-950/50'

function CatalogMobileFilters({ filters = [], activeFilterKey, brands = [], activeBrand }) {
  const { t } = useLanguage()
  const [, setSearchParams] = useSearchParams()

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
    <section className="mb-6 space-y-5 lg:hidden" data-purpose="catalog-mobile-filters">
      <div>
        <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          {t('Categories')}
        </h2>
        <DraggableCarousel>
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => updateParam('filter', item.key)}
              className={`${baseChip} ${activeFilterKey === item.key ? activeChip : idleChip}`}
            >
              {t(item.label)}
            </button>
          ))}
        </DraggableCarousel>
      </div>

      {brands.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              {t('Providers')}
            </h2>
            <button
              type="button"
              onClick={() => updateParam('brand', '')}
              className="cursor-pointer text-[10px] font-semibold text-red-500"
            >
              All ({brands.length})
            </button>
          </div>
          <DraggableCarousel>
            {brands.map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => updateParam('brand', activeBrand === String(brand.id) ? '' : String(brand.id))}
                className={`${baseChip} ${activeBrand === String(brand.id) ? activeChip : idleChip}`}
              >
                {brand.name}
              </button>
            ))}
          </DraggableCarousel>
        </div>
      )}
    </section>
  )
}

export default CatalogMobileFilters
