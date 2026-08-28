import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { ARCHETYPE } from '../data'

export function Archetype() {
  const [ref, shown] = useReveal({ threshold: 0.2 })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ARCHETYPE.share)
    } catch {
      /* clipboard blocked (insecure origin, denied permission) — still confirm */
    }
    setCopied(true)
  }

  return (
    <section className="blk">
      <div ref={ref} className={`arche rv${shown ? ' in' : ''}`}>
        <div className="arche-k">Your 2026 archetype</div>
        <h2 className="arche-t">
          {ARCHETYPE.title[0]}
          <br />
          {ARCHETYPE.title[1]}
        </h2>
        <p className="arche-d">{ARCHETYPE.blurb}</p>
        <div className="arche-tags">
          {ARCHETYPE.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
        <button className="cta" type="button" onClick={copy}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 16V4M8 8l4-4 4 4M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" />
          </svg>
          {copied ? 'Copied to clipboard' : 'Copy your wrapped'}
        </button>
      </div>
    </section>
  )
}
