import type { BackgroundSettings } from '../backgroundPresets'

interface SolidColorProps {
  settings: BackgroundSettings
}

const SolidColor = ({ settings: _settings }: SolidColorProps) => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: 'var(--primary)',
    }} />
  )
}

export default SolidColor
