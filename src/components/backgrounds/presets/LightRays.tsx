import { useMemo } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'
import './LightRays.css'

interface LightRaysProps {
  settings: BackgroundSettings
}

const LightRays = ({ settings }: LightRaysProps) => {
  const animationDuration = 25 - (settings.speed / 100) * 18 // 7-25s
  const count = 4 + Math.round((settings.density / 100) * 4) // 4-8

  const rays = useMemo(() => {
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--border)', 'var(--muted)']
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 60 - 10 // spread beams across ~60deg from corner
      const width = 8 + Math.random() * 15 // beam width in degrees
      return {
        angle,
        width,
        color: colors[i % colors.length],
        delay: Math.random() * -15,
        dur: animationDuration + Math.random() * 8,
        opacity: 0.5 + Math.random() * 0.3,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return (
    <div className="light-rays">
      {rays.map((ray, i) => {
        // Create wedge from top-left corner using clip-path polygon
        const startAngle = ray.angle
        const endAngle = ray.angle + ray.width
        const toRad = (deg: number) => (deg * Math.PI) / 180
        // Project points far out from origin (0,0)
        const len = 200 // percentage units, ensures coverage
        const x1 = Math.cos(toRad(startAngle)) * len
        const y1 = Math.sin(toRad(startAngle)) * len
        const x2 = Math.cos(toRad(endAngle)) * len
        const y2 = Math.sin(toRad(endAngle)) * len

        return (
          <div
            key={i}
            className={`light-ray light-ray--${i % 3}`}
            style={{
              clipPath: `polygon(0% 0%, ${x1}% ${y1}%, ${x2}% ${y2}%)`,
              background: `linear-gradient(${startAngle + ray.width / 2}deg, ${ray.color} 0%, transparent 80%)`,
              opacity: ray.opacity,
              animationDuration: `${ray.dur}s`,
              animationDelay: `${ray.delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}

export default LightRays
