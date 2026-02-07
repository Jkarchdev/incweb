import type { CSSProperties } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'

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
  { color: 'var(--primary)', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', style: { top: '10%', left: '-5%', width: '60%', height: '50%' }, opacity: 0.08 },
  { color: 'var(--border)', borderRadius: '40% 60% 30% 70% / 60% 40% 50% 50%', style: { top: '30%', right: '-10%', width: '55%', height: '45%' }, opacity: 0.12 },
  { color: 'var(--muted)', borderRadius: '50% 50% 60% 40% / 40% 70% 30% 60%', style: { bottom: '5%', left: '10%', width: '50%', height: '40%' }, opacity: 0.06 },
  { color: 'var(--primary)', borderRadius: '70% 30% 50% 50% / 50% 50% 60% 40%', style: { bottom: '20%', right: '5%', width: '40%', height: '35%' }, opacity: 0.1 },
]

const CutPaperLayers = ({ settings }: CutPaperLayersProps) => {
  const layerCount = 3 + Math.round((settings.density / 100) * 1) // 3-4

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {LAYERS.slice(0, layerCount).map((layer, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            background: layer.color,
            borderRadius: layer.borderRadius,
            ...layer.style,
            opacity: layer.opacity,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        />
      ))}
    </div>
  )
}

export default CutPaperLayers
