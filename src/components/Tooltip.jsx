import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const TooltipContext = createContext(null)

/**
 * One floating tooltip for the whole page. Charts call `useTooltip()` and
 * spread the returned handlers onto any mark — the hover layer every
 * HTML chart is expected to ship.
 */
export function TooltipProvider({ children }) {
  const [tip, setTip] = useState(null)

  const bind = useCallback(
    (content) => ({
      onPointerEnter: (e) => setTip({ content, x: e.clientX, y: e.clientY }),
      onPointerMove: (e) => setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t)),
      onPointerLeave: () => setTip(null),
      onFocus: (e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setTip({ content, x: r.left + r.width / 2, y: r.top })
      },
      onBlur: () => setTip(null),
    }),
    [],
  )

  const value = useMemo(() => ({ bind }), [bind])

  return (
    <TooltipContext.Provider value={value}>
      {children}
      {tip && <TooltipLayer {...tip} />}
    </TooltipContext.Provider>
  )
}

function TooltipLayer({ content, x, y }) {
  // Flip toward the viewport when the pointer nears the right or top edge.
  const width = 240
  const left = x + width + 22 > window.innerWidth ? Math.max(8, x - width - 14) : x + 14
  const top = y < 40 ? y + 24 : y - 12
  return (
    <div className="tip" role="status" aria-live="polite" style={{ left, top }}>
      {content}
    </div>
  )
}

export const useTooltip = () => useContext(TooltipContext).bind
