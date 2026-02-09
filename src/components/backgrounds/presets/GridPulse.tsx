import { useMemo } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'
import './GridPulse.css'

interface GridPulseProps {
  settings: BackgroundSettings
}

const GridPulse = ({ settings }: GridPulseProps) => {
  const animationDuration = 8 - (settings.speed / 100) * 5 // 3-8s
  const cols = 8 + Math.round((settings.density / 100) * 8) // 8-16
  const rows = 6 + Math.round((settings.density / 100) * 6) // 6-12

  const cells = useMemo(() => {
    const centerX = cols / 2
    const centerY = rows / 2
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)

    return Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => {
        const dx = c - centerX
        const dy = r - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const delay = (dist / maxDist) * animationDuration * 0.8
        return { r, c, delay }
      })
    ).flat()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols, rows])

  return (
    <div className="grid-pulse">
      <svg
        viewBox={`0 0 ${cols} ${rows}`}
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {cells.map((cell) => (
          <rect
            key={`${cell.r}-${cell.c}`}
            x={cell.c}
            y={cell.r}
            width={0.9}
            height={0.9}
            rx={0.1}
            fill="var(--primary)"
            className="grid-pulse-cell"
            style={{
              animationDuration: `${animationDuration}s`,
              animationDelay: `${cell.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default GridPulse
