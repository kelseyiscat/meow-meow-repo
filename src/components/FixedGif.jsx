import { useCallback, useEffect, useState } from 'react'

/**
 * Collect every `meow_*.gif` sitting in the repo root at build time.
 * Vite turns each match into a URL string we can drop straight into <img src>.
 * Order doesn't matter, so we just take the values as they come.
 */
const GIFS = Object.values(
  import.meta.glob('/meow_*.gif', { eager: true, query: '?url', import: 'default' }),
)

/**
 * FixedGif
 *
 * A tiny keyboard-driven GIF slideshow pinned to the bottom-right corner of the
 * viewport. It uses `position: fixed`, so it stays put while the page scrolls.
 * Only one GIF is shown at a time.
 *
 * Keyboard controls:
 *   ArrowLeft  / ArrowRight  — cycle to the previous / next GIF (wraps around)
 *   Escape                   — dismiss (hide) the component
 *   Shift + Escape           — bring it back
 *
 * Props:
 *   size     (number)  Width in px (height auto-scales). Default: 120.
 *   offset   (number)  Distance in px from the bottom and right edges. Default: 20.
 *   zIndex   (number)  Stacking order. Default: 1000.
 *   style    (object)  Extra inline styles merged onto the container.
 *   className(string)  Optional extra class name.
 */
export function FixedGif({ size = 120, offset = 20, zIndex = 1000, style, className = '' }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % GIFS.length)
  }, [])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + GIFS.length) % GIFS.length)
  }, [])

  useEffect(() => {
    if (GIFS.length === 0) return

    const onKeyDown = (e) => {
      // Shift+Escape brings the component back, plain Escape dismisses it.
      if (e.key === 'Escape') {
        setVisible(e.shiftKey)
        return
      }

      // Arrow navigation only makes sense while the slideshow is showing.
      if (!visible) return

      if (e.key === 'ArrowRight') {
        next()
      } else if (e.key === 'ArrowLeft') {
        prev()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [visible, next, prev])

  if (!visible || GIFS.length === 0) return null

  return (
    <img
      src={GIFS[index]}
      alt={`animation ${index + 1} of ${GIFS.length}`}
      className={`fixed-gif ${className}`.trim()}
      style={{
        position: 'fixed',
        right: offset,
        bottom: offset,
        width: size,
        height: 'auto',
        zIndex,
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}

export default FixedGif
