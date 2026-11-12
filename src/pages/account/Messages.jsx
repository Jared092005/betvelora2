import { useLanguage } from '../../i18n/LanguageContext'

function AccountMessages() {
  const { t } = useLanguage()

  return (
    <>
      <div className="border-b border-white/10 pb-6">
        <h1 className="flex items-center gap-3 text-2xl font-black uppercase tracking-wide text-white">
          <i className="fa-regular fa-envelope text-[#d91528]" aria-hidden="true" />
          {t('Messages').toUpperCase()}
        </h1>
      </div>

      <section className="relative mt-8 flex min-h-[460px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f] p-8 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(217,21,40,0.18),transparent_55%)]" />

        <div className="relative z-10 flex flex-col items-center">
          <i className="fa-solid fa-arrow-down-long mb-2 text-lg text-red-600/80" aria-hidden="true" />
          <i className="fa-regular fa-envelope text-6xl text-[#a78bfa]" aria-hidden="true" />
          <h2 className="mt-6 text-3xl font-bold text-white">{t('No messages')}</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            {t('No messages at the moment. Account notifications, exclusive bonuses and casino news will appear here.')}
          </p>
        </div>
      </section>
    </>
  )
}

export default AccountMessages
