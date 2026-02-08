import type { BackgroundSettings } from '../backgroundPresets'

interface NebulaProps {
  settings: BackgroundSettings
}

const Nebula = ({ settings }: NebulaProps) => {
  const cloudOpacity = 0.15 + (settings.density / 100) * 0.25
  const cloudSpread = 50 + (settings.density / 100) * 30 // 50-80%
  const noiseOpacity = 0.05 + (settings.density / 100) * 0.1

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Nebula clouds */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          background: [
            `radial-gradient(ellipse at 20% 30%, var(--primary) 0%, transparent ${cloudSpread}%)`,
            `radial-gradient(ellipse at 70% 40%, var(--secondary) 0%, transparent ${cloudSpread - 10}%)`,
            `radial-gradient(ellipse at 40% 70%, var(--border) 0%, transparent ${cloudSpread - 5}%)`,
            `radial-gradient(ellipse at 80% 80%, var(--primary) 0%, transparent ${cloudSpread - 15}%)`,
            `radial-gradient(ellipse at 10% 85%, var(--muted) 0%, transparent ${cloudSpread - 20}%)`,
          ].join(', '),
          opacity: cloudOpacity,
          filter: 'blur(60px)',
        }}
      />

      {/* Stars (small dots) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: cloudOpacity * 0.8,
        }}
      >
        <defs>
          <filter id="nebula-glow">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>
        {Array.from({ length: 100 }).map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() * 1.5 + 0.5}
            fill="white"
            opacity={Math.random() * 0.6 + 0.2}
            filter="url(#nebula-glow)"
          />
        ))}
      </svg>

      {/* Noise texture overlay */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: noiseOpacity,
        }}
      >
        <filter id="nebula-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nebula-noise)" />
      </svg>
    </div>
  )
}

export default Nebula
