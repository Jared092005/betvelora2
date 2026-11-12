import { Link } from 'react-router-dom'

import { homeCategories } from '../../config/navigation'
import { useBrands } from '../../hooks/useBrands'
import { useLanguage } from '../../i18n/LanguageContext'
import DraggableCarousel from '../ui/DraggableCarousel'

const chipClass =
  'snap-start shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white active:scale-95'

function HomeMobileFilters() {
  const { t } = useLanguage()
  const { brands } = useBrands(null)

  return (
    <section className="space-y-5 lg:hidden" data-purpose="home-mobile-filters">
      <div>
        <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          {t('Categories')}
        </h2>
        <DraggableCarousel>
          {homeCategories.map((category) => (
            <Link key={category.label} to={category.to} className={chipClass}>
              {t(category.label)}
            </Link>
          ))}
        </DraggableCarousel>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            {t('Providers')}
          </h2>
          <span className="text-[10px] font-semibold text-red-500">All ({brands.length})</span>
        </div>
        <DraggableCarousel>
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/casino?brand=${brand.id}`}
              className={chipClass}
            >
              {brand.name}
            </Link>
          ))}
        </DraggableCarousel>
      </div>
    </section>
  )
}

export default HomeMobileFilters
