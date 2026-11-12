import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

const inputClass =
  'w-full rounded-xl border border-white/[0.09] bg-[#090a0d] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 transition-all focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914]'

const quickAmounts = [10, 25, 50, 100, 250, 500]

const methods = ['Alp-Pay (Transferencia local LatAm)', 'Alp-Pay (Tarjeta 3DS)', 'Bank Transfer']

function Withdrawal() {
  const { t } = useLanguage()
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState(methods[0])

  const numericAmount = Number(amount)
  const formattedAmount = amount && numericAmount > 0 ? `€ ${numericAmount.toFixed(2)}` : '—'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wide text-white">{t('Withdrawal')}</h1>
        <div className="mt-4 inline-flex w-fit max-w-full flex-col items-start gap-3 rounded-2xl border border-white/10 bg-[#111215] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 lg:flex-row lg:items-center lg:rounded-full lg:py-2">
          <div className="flex min-w-0 flex-col lg:flex-row lg:items-center lg:gap-2">
            <span>{t('Withdrawable balance')}</span>
            <span className="mt-0.5 whitespace-nowrap text-sm font-extrabold tracking-wide text-[#e50914] lg:mt-0">0.00 €</span>
          </div>
          <span className="hidden text-zinc-600 lg:block">|</span>
          <div className="flex min-w-0 flex-col lg:flex-row lg:items-center lg:gap-2">
            <span>{t('Total')}</span>
            <span className="mt-0.5 whitespace-nowrap text-sm font-extrabold tracking-wide text-zinc-200 lg:mt-0">0.00 €</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/[0.08] bg-[#0f1015] p-5 lg:col-span-2 lg:p-7">
          <form onSubmit={(event) => event.preventDefault()} className="space-y-7">
            <div>
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Withdrawal Method')}
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {methods.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMethod(item)}
                    className={
                      method === item
                        ? 'rounded-xl border border-[#e50914]/70 bg-[#15161c] px-3 py-3 text-xs font-bold text-white'
                        : 'rounded-xl border border-white/[0.08] bg-[#16171f] px-3 py-3 text-xs font-semibold text-zinc-400 transition hover:text-white'
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <label htmlFor="withdrawal-amount" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  {t('Amount')}
                </label>
                <span className="text-[11px] font-medium text-zinc-500">Min: 10 € · Max: 1,000 €</span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(String(value))}
                    className={
                      numericAmount === value
                        ? 'rounded-lg border border-[#e50914]/60 bg-[#e50914]/10 px-3 py-2 text-xs font-semibold text-[#e50914]'
                        : 'rounded-lg border border-white/[0.08] bg-[#16171f] px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-[#20222c]'
                    }
                  >
                    {value} €
                  </button>
                ))}
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-zinc-300">{t('Amount')} (€)</span>
                <div className="relative">
                  <input
                    id="withdrawal-amount"
                    type="number"
                    min="10"
                    max="1000"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder={t('Amount')}
                    className={`${inputClass} pr-10`}
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-zinc-400">€</span>
                </div>
              </label>
            </div>

            <div className="space-y-4 border-t border-white/[0.06] pt-3">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{t('Your Details')}</h2>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('Country')} *</span>
                <select className={`${inputClass} cursor-pointer`} defaultValue="">
                  <option value="" disabled>
                    {t('Select country')}
                  </option>
                  <option value="ES">España</option>
                  <option value="MX">México</option>
                  <option value="AR">Argentina</option>
                  <option value="CO">Colombia</option>
                  <option value="CL">Chile</option>
                  <option value="PE">Perú</option>
                  <option value="OTHER">{t('Other')}</option>
                </select>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('First name')} *</span>
                  <input type="text" placeholder={t('First name')} className={inputClass} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('Last name')} *</span>
                  <input type="text" placeholder={t('Last name')} className={inputClass} />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('Document type')}</span>
                <select className={`${inputClass} cursor-pointer`} defaultValue="">
                  <option value="" disabled>
                    —
                  </option>
                  <option value="dni">DNI</option>
                  <option value="passport">{t('Passport')}</option>
                  <option value="id">{t('Identity card')}</option>
                  <option value="other">{t('Other')}</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('Document number')}</span>
                <input type="text" className={inputClass} />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('Bank')}</span>
                <input type="text" placeholder={t('Type the bank name or code')} className={inputClass} />
                <span className="mt-1 block text-[11px] text-zinc-500">{t('Choose your bank or type the code')}</span>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('Account number')} *</span>
                <input type="text" placeholder={t('CBU/CVU or IBAN')} className={inputClass} />
                <span className="mt-1 block text-[11px] text-zinc-500">{t('Enter the account number for your bank.')}</span>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('Type of account')}</span>
                <select className={`${inputClass} cursor-pointer`} defaultValue="">
                  <option value="" disabled>
                    —
                  </option>
                  <option value="savings">{t('Savings')}</option>
                  <option value="checking">{t('Checking')}</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-zinc-300">Email</span>
                <input type="email" placeholder="ejemplo@correo.com" className={inputClass} />
              </label>

              <div>
                <span className="mb-1 block text-xs font-semibold text-zinc-300">{t('Phone')}</span>
                <div className="flex gap-2">
                  <div className="w-28 shrink-0">
                    <select className={`${inputClass} cursor-pointer`} defaultValue="+34">
                      <option value="+34">+34 (ES)</option>
                      <option value="+52">+52 (MX)</option>
                      <option value="+54">+54 (AR)</option>
                      <option value="+57">+57 (CO)</option>
                      <option value="+56">+56 (CL)</option>
                      <option value="+1">+1 (US)</option>
                    </select>
                  </div>
                  <input type="tel" placeholder="612345678" className={inputClass} />
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-white/[0.07] bg-[#090a0d] p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-400">{t('Amount')}</span>
                <span className="font-semibold tracking-wide text-white">{formattedAmount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-400">{t('Fee')}</span>
                <span className="text-[11px] font-medium text-zinc-400">{t('Not applied by this method')}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white">{t('You receive')}</span>
                <span className="text-base font-black tracking-wide text-[#e50914]">{formattedAmount}</span>
              </div>
            </div>

            <button
              type="submit"
              className="account-btn-primary w-full"
            >
              {t('Request withdrawal')}
            </button>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0f1015] p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
              <i className="fa-regular fa-clock text-[#e50914]" aria-hidden="true" />
              {t('Processing time')}
            </h3>
            <dl className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.05] py-1">
                <dt className="font-medium text-zinc-400">{t('Method')}</dt>
                <dd className="max-w-[160px] text-right font-semibold text-zinc-200">{method}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.05] py-1">
                <dt className="font-medium text-zinc-400">{t('Processing time')}</dt>
                <dd className="max-w-[150px] text-right font-semibold text-zinc-100">{t('Confirmed by the operator')}</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-white/[0.07] pt-5">
              <p className="text-xs leading-relaxed text-zinc-400">
                {t('Withdrawals are reviewed before they are paid out. Contact support if you need help.')}
              </p>
              <button
                type="button"
                className="mt-4 block w-full rounded-full border border-[#e50914]/80 bg-[#e50914]/[0.04] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#e50914] transition hover:bg-[#e50914]/[0.12] hover:text-white"
              >
                {t('Contact support')}
              </button>
              <p className="mt-5 text-[11px] leading-normal text-zinc-500">
                {t('Account verification may be required before a withdrawal is approved. Limits are set by the operator.')}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f1015]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-7">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t('Last withdrawals')}</h3>
          <Link to="/account/transactions" className="text-xs font-semibold tracking-wide text-[#e50914] hover:underline">
            {t('See all')}
          </Link>
        </div>
        <div className="p-8 text-center sm:p-10">
          <p className="text-xs font-medium text-zinc-500 sm:text-sm">{t('No transactions yet')}</p>
        </div>
      </section>
    </div>
  )
}

export default Withdrawal
