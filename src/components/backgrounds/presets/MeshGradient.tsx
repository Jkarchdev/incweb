import type { BackgroundSettings } from '../backgroundPresets'

interface MeshGradientProps {
  settings: BackgroundSettings
}

const MeshGradient = ({ settings }: MeshGradientProps) => {
  const noiseOpacity = 0.03 + (settings.density / 100) * 0.05
  // Density-responsive gradient positions
  const spread = 50 + (settings.density / 100) * 20 // 50-70% spread

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div
        className="mesh-gradient-layer"
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            `radial-gradient(ellipse at 20% 20%, var(--primary) 0%, transparent ${spread}%)`,
            `radial-gradient(ellipse at 80% 30%, var(--border) 0%, transparent ${spread}%)`,
            `radial-gradient(ellipse at 50% 80%, var(--muted) 0%, transparent ${spread}%)`,
            `radial-gradient(ellipse at 30% 60%, var(--primary) 0%, transparent ${spread - 10}%)`,
          ].join(', '),
          opacity: 0.3,
          animation: 'mesh-shift 30s ease-in-out infinite',
        }}
      />
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: noiseOpacity }}
      >
        <filter id="mesh-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#mesh-noise)" />
      </svg>
      <style>{`
        @keyframes mesh-shift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(1%, -1%) scale(1.01); }
          50% { transform: translate(-1%, 1%) scale(1); }
          75% { transform: translate(0.5%, 0.5%) scale(1.01); }
        }
      `}</style>
    </div>
  )
}

export default MeshGradient
