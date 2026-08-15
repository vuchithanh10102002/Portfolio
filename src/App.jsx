import { useCallback, useEffect, useRef, useState } from 'react'
import About from './components/About'
import Header, { NAV_ITEMS } from './components/Header'
import Home from './components/Home'
import Portfolio from './components/Portfolio'
import Preloader from './components/Preloader'
import StyleSwitcher from './components/StyleSwitcher'
import useRevealer from './hooks/useRevealer'

const HOME_INDEX = 0
const ABOUT_INDEX = 1

export default function App() {
  /* `activeIndex` drives the nav highlight and updates on click; `visibleIndex`
     drives which page is mounted as current and lags behind until the revealer
     layers have covered the screen. */
  const [activeIndex, setActiveIndex] = useState(HOME_INDEX)
  const [visibleIndex, setVisibleIndex] = useState(HOME_INDEX)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [slideshowOpen, setSlideshowOpen] = useState(false)

  const [skin, setSkin] = useState('yellow')
  const [theme, setTheme] = useState('dark')
  const [direction, setDirection] = useState('top')

  const pageRefs = useRef([])
  const reveal = useRevealer()

  /* --- Body / html classes the original template toggled directly --- */

  useEffect(() => {
    document.documentElement.setAttribute('data-skin', skin)
  }, [skin])

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
    document.body.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    document.body.classList.toggle('home-page', visibleIndex === HOME_INDEX)
  }, [visibleIndex])

  const goTo = useCallback(
    (index, { fromMobile = false } = {}) => {
      if (fromMobile) {
        // Let the slide-out menu close behind the revealer, like menu.js did.
        setTimeout(() => setMobileMenuOpen(false), 500)
      }

      if (index === activeIndex) return

      setActiveIndex(index)
      reveal(direction, () => {
        setVisibleIndex(index)
        const page = pageRefs.current[index]
        if (page) page.scrollTop = 0
      })
    },
    [activeIndex, direction, reveal]
  )

  const pages = [
    <Home onAboutClick={() => goTo(ABOUT_INDEX)} />,
    <About />,
    <Portfolio onSlideshowToggle={setSlideshowOpen} />,
    /* <Contact /> and <Blog /> are hidden - see NAV_ITEMS in Header.jsx */
  ]

  return (
    <>
      <Preloader />

      <StyleSwitcher
        skin={skin}
        onSkinChange={setSkin}
        theme={theme}
        onThemeChange={setTheme}
        direction={direction}
        onDirectionChange={setDirection}
      />

      <Header
        currentIndex={activeIndex}
        onNavigate={goTo}
        hidden={slideshowOpen}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
      />

      <div className="pages">
        {NAV_ITEMS.map((item, index) => (
          <div
            key={item.id}
            id={item.id}
            ref={(el) => {
              pageRefs.current[index] = el
            }}
            className={`page${index === visibleIndex ? ' page--current' : ''}`}
          >
            {pages[index]}
          </div>
        ))}
      </div>
    </>
  )
}
