import type { BackgroundSettings } from '../backgroundPresets'
import './Spiral.css'

interface SpiralProps {
  settings: BackgroundSettings
}

const Spiral = ({ settings }: SpiralProps) => {
  const animationDuration = 20 - (settings.speed / 100) * 15 // 5-20s
  const armCount = 3 + Math.floor((settings.density / 100) * 3) // 3-6 arms

  return (
    <div className="spiral-container">
      <svg
        className="spiral-svg"
        viewBox="0 0 200 200"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        <defs>
          <radialGradient id="spiral-gradient">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--border)" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {Array.from({ length: armCount }).map((_, i) => {
          const angle = (360 / armCount) * i
          const path = `M 100 100 Q ${100 + 80 * Math.cos((angle * Math.PI) / 180)} ${100 + 80 * Math.sin((angle * Math.PI) / 180)}, ${100 + 150 * Math.cos(((angle + 90) * Math.PI) / 180)} ${100 + 150 * Math.sin(((angle + 90) * Math.PI) / 180)}`

          return (
            <path
              key={i}
              d={path}
              fill="none"
              stroke="url(#spiral-gradient)"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.5"
            />
          )
        })}

        <circle
          cx="100"
          cy="100"
          r="15"
          fill="var(--primary)"
          opacity="0.4"
        />
      </svg>
    </div>
  )
}

export default Spiral
