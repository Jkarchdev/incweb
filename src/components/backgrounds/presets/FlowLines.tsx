import type { BackgroundSettings } from '../backgroundPresets'
import './FlowLines.css'

interface FlowLinesProps {
  settings: BackgroundSettings
}

const PATHS = [
  'M0,180 C120,120 280,240 500,180 C720,120 880,240 1000,180',
  'M0,340 C180,280 320,400 500,340 C680,280 820,400 1000,340',
  'M0,500 C100,430 380,570 500,500 C620,430 900,570 1000,500',
  'M0,100 C200,40 350,160 500,100 C650,40 800,160 1000,100',
  'M0,660 C150,590 340,730 500,660 C660,590 850,730 1000,660',
]

const FlowLines = ({ settings }: FlowLinesProps) => {
  const baseDuration = 28 - (settings.speed / 100) * 18 // 28s to 10s
  const lineCount = 3 + Math.round((settings.density / 100) * 2) // 3-5
  const colors = ['var(--primary)', 'var(--border)', 'var(--muted)', 'var(--primary)', 'var(--border)']

  const lines = PATHS.slice(0, lineCount).map((d, i) => {
    const driftDuration = baseDuration + i * 4
    const dashDuration = baseDuration * 1.5 + i * 3
    return (
      <g
        key={i}
        className={`flow-line-group flow-line-group--${i}`}
        style={{ animationDuration: `${driftDuration}s` }}
      >
        {/* Glow layer */}
        <path
          d={d}
          fill="none"
          stroke={colors[i]}
          strokeWidth={6}
          strokeOpacity={0.08}
          strokeLinecap="round"
        />
        {/* Main line */}
        <path
          d={d}
          fill="none"
          stroke={colors[i]}
          strokeWidth={1.5}
          strokeOpacity={0.35}
          strokeDasharray="16 10"
          className="flow-line-path"
          style={{ animationDuration: `${dashDuration}s` }}
        />
      </g>
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
