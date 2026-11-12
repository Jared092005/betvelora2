import { NavLink } from 'react-router-dom'

import { useLanguage } from '../../i18n/LanguageContext'

const links = [
  { to: '/account', end: true, label: 'Dashboard', icon: 'fa-solid fa-table-columns' },
  { to: '/account/deposit', label: 'Deposit', icon: 'fa-solid fa-circle-plus' },
  { to: '/account/withdrawal', label: 'Withdrawal', icon: 'fa-solid fa-arrow-up-from-bracket' },
  { to: '/account/transactions', label: 'Transactions', icon: 'fa-solid fa-arrow-right-arrow-left' },
  { to: '/account/promotions', label: 'Promotions', icon: 'fa-solid fa-gift' },
  { to: '/account/verify', label: 'Verify account', icon: 'fa-solid fa-shield-halved' },
  { to: '/account/responsible-gambling', label: 'Responsible gambling', icon: 'fa-solid fa-shield-heart' },
  { to: '/account/messages', label: 'Messages', icon: 'fa-regular fa-envelope' },
  { to: '/account/personal-information', label: 'Personal information', icon: 'fa-regular fa-user' },
]

function AccountSidebar() {
  const { t } = useLanguage()

  return (
    <aside className="w-full shrink-0 border-b border-white/10 bg-[#0d0d10] p-3 lg:w-64 lg:border-b-0 lg:border-r lg:p-4">
      <nav className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                'flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all',
                isActive
                  ? 'border-red-500/40 bg-[#18181d] text-white'
                  : 'border-transparent text-zinc-400 hover:bg-white/5 hover:text-white',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <i className={`${item.icon} w-4 text-center ${isActive ? 'text-[#e50914]' : 'text-zinc-500'}`} aria-hidden="true" />
                <span>{t(item.label)}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AccountSidebar
