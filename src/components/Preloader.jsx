import { useEffect, useState } from 'react'

/** Vertical line wipe that splits open once the page is ready (custom.js). */
export default function Preloader() {
  const [done, setDone] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const start = () => setDone(true)

    // `load` may already have fired by the time React mounts.
    if (document.readyState === 'complete') {
      const t = setTimeout(start, 800)
      return () => clearTimeout(t)
    }

    let timer
    const onLoad = () => {
      timer = setTimeout(start, 800)
    }
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!done) return
    // finishanimation is 500ms with a 500ms delay.
    const t = setTimeout(() => setRemoved(true), 1100)
    return () => clearTimeout(t)
  }, [done])

  if (removed) return null

  return (
    <div id="preloader" className={done ? 'preloaded' : ''}>
      <div className="line" />
    </div>
  )
}
