import { useMemo } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'
import './NeonGlow.css'

interface NeonGlowProps {
  settings: BackgroundSettings
}

type ShapeType = 'circle' | 'line' | 'arc'

interface GlowShape {
  type: ShapeType
  x: number
  y: number
  size: number
  color: string
  delay: number
  dur: number
  rotation: number
}

const NeonGlow = ({ settings }: NeonGlowProps) => {
  const animationDuration = 18 - (settings.speed / 100) * 12 // 6-18s
  const count = 5 + Math.round((settings.density / 100) * 5) // 5-10

  const shapes = useMemo(() => {
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--border)', 'var(--muted)']
    const types: ShapeType[] = ['circle', 'line', 'arc']
    return Array.from({ length: count }, (_, i): GlowShape => ({
      type: types[i % 3],
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 60 + Math.random() * 120,
      color: colors[i % colors.length],
      delay: Math.random() * -15,
      dur: animationDuration + Math.random() * 6,
      rotation: Math.random() * 360,
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  return (
    <div className="neon-glow">
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`neon-shape neon-shape--${s.type} neon-shape--drift-${i % 3}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.type === 'line' ? s.size * 1.5 : s.size,
            height: s.type === 'line' ? 3 : s.size,
            borderColor: s.color,
            boxShadow: `0 0 20px ${s.color}, 0 0 40px ${s.color}, 0 0 80px ${s.color}`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default NeonGlow
