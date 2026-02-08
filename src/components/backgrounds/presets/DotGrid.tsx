import type { BackgroundSettings } from '../backgroundPresets'

interface DotGridProps {
  settings: BackgroundSettings
}

const DotGrid = ({ settings }: DotGridProps) => {
  const dotOpacity = 0.15 + (settings.density / 100) * 0.25
  const dotSize = 1 + (settings.density / 100) * 2 // 1-3px
  const spacing = 40 - (settings.density / 100) * 20 // 20-40px

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={dotSize}
              fill="var(--primary)"
              opacity={dotOpacity}
            />
          </pattern>
          <radialGradient id="dot-fade">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.5" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-fade)"
          opacity="0.1"
        />
      </svg>
    </div>
  )
}

export default DotGrid
