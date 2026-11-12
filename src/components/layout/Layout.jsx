import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-velora-black">
      <ScrollToTop />
      <Header />
      <div className="flex min-w-0 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
