import type { BackgroundSettings } from '../backgroundPresets'
import './FloatingBlobs.css'

interface FloatingBlobsProps {
  settings: BackgroundSettings
}

const BLOB_CONFIGS = [
  { color: 'var(--primary)', size: 350, x: 15, y: 15 },
  { color: 'var(--border)',  size: 300, x: 75, y: 55 },
  { color: 'var(--primary)', size: 250, x: 45, y: 25 },
  { color: 'var(--muted)',   size: 320, x: 85, y: 10 },
  { color: 'var(--border)',  size: 280, x: 25, y: 75 },
  { color: 'var(--primary)', size: 220, x: 65, y: 85 },
]

const FloatingBlobs = ({ settings }: FloatingBlobsProps) => {
  const baseDuration = 25 - (settings.speed / 100) * 16 // 25s to 9s
  const blobCount = 3 + Math.round((settings.density / 100) * 3) // 3-6

  const blobs = BLOB_CONFIGS.slice(0, blobCount).map((cfg, i) => (
    <div
      key={i}
      className={`floating-blob floating-blob--${i}`}
      style={{
        background: `radial-gradient(circle, ${cfg.color} 0%, transparent 70%)`,
        width: cfg.size,
        height: cfg.size,
        left: `${cfg.x}%`,
        top: `${cfg.y}%`,
        animationDuration: `${baseDuration + i * 4}s`,
      }}
    />
  ))

  return <div className="floating-blobs">{blobs}</div>
}

export default FloatingBlobs
