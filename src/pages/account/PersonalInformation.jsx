import { useLanguage } from '../../i18n/LanguageContext'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#0b0b0f] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-red-500/60 focus:outline-none focus:ring-1 focus:ring-red-500/30'

function PersonalInformation() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black uppercase tracking-wide text-white">
          <i className="fa-regular fa-user text-[#e50914]" aria-hidden="true" />
          {t('Personal information')}
        </h1>
        <p className="mt-3 text-sm text-zinc-400">{t('Keep your account details up to date.')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/[0.08] bg-[#0f1015] p-6">
          <h2 className="flex items-center gap-3 border-b border-white/[0.06] pb-4 text-base font-bold text-white">
            <i className="fa-solid fa-lock text-zinc-300" aria-hidden="true" />
            {t('User profile')}
          </h2>

          <form onSubmit={(event) => event.preventDefault()} className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Username')}
              </span>
              <input type="text" defaultValue="user" className={inputClass} />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">Email</span>
              <input type="email" placeholder="email@email.com" className={inputClass} />
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  {t('First name')}
                </span>
                <input type="text" defaultValue="user" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  {t('Last name')}
                </span>
                <input type="text" className={inputClass} />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Current password')}
              </span>
              <input type="password" autoComplete="current-password" className={inputClass} />
              <span className="mt-1 block text-[11px] text-zinc-500">
                {t('Only needed if you are changing your password.')}
              </span>
            </label>

            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  {t('New password')}
                </span>
                <input type="password" autoComplete="new-password" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  {t('Confirm new password')}
                </span>
                <input type="password" autoComplete="new-password" className={inputClass} />
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="account-btn-primary"
              >
                <i className="fa-regular fa-floppy-disk" aria-hidden="true" />
                {t('Save')}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#0f1015] p-6">
          <h2 className="flex items-center gap-3 border-b border-white/[0.06] pb-4 text-base font-bold text-white">
            <i className="fa-regular fa-user text-zinc-300" aria-hidden="true" />
            {t('Personal data')}
          </h2>

          <form onSubmit={(event) => event.preventDefault()} className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Birth date')}
              </span>
              <input type="date" className={inputClass} />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Phone')}
              </span>
              <div className="flex gap-2">
                <div className="w-28 shrink-0">
                  <select className={`${inputClass} cursor-pointer`} defaultValue="+34">
                    <option value="+34">+34 (ES)</option>
                    <option value="+52">+52 (MX)</option>
                    <option value="+54">+54 (AR)</option>
                    <option value="+57">+57 (CO)</option>
                    <option value="+56">+56 (CL)</option>
                    <option value="+51">+51 (PE)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                  </select>
                </div>
                <input type="tel" className={inputClass} />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Country')}
              </span>
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

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('City')}
              </span>
              <input type="text" className={inputClass} />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Address')}
              </span>
              <input type="text" className={inputClass} />
            </label>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="account-btn-primary"
              >
                <i className="fa-regular fa-floppy-disk" aria-hidden="true" />
                {t('Save')}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default PersonalInformation
