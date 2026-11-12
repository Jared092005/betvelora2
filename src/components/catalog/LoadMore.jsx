import { useLanguage } from '../../i18n/LanguageContext'

function LoadMore({ label, hasMore = false, loading = false, onLoadMore }) {
  const { t } = useLanguage()

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      {label && <p className="text-xs text-zinc-400">{t(label)}</p>}
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={loading}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-[#121218] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-red-500/50 hover:bg-white/[0.06] active:scale-95 disabled:cursor-wait disabled:opacity-60"
        >
          <i
            className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-arrows-rotate'} text-[#d91528]`}
            aria-hidden="true"
          />
          {loading ? t('Loading...') : t('Load more games')}
        </button>
      )}
    </div>
  )
}

export default LoadMore
