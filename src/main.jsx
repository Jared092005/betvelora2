import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext'
import { LibraryProvider } from './library/LibraryContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <LibraryProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </LibraryProvider>
    </LanguageProvider>
  </StrictMode>,
)
