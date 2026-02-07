import type { BackgroundSettings } from '../backgroundPresets'
import './FlowLines.css'

interface FlowLinesProps {
  settings: BackgroundSettings
}

const PATHS = [
  'M0,200 C150,150 350,250 500,200 C650,150 850,250 1000,200',
  'M0,350 C200,300 300,400 500,350 C700,300 800,400 1000,350',
  'M0,500 C100,450 400,550 500,500 C600,450 900,550 1000,500',
  'M0,100 C250,50 350,150 500,100 C650,50 750,150 1000,100',
  'M0,650 C150,600 350,700 500,650 C650,600 850,700 1000,650',
]

const FlowLines = ({ settings }: FlowLinesProps) => {
  const duration = 30 - (settings.speed / 100) * 22 // 30s to 8s
  const lineCount = 3 + Math.round((settings.density / 100) * 2) // 3-5

  const lines = PATHS.slice(0, lineCount).map((d, i) => {
    const driftDelay = -(i * (duration / lineCount))
    const dashDuration = duration * 2 + i * 5
    const colors = ['var(--primary)', 'var(--border)', 'var(--muted)']
    return (
      <path
        key={i}
        d={d}
        fill="none"
        stroke={colors[i % colors.length]}
        strokeWidth={1.5}
        strokeOpacity={0.3}
        strokeDasharray="12 8"
        className="flow-line-path"
        style={{
          animationDuration: `${duration}s, ${dashDuration}s`,
          animationDelay: `${driftDelay}s, ${-(i * 3)}s`,
        }}
      />
    )
  })

  return (
    <div className="flow-lines">
      <svg
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {lines}
      </svg>
    </div>
  )
}

export default FlowLines
