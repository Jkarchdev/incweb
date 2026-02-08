import type { BackgroundSettings } from '../backgroundPresets'
import './AuroraDrift.css'

interface AuroraDriftProps {
  settings: BackgroundSettings
}

const RIBBON_GRADIENTS = [
  (a: number) => `linear-gradient(${a}deg, var(--primary), transparent 40%, var(--border) 70%, transparent)`,
  (a: number) => `linear-gradient(${a}deg, var(--border), transparent 35%, var(--primary) 65%, transparent)`,
  (a: number) => `linear-gradient(${a}deg, var(--muted), transparent 45%, var(--primary) 75%, transparent)`,
  (a: number) => `linear-gradient(${a}deg, var(--primary), var(--border) 50%, transparent)`,
  (a: number) => `linear-gradient(${a}deg, var(--border), var(--muted) 40%, var(--primary) 80%, transparent)`,
]

const AuroraDrift = ({ settings }: AuroraDriftProps) => {
  const baseDuration = 22 - (settings.speed / 100) * 14 // 22s to 8s
  const ribbonCount = 3 + Math.round((settings.density / 100) * 2) // 3-5

  const ribbons = Array.from({ length: ribbonCount }, (_, i) => {
    const angle = 110 + i * 25
    const duration = baseDuration + i * 3
    return (
      <div
        key={i}
        className={`aurora-ribbon aurora-ribbon--${i}`}
        style={{
          animationDuration: `${duration}s`,
          background: RIBBON_GRADIENTS[i % RIBBON_GRADIENTS.length](angle),
          top: `${5 + i * 18}%`,
          height: `${45 - i * 5}%`,
        }}
      />
    )
  })

  return <div className="aurora-drift">{ribbons}</div>
}

export default AuroraDrift
