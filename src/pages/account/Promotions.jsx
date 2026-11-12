import HomePromos from '../../components/home/HomePromos'
import { useLanguage } from '../../i18n/LanguageContext'

function AccountPromotions() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black uppercase tracking-wide text-white">{t('Promotions')}</h1>
      <HomePromos />
    </div>
  )
}

export default AccountPromotions
