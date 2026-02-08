import type { BackgroundSettings } from '../backgroundPresets'
import './Plasma.css'

interface PlasmaProps {
  settings: BackgroundSettings
}

const Plasma = ({ settings }: PlasmaProps) => {
  const animationDuration = 10 - (settings.speed / 100) * 6 // 4-10s
  const blobOpacity = 0.2 + (settings.density / 100) * 0.3

  return (
    <div className="plasma-container">
      <div
        className="plasma-blob plasma-blob-1"
        style={{
          animationDuration: `${animationDuration}s`,
          opacity: blobOpacity,
        }}
      />
      <div
        className="plasma-blob plasma-blob-2"
        style={{
          animationDuration: `${animationDuration * 1.4}s`,
          opacity: blobOpacity * 0.9,
        }}
      />
      <div
        className="plasma-blob plasma-blob-3"
        style={{
          animationDuration: `${animationDuration * 1.8}s`,
          opacity: blobOpacity * 0.8,
        }}
      />
      <div
        className="plasma-blob plasma-blob-4"
        style={{
          animationDuration: `${animationDuration * 2.2}s`,
          opacity: blobOpacity * 0.7,
        }}
      />
    </div>
  )
}

export default Plasma
