import type { BackgroundSettings } from '../backgroundPresets'
import './Ripples.css'

interface RipplesProps {
  settings: BackgroundSettings
}

const Ripples = ({ settings }: RipplesProps) => {
  const animationDuration = 6 - (settings.speed / 100) * 4 // 2-6s
  const rippleCount = 3 + Math.floor((settings.density / 100) * 3) // 3-6 ripples
  const rippleOpacity = 0.1 + (settings.density / 100) * 0.15

  return (
    <div className="ripples-container">
      {Array.from({ length: rippleCount }).map((_, i) => (
        <div
          key={i}
          className="ripple-ring"
          style={{
            animationDuration: `${animationDuration}s`,
            animationDelay: `${-(i * animationDuration) / rippleCount}s`,
            opacity: rippleOpacity,
          }}
        />
      ))}
    </div>
  )
}

export default Ripples
