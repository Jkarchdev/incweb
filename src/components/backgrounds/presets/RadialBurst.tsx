import type { BackgroundSettings } from '../backgroundPresets'

interface RadialBurstProps {
  settings: BackgroundSettings
}

const RadialBurst = ({ settings }: RadialBurstProps) => {
  const lineOpacity = 0.08 + (settings.density / 100) * 0.15
  const lineCount = 20 + Math.floor((settings.density / 100) * 40) // 20-60 lines

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <linearGradient id="burst-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={lineOpacity} />
            <stop offset="50%" stopColor="var(--secondary)" stopOpacity={lineOpacity * 1.5} />
            <stop offset="100%" stopColor="var(--border)" stopOpacity={lineOpacity * 0.5} />
          </linearGradient>
        </defs>
        {Array.from({ length: lineCount }).map((_, i) => {
          const angle = (360 / lineCount) * i
          const x = 500 + Math.cos((angle * Math.PI) / 180) * 700
          const y = 500 + Math.sin((angle * Math.PI) / 180) * 700
          return (
            <line
              key={i}
              x1="500"
              y1="500"
              x2={x}
              y2={y}
              stroke="url(#burst-gradient)"
              strokeWidth={0.5 + (settings.density / 100) * 1.5}
              opacity={lineOpacity}
            />
          )
        })}
        <circle
          cx="500"
          cy="500"
          r="100"
          fill="var(--primary)"
          opacity={lineOpacity * 2}
        />
      </svg>
    </div>
  )
}

export default RadialBurst
