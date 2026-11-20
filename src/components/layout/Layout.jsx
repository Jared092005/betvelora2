import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import MobileNavDrawer from './MobileNavDrawer'
import ScrollToTop from './ScrollToTop'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-velora-black pb-16 lg:pb-0">
      <ScrollToTop />
      <Header />
      <div className="flex min-w-0 flex-1">
        <Outlet />
      </div>
      <Footer />
      <MobileNavDrawer />
    </div>
  )
}

export default Layout
