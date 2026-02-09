import type { BackgroundSettings } from '../backgroundPresets'
import './GradientWash.css'

interface GradientWashProps {
  settings: BackgroundSettings
}

const GradientWash = ({ settings }: GradientWashProps) => {
  const animationDuration = 20 - (settings.speed / 100) * 14 // 6-20s

  return (
    <div className="gradient-wash">
      <div
        className="gradient-wash-layer"
        style={{
          animationDuration: `${animationDuration}s`,
        }}
      />
    </div>
  )
}

export default GradientWash
