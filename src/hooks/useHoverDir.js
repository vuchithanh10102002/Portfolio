import { useEffect } from 'react'

const SPEED = 300
const EASING = 'ease'

/** 0 top, 1 right, 2 bottom, 3 left — which edge the cursor crossed. */
function getDirection(el, clientX, clientY) {
  const rect = el.getBoundingClientRect()
  const w = rect.width
  const h = rect.height
  const x = (clientX - rect.left - w / 2) * (w > h ? h / w : 1)
  const y = (clientY - rect.top - h / 2) * (h > w ? w / h : 1)
  return Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4
}

const OFFSCREEN = [
  { top: '-100%', left: '0' }, // from top
  { top: '0', left: '100%' }, // from right
  { top: '100%', left: '0' }, // from bottom
  { top: '0', left: '-100%' }, // from left
]

/**
 * Port of jquery.hoverdir: slides the caption panel in from whichever edge the
 * pointer entered, and back out towards whichever edge it left by.
 *
 * @param {React.RefObject<HTMLElement>} containerRef element containing the figures
 * @param {string} figureSelector figures to attach the effect to
 */
export default function useHoverDir(containerRef, figureSelector = 'figure') {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // The template only wires this up on desktop; the panel is hidden below 992px.
    if (window.innerWidth < 992) return

    const figures = Array.from(container.querySelectorAll(figureSelector))
    const cleanups = []

    figures.forEach((figure) => {
      const panel = figure.querySelector('div')
      if (!panel) return

      const place = (dir) => {
        const { top, left } = OFFSCREEN[dir]
        panel.style.transition = 'none'
        panel.style.top = top
        panel.style.left = left
        // Force a reflow so the browser doesn't collapse the two style writes.
        void panel.offsetWidth
        panel.style.transition = `top ${SPEED}ms ${EASING}, left ${SPEED}ms ${EASING}`
      }

      const onEnter = (ev) => {
        place(getDirection(figure, ev.clientX, ev.clientY))
        panel.style.top = '0'
        panel.style.left = '0'
      }

      const onLeave = (ev) => {
        const { top, left } = OFFSCREEN[getDirection(figure, ev.clientX, ev.clientY)]
        panel.style.transition = `top ${SPEED}ms ${EASING}, left ${SPEED}ms ${EASING}`
        panel.style.top = top
        panel.style.left = left
      }

      figure.addEventListener('mouseenter', onEnter)
      figure.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        figure.removeEventListener('mouseenter', onEnter)
        figure.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [containerRef, figureSelector])
}
