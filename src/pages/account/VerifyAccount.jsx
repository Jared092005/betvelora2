import { useState } from 'react'

import { useLanguage } from '../../i18n/LanguageContext'

const documentTypes = [
  'Identity document (ID / Passport)',
  'Proof of address (utility bill / bank statement)',
  'Selfie with ID',
]

const documentCards = [
  {
    title: 'Identity document (ID / Passport)',
    description: 'Front and back, all four corners visible.',
  },
  {
    title: 'Proof of address (utility bill / bank statement)',
    description: 'Issued within the last 3 months.',
  },
  {
    title: 'Selfie with ID',
    description: 'Your face and the document in the same photo.',
  },
]

function VerifyAccount() {
  const { t } = useLanguage()
  const [documentType, setDocumentType] = useState(documentTypes[0])
  const [fileName, setFileName] = useState('')

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-black uppercase tracking-wide text-white">{t('Account verification (KYC)')}</h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-zinc-400">
            <i className="fa-regular fa-circle-xmark text-[10px]" aria-hidden="true" />
            {t('Unverified')}
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {t('To comply with regulations, we need to verify your identity. Please upload the following documents.')}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/[0.08] bg-[#0f1015] p-5 lg:col-span-2 lg:p-7">
          <h2 className="text-base font-bold text-white">{t('Required documents')}</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {documentCards.map((document) => (
              <div
                key={document.title}
                className="flex min-h-[180px] flex-col justify-between rounded-xl border border-white/[0.08] bg-[#14151b] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="max-w-[70%] text-sm font-bold leading-snug text-white">{t(document.title)}</h3>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold text-zinc-400">
                    {t('Not uploaded')}
                  </span>
                </div>
                <p className="mt-8 text-xs leading-relaxed text-zinc-500">{t(document.description)}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-white/[0.08] bg-[#0f1015] p-5 lg:p-7">
          <h2 className="text-base font-bold text-white">{t('Upload a document')}</h2>

          <form onSubmit={(event) => event.preventDefault()} className="mt-5 space-y-5">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {t('Document type')}
              </span>
              <select
                value={documentType}
                onChange={(event) => setDocumentType(event.target.value)}
                className="w-full cursor-pointer rounded-xl border border-white/[0.09] bg-[#090a0d] px-3.5 py-2.5 text-sm text-white focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914]"
              >
                {documentTypes.map((type) => (
                  <option key={type} value={type}>
                    {t(type)}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">{t('File')}</span>
              <label className="flex min-h-[46px] cursor-pointer items-center overflow-hidden rounded-xl border border-white/[0.09] bg-[#090a0d]">
                <span className="flex h-full items-center bg-[#e50914] px-4 py-3 text-xs font-bold text-white">
                  {t('Choose file')}
                </span>
                <span className="truncate px-3 text-xs text-zinc-400">{fileName || t('No file selected')}</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="sr-only"
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
                />
              </label>
              <p className="mt-2 text-[11px] text-zinc-500">{t('JPG, PNG or PDF, up to 5 MB.')}</p>
            </div>

            <button
              type="submit"
              className="account-btn-primary w-full"
            >
              <i className="fa-solid fa-arrow-up-from-bracket" aria-hidden="true" />
              {t('Upload document')}
            </button>

            <p className="text-[11px] leading-relaxed text-zinc-500">
              {t('Documents are reviewed manually and may take up to 72 hours.')}
            </p>
          </form>
        </aside>
      </div>
    </div>
  )
}

export default VerifyAccount
