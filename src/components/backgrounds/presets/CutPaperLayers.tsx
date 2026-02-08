import type { CSSProperties } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'
import './CutPaperLayers.css'

interface CutPaperLayersProps {
  settings: BackgroundSettings
}

interface LayerConfig {
  color: string
  borderRadius: string
  style: CSSProperties
  opacity: number
}

const LAYERS: LayerConfig[] = [
  { color: 'var(--primary)', borderRadius: '62% 38% 72% 28% / 48% 62% 38% 52%', style: { top: '5%', left: '-8%', width: '65%', height: '55%' }, opacity: 0.1 },
  { color: 'var(--border)',  borderRadius: '38% 62% 28% 72% / 58% 38% 62% 42%', style: { top: '25%', right: '-12%', width: '60%', height: '50%' }, opacity: 0.12 },
  { color: 'var(--muted)',   borderRadius: '52% 48% 58% 42% / 42% 68% 32% 58%', style: { bottom: '0%', left: '8%', width: '55%', height: '45%' }, opacity: 0.08 },
  { color: 'var(--primary)', borderRadius: '68% 32% 48% 52% / 52% 48% 62% 38%', style: { bottom: '15%', right: '2%', width: '45%', height: '40%' }, opacity: 0.1 },
]

const CutPaperLayers = ({ settings }: CutPaperLayersProps) => {
  const layerCount = 3 + Math.round((settings.density / 100) * 1) // 3-4

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {LAYERS.slice(0, layerCount).map((layer, i) => (
        <div
          key={i}
          className={`cut-paper-shape cut-paper-shape--${i}`}
          style={{
            position: 'absolute',
            background: layer.color,
            borderRadius: layer.borderRadius,
            ...layer.style,
            opacity: layer.opacity,
            boxShadow: '0 12px 48px rgba(0,0,0,0.06)',
          }}
        />
      ))}
    </div>
  )
}

export default CutPaperLayers
