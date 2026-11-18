import { useEffect, useState } from 'react'

function SplashScreen({ children }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let delayTimer
    let maxTimer
    let done = false

    const hide = () => {
      if (done) return
      done = true
      setHidden(true)
    }

    const startedAt = Date.now()
    const afterLoad = () => {
      delayTimer = window.setTimeout(hide, Math.max(0, 700 - (Date.now() - startedAt)))
    }

    if (document.readyState === 'complete') {
      afterLoad()
    } else {
      window.addEventListener('load', afterLoad, { once: true })
    }

    maxTimer = window.setTimeout(hide, 3500)

    return () => {
      window.removeEventListener('load', afterLoad)
      window.clearTimeout(delayTimer)
      window.clearTimeout(maxTimer)
    }
  }, [])

  return (
    <>
      {children}

      <div
        className={`app-splash ${hidden ? 'app-splash--hidden' : ''}`}
        aria-hidden={hidden}
      >
        <div className="app-splash__content">
          <img src="/logoBetVelora.png" alt="Velora Casino" className="app-splash__logo" />
          <span className="app-splash__ring" />
        </div>
      </div>
    </>
  )
}

export default SplashScreen
