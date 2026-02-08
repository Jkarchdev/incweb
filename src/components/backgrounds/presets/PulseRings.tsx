import type { BackgroundSettings } from '../backgroundPresets'
import './PulseRings.css'

interface PulseRingsProps {
  settings: BackgroundSettings
}

const PulseRings = ({ settings }: PulseRingsProps) => {
  const animationDuration = 4 - (settings.speed / 100) * 2 // 2-4s
  const ringCount = 4 + Math.floor((settings.density / 100) * 4) // 4-8 rings

  return (
    <div className="pulse-rings-container">
      {Array.from({ length: ringCount }).map((_, i) => (
        <div
          key={i}
          className="pulse-ring"
          style={{
            animationDuration: `${animationDuration}s`,
            animationDelay: `${-(i * animationDuration) / ringCount}s`,
          }}
        />
      ))}
    </div>
  )
}

export default PulseRings
