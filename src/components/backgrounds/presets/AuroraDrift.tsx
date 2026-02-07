import type { BackgroundSettings } from '../backgroundPresets'
import './AuroraDrift.css'

interface AuroraDriftProps {
  settings: BackgroundSettings
}

const AuroraDrift = ({ settings }: AuroraDriftProps) => {
  const duration = 20 - (settings.speed / 100) * 15 // 20s to 5s
  const ribbonCount = 3 + Math.round((settings.density / 100) * 2) // 3-5 ribbons

  const ribbons = Array.from({ length: ribbonCount }, (_, i) => {
    const slideDelay = -(i * (duration / ribbonCount))
    const waveDelay = -(i * 2.5)
    const pulseDelay = -(i * 1.8)
    const angle = 120 + i * 20
    return (
      <div
        key={i}
        className="aurora-ribbon"
        style={{
          animationDuration: `${duration}s, ${duration * 1.3 + i * 2}s, ${duration * 0.8 + i}s`,
          animationDelay: `${slideDelay}s, ${waveDelay}s, ${pulseDelay}s`,
          background: `linear-gradient(${angle}deg, var(--primary), var(--border), var(--bg))`,
          top: `${10 + i * 20}%`,
          height: `${40 - i * 5}%`,
        }}
      />
    )
  })

  return <div className="aurora-drift">{ribbons}</div>
}

export default AuroraDrift
