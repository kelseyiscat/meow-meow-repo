import { useCallback, useEffect, useState } from 'react'

/**
 * useState that survives a reload. Every read and write is guarded — private
 * windows, cleared site data, and storage-blocking browsers all throw here,
 * and the page has to render correctly with no stored value.
 */
export function useLocalState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      if (value === null || value === undefined) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable — keep the in-memory value */
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initial), [initial])
  return [value, setValue, reset]
}
