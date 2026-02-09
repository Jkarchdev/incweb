import { useMemo } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'
import './BokehLights.css'

interface BokehLightsProps {
  settings: BackgroundSettings
}

const BokehLights = ({ settings }: BokehLightsProps) => {
  const animationDuration = 20 - (settings.speed / 100) * 14 // 6-20s
  const count = 8 + Math.round((settings.density / 100) * 7) // 8-15

  const circles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = 150 + Math.random() * 200 // 150-350px
      const x = Math.random() * 100
      const y = Math.random() * 100
      const delay = Math.random() * -20
      const dur = animationDuration + Math.random() * 8
      const opacity = 0.6 + Math.random() * 0.2 // 0.6-0.8
      const colors = ['var(--primary)', 'var(--secondary)', 'var(--border)', 'var(--muted)']
      const color = colors[i % colors.length]
      return { size, x, y, delay, dur, opacity, color, idx: i }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return (
    <div className="bokeh-lights">
      {circles.map((c) => (
        <div
          key={c.idx}
          className={`bokeh-circle bokeh-circle--${c.idx % 4}`}
          style={{
            width: c.size,
            height: c.size,
            left: `${c.x}%`,
            top: `${c.y}%`,
            opacity: c.opacity,
            background: `radial-gradient(circle, ${c.color} 0%, transparent 70%)`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default BokehLights
