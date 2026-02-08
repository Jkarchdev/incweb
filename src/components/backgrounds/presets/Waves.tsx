import type { BackgroundSettings } from '../backgroundPresets'
import './Waves.css'

interface WavesProps {
  settings: BackgroundSettings
}

const Waves = ({ settings }: WavesProps) => {
  const animationDuration = 20 - (settings.speed / 100) * 15 // 5-20s
  const waveOpacity = 0.15 + (settings.density / 100) * 0.25

  return (
    <div className="waves-container">
      <svg
        className="waves-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={waveOpacity} />
            <stop offset="50%" stopColor="var(--secondary)" stopOpacity={waveOpacity * 0.7} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={waveOpacity} />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--secondary)" stopOpacity={waveOpacity * 0.6} />
            <stop offset="100%" stopColor="var(--border)" stopOpacity={waveOpacity * 0.5} />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={waveOpacity * 0.4} />
            <stop offset="100%" stopColor="var(--muted)" stopOpacity={waveOpacity * 0.3} />
          </linearGradient>
        </defs>

        <path
          className="wave wave-1"
          style={{ animationDuration: `${animationDuration}s` }}
          fill="url(#wave-gradient-1)"
          d="M0,100 C300,150 600,50 900,100 C1050,125 1200,75 1200,75 L1200,300 L0,300 Z"
        />
        <path
          className="wave wave-2"
          style={{ animationDuration: `${animationDuration * 1.3}s` }}
          fill="url(#wave-gradient-2)"
          d="M0,150 C300,100 600,180 900,140 C1050,120 1200,160 1200,160 L1200,300 L0,300 Z"
        />
        <path
          className="wave wave-3"
          style={{ animationDuration: `${animationDuration * 1.7}s` }}
          fill="url(#wave-gradient-3)"
          d="M0,200 C300,180 600,220 900,200 C1050,190 1200,210 1200,210 L1200,300 L0,300 Z"
        />
      </svg>
    </div>
  )
}

export default Waves
