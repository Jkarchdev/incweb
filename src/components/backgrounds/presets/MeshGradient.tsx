import type { BackgroundSettings } from '../backgroundPresets'
import './MeshGradient.css'

interface MeshGradientProps {
  settings: BackgroundSettings
}

const MeshGradient = ({ settings }: MeshGradientProps) => {
  const noiseOpacity = 0.03 + (settings.density / 100) * 0.06
  const spread = 55 + (settings.density / 100) * 25 // 55-80%

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div
        className="mesh-gradient-layer"
        style={{
          position: 'absolute',
          inset: '-10%',
          background: [
            `radial-gradient(ellipse at 15% 15%, var(--primary) 0%, transparent ${spread}%)`,
            `radial-gradient(ellipse at 85% 25%, var(--border) 0%, transparent ${spread}%)`,
            `radial-gradient(ellipse at 50% 85%, var(--muted) 0%, transparent ${spread}%)`,
            `radial-gradient(ellipse at 25% 65%, var(--primary) 0%, transparent ${spread - 10}%)`,
            `radial-gradient(ellipse at 75% 70%, var(--border) 0%, transparent ${spread - 15}%)`,
          ].join(', '),
          opacity: 0.65,
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
    </div>
  )
}

export default MeshGradient
