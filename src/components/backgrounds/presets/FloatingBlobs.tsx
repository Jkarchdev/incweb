import type { BackgroundSettings } from '../backgroundPresets'
import './FloatingBlobs.css'

interface FloatingBlobsProps {
  settings: BackgroundSettings
}

const BLOB_CONFIGS = [
  { color: 'var(--primary)', size: 300, x: 20, y: 20 },
  { color: 'var(--border)', size: 250, x: 70, y: 60 },
  { color: 'var(--primary)', size: 200, x: 50, y: 30 },
  { color: 'var(--muted)', size: 280, x: 80, y: 15 },
  { color: 'var(--border)', size: 220, x: 30, y: 70 },
  { color: 'var(--primary)', size: 180, x: 60, y: 80 },
]

// Seeded offsets for per-render positional variation
const OFFSETS = [3.7, -2.1, 5.3, -4.8, 1.9, -3.2]

const FloatingBlobs = ({ settings }: FloatingBlobsProps) => {
  const duration = 25 - (settings.speed / 100) * 18 // 25s to 7s
  const blobCount = 3 + Math.round((settings.density / 100) * 3) // 3-6 blobs

  const blobs = BLOB_CONFIGS.slice(0, blobCount).map((cfg, i) => {
    const driftDelay = -(i * (duration / blobCount))
    const breatheDuration = duration * 0.6 + i * 4
    const breatheDelay = -(i * 3.2)
    const xOffset = cfg.x + OFFSETS[i % OFFSETS.length]
    const yOffset = cfg.y + OFFSETS[(i + 2) % OFFSETS.length]
    return (
      <div
        key={i}
        className="floating-blob"
        style={{
          background: cfg.color,
          width: cfg.size,
          height: cfg.size,
          left: `${xOffset}%`,
          top: `${yOffset}%`,
          animationDuration: `${duration + i * 3}s, ${breatheDuration}s`,
          animationDelay: `${driftDelay}s, ${breatheDelay}s`,
        }}
      />
    )
  })

  return <div className="floating-blobs">{blobs}</div>
}

export default FloatingBlobs
