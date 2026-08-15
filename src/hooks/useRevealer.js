import { useCallback, useEffect, useRef } from 'react'

const NMB_LAYERS = 3
/** Total length of anim-effect-3. Must stay in sync with pages.css. */
const ANIM_DURATION = 1500
/** The template swaps pages part-way through, while the layers cover the screen. */
const SWAP_DELAY = 750

/**
 * Port of the template's js/main.js Revealer.
 *
 * Builds a fixed 3-layer stack, rotates/sizes it so the layers sweep in from the
 * requested direction, then runs the CSS animation. `onSwap` fires mid-animation
 * (while the screen is covered) so the caller can change the visible page.
 */
export default function useRevealer() {
  const wrapperRef = useRef(null)
  const animatingRef = useRef(false)
  const timersRef = useRef([])

  useEffect(() => {
    const wrapper = document.createElement('div')
    wrapper.className = 'revealer'
    wrapper.innerHTML = Array.from(
      { length: NMB_LAYERS },
      () => '<div class="revealer__layer"></div>'
    ).join('')
    document.body.appendChild(wrapper)
    wrapperRef.current = wrapper

    const timers = timersRef
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
      wrapper.remove()
      wrapperRef.current = null
    }
  }, [])

  const reveal = useCallback((direction, onSwap) => {
    const wrapper = wrapperRef.current
    if (!wrapper || animatingRef.current) return false
    animatingRef.current = true

    const winW = window.innerWidth
    const winH = window.innerHeight
    let width
    let height
    let transform

    if (direction.startsWith('corner')) {
      const diagonal = Math.sqrt(winW ** 2 + winH ** 2)
      width = height = `${diagonal}px`
      const angle = {
        cornertopleft: 135,
        cornertopright: -135,
        cornerbottomleft: 45,
        cornerbottomright: -45,
      }[direction]
      transform = `translate3d(-50%,-50%,0) rotate3d(0,0,1,${angle}deg) translate3d(0,${diagonal}px,0)`
    } else if (direction === 'left' || direction === 'right') {
      width = '100vh'
      height = '100vw'
      transform = `translate3d(-50%,-50%,0) rotate3d(0,0,1,${
        direction === 'left' ? 90 : -90
      }deg) translate3d(0,100%,0)`
    } else {
      width = '100vw'
      height = '100vh'
      transform = direction === 'top' ? 'rotate3d(0,0,1,180deg)' : 'none'
    }

    wrapper.style.width = width
    wrapper.style.height = height
    wrapper.style.transform = transform
    wrapper.style.opacity = 1

    const directionClass = `revealer--${direction}`
    wrapper.classList.add(directionClass, 'revealer--animate')

    // The three layers finish at different times; a single timer keyed to the
    // animation length is simpler than counting animationend events and behaves
    // identically because all layers share the 1.5s duration.
    timersRef.current = [
      setTimeout(() => onSwap?.(), SWAP_DELAY),
      setTimeout(() => {
        wrapper.classList.remove(directionClass, 'revealer--animate')
        wrapper.style.opacity = 0
        animatingRef.current = false
      }, ANIM_DURATION),
    ]

    return true
  }, [])

  return reveal
}
