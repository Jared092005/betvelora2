import { Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Game from './pages/Game'
import AccountLayout from './pages/account/AccountLayout'
import AccountMessages from './pages/account/Messages'
import Dashboard from './pages/account/Dashboard'
import Deposit from './pages/account/Deposit'
import PersonalInformation from './pages/account/PersonalInformation'
import AccountPromotions from './pages/account/Promotions'
import ResponsibleGambling from './pages/account/ResponsibleGambling'
import Transactions from './pages/account/Transactions'
import VerifyAccount from './pages/account/VerifyAccount'
import Withdrawal from './pages/account/Withdrawal'
import Casino from './pages/Casino'
import CasinoLive from './pages/CasinoLive'
import CrashGames from './pages/CrashGames'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Poker from './pages/Poker'
import Promotions from './pages/Promotions'
import Register from './pages/Register'
import Virtual from './pages/Virtual'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="casino" element={<Casino />} />
        <Route path="casino-live" element={<CasinoLive />} />
        <Route path="crash-games" element={<CrashGames />} />
        <Route path="account" element={<AccountLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdrawal" element={<Withdrawal />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="promotions" element={<AccountPromotions />} />
          <Route path="verify" element={<VerifyAccount />} />
          <Route path="responsible-gambling" element={<ResponsibleGambling />} />
          <Route path="messages" element={<AccountMessages />} />
          <Route path="personal-information" element={<PersonalInformation />} />
        </Route>
        <Route path="poker" element={<Poker />} />
        <Route path="virtual" element={<Virtual />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="games/:id" element={<Game />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  )
}

export default App
