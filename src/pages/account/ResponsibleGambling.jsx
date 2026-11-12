import { useState } from 'react'

import { useLanguage } from '../../i18n/LanguageContext'

const limitTypes = [
  'Daily deposit limit',
  'Weekly deposit limit',
  'Monthly deposit limit',
  'Session time limit',
  'Loss limit',
]

function ResponsibleGambling() {
  const { t } = useLanguage()
  const [limitType, setLimitType] = useState(limitTypes[0])
  const [amount, setAmount] = useState('')
  const [limits, setLimits] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()

    const numericAmount = Number(amount)
    if (!numericAmount || numericAmount <= 0) return

    setLimits((current) => [...current, { type: limitType, amount: numericAmount }])
    setAmount('')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wide text-white">{t('Responsible Gambling Limits')}</h1>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-zinc-400">
          {t(
            'Set limits to control your spending and playing time. Decreasing a limit takes effect immediately; increases require a 24-hour waiting period.',
          )}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex min-h-[300px] flex-col rounded-2xl border border-white/[0.08] bg-[#0f1015] p-6">
          <h2 className="text-base font-bold text-white">{t('Your active limits')}</h2>

          {limits.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-zinc-500">{t('You have no limits set yet.')}</p>
            </div>
          ) : (
            <div className="mt-5 space-y-2">
              {limits.map((limit, index) => (
                <div
                  key={`${limit.type}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#14151b] px-4 py-3 text-xs"
                >
                  <span className="text-zinc-300">{t(limit.type)}</span>
                  <span className="font-bold text-white">{limit.amount.toFixed(2)} €</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#0f1015] p-6">
          <h2 className="text-base font-bold text-white">{t('Add a new limit')}</h2>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Limit type')}
              </span>
              <select
                value={limitType}
                onChange={(event) => setLimitType(event.target.value)}
                className="w-full cursor-pointer rounded-xl border border-white/[0.09] bg-[#090a0d] px-3.5 py-3 text-sm text-white focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914]"
              >
                {limitTypes.map((type) => (
                  <option key={type} value={type}>
                    {t(type)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">{t('Amount')}</span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder={t('e.g. 50 €')}
                className="w-full rounded-xl border border-white/[0.09] bg-[#090a0d] px-3.5 py-3 text-sm text-white placeholder-zinc-500 focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914]"
              />
            </label>

            <p className="text-xs leading-relaxed text-zinc-500">
              {t('Lowering a limit applies right away. Raising it only applies after 24 hours.')}
            </p>

            <button
              type="submit"
              className="account-btn-primary w-full"
            >
              {t('Save limit')}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default ResponsibleGambling
