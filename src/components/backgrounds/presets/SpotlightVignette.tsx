import type { BackgroundSettings } from '../backgroundPresets'

interface SpotlightVignetteProps {
  settings: BackgroundSettings
}

const SpotlightVignette = ({ settings }: SpotlightVignetteProps) => {
  const spread = 50 + (settings.density / 100) * 20 // 50-70% radius

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse ${spread}% ${spread}% at 50% 40%, var(--bg) 0%, var(--border) 60%, var(--text) 100%)`,
        opacity: 0.25,
      }}
    />
  )
}

export default SpotlightVignette
