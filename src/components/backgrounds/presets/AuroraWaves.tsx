import type { BackgroundSettings } from '../backgroundPresets'
import './AuroraWaves.css'

interface AuroraWavesProps {
  settings: BackgroundSettings
}

const AuroraWaves = ({ settings }: AuroraWavesProps) => {
  const animationDuration = 12 - (settings.speed / 100) * 8 // 4-12s
  const waveOpacity = 0.15 + (settings.density / 100) * 0.25

  return (
    <div className="aurora-waves-container">
      <div
        className="aurora-wave aurora-wave-1"
        style={{
          animationDuration: `${animationDuration}s`,
          opacity: waveOpacity,
        }}
      />
      <div
        className="aurora-wave aurora-wave-2"
        style={{
          animationDuration: `${animationDuration * 1.3}s`,
          opacity: waveOpacity * 0.8,
        }}
      />
      <div
        className="aurora-wave aurora-wave-3"
        style={{
          animationDuration: `${animationDuration * 1.7}s`,
          opacity: waveOpacity * 0.6,
        }}
      />
    </div>
  )
}

export default AuroraWaves
