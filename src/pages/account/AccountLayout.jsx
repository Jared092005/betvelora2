import { Outlet } from 'react-router-dom'

import AccountSidebar from './AccountSidebar'

function AccountLayout() {
  return (
    <div className="account-press flex min-w-0 flex-1 flex-col bg-casino-pattern lg:flex-row">
      <AccountSidebar />

      <main className="min-w-0 flex-1 px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AccountLayout
