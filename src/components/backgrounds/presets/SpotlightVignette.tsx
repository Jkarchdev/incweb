import type { BackgroundSettings } from '../backgroundPresets'

interface SpotlightVignetteProps {
  settings: BackgroundSettings
}

const SpotlightVignette = ({ settings }: SpotlightVignetteProps) => {
  const spread = 50 + (settings.density / 100) * 25 // 50-75%

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Main spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse ${spread}% ${spread}% at 50% 38%, var(--bg) 0%, var(--border) 55%, var(--text) 100%)`,
          opacity: 0.55,
        }}
      />
      {/* Warm color wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 30% 50%, var(--primary) 0%, transparent 70%)`,
          opacity: 0.15,
        }}
      />
      {/* Cool accent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 80% at 75% 60%, var(--border) 0%, transparent 65%)`,
          opacity: 0.12,
        }}
      />
    </div>
  )
}

export default SpotlightVignette
