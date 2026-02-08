import type { BackgroundSettings } from '../backgroundPresets'
import './Shimmer.css'

interface ShimmerProps {
  settings: BackgroundSettings
}

const Shimmer = ({ settings }: ShimmerProps) => {
  const animationDuration = 8 - (settings.speed / 100) * 5 // 3-8s
  const shimmerOpacity = 0.1 + (settings.density / 100) * 0.2

  return (
    <div className="shimmer-container">
      <div
        className="shimmer-beam shimmer-beam-1"
        style={{
          animationDuration: `${animationDuration}s`,
          opacity: shimmerOpacity,
        }}
      />
      <div
        className="shimmer-beam shimmer-beam-2"
        style={{
          animationDuration: `${animationDuration * 1.4}s`,
          opacity: shimmerOpacity * 0.8,
        }}
      />
      <div
        className="shimmer-beam shimmer-beam-3"
        style={{
          animationDuration: `${animationDuration * 1.8}s`,
          opacity: shimmerOpacity * 0.6,
        }}
      />
    </div>
  )
}

export default Shimmer
