import { useCallback, useEffect } from 'react'

/**
 * Minimal replacement for the masonry.pkgd + imagesLoaded pair the template used.
 *
 * Items are absolutely positioned by CSS; this places each one in whichever
 * column is currently shortest (same shortest-column algorithm as Masonry) so
 * the DOM order — which the lightbox indexes into — is preserved.
 *
 * @param {React.RefObject<HTMLElement>} listRef the <ul> holding the items
 */
export default function useMasonry(listRef) {
  const layout = useCallback(() => {
    const list = listRef.current
    if (!list) return

    const items = Array.from(list.children)
    if (!items.length) return

    const colWidth = items[0].offsetWidth
    if (!colWidth) return

    const cols = Math.max(1, Math.round(list.clientWidth / colWidth))
    const colHeights = new Array(cols).fill(0)

    items.forEach((item) => {
      let shortest = 0
      for (let i = 1; i < cols; i += 1) {
        if (colHeights[i] < colHeights[shortest]) shortest = i
      }
      item.style.transform = `translate(${shortest * colWidth}px, ${colHeights[shortest]}px)`
      colHeights[shortest] += item.offsetHeight
    })

    list.style.height = `${Math.max(...colHeights)}px`
  }, [listRef])

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    layout()

    // Images usually have no intrinsic height yet on first paint.
    const images = Array.from(list.querySelectorAll('img'))
    const pending = images.filter((img) => !img.complete)
    pending.forEach((img) => {
      img.addEventListener('load', layout)
      img.addEventListener('error', layout)
    })

    const observer = new ResizeObserver(layout)
    observer.observe(list)

    return () => {
      pending.forEach((img) => {
        img.removeEventListener('load', layout)
        img.removeEventListener('error', layout)
      })
      observer.disconnect()
    }
  }, [listRef, layout])

  return layout
}
