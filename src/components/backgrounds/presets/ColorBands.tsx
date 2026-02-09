import type { BackgroundSettings } from '../backgroundPresets'
import './ColorBands.css'

interface ColorBandsProps {
  settings: BackgroundSettings
}

const ColorBands = ({ settings }: ColorBandsProps) => {
  const animationDuration = 15 - (settings.speed / 100) * 10 // 5-15s
  const stripeSize = 80 - (settings.density / 100) * 40 // 40-80px stripe width

  return (
    <div className="color-bands">
      <div
        className="color-bands-layer"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            var(--primary) 0px,
            var(--primary) ${stripeSize}px,
            transparent ${stripeSize}px,
            transparent ${stripeSize * 2}px,
            var(--secondary) ${stripeSize * 2}px,
            var(--secondary) ${stripeSize * 3}px,
            transparent ${stripeSize * 3}px,
            transparent ${stripeSize * 4}px
          )`,
          backgroundSize: `${stripeSize * 4 * 1.414}px ${stripeSize * 4 * 1.414}px`,
          animationDuration: `${animationDuration}s`,
        }}
      />
    </div>
  )
}

export default ColorBands
