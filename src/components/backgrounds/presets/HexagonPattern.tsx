import type { BackgroundSettings } from '../backgroundPresets'

interface HexagonPatternProps {
  settings: BackgroundSettings
}

const HexagonPattern = ({ settings }: HexagonPatternProps) => {
  const hexOpacity = 0.1 + (settings.density / 100) * 0.15
  const hexSize = 60 - (settings.density / 100) * 30 // 30-60
  const strokeWidth = 0.5 + (settings.density / 100) * 1.5

  // Calculate hexagon points
  const hexPoints = (size: number) => {
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = size + size * Math.cos(angle)
      const y = size + size * Math.sin(angle)
      points.push(`${x},${y}`)
    }
    return points.join(' ')
  }

  const hexHeight = hexSize * Math.sqrt(3)
  const horizontalSpacing = hexSize * 1.5
  const verticalSpacing = hexHeight

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hexagon-pattern"
            x="0"
            y="0"
            width={horizontalSpacing * 2}
            height={verticalSpacing}
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points={hexPoints(hexSize / 2)}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={strokeWidth}
              opacity={hexOpacity}
            />
            <polygon
              points={hexPoints(hexSize / 2)}
              transform={`translate(${horizontalSpacing}, ${verticalSpacing / 2})`}
              fill="none"
              stroke="var(--secondary)"
              strokeWidth={strokeWidth}
              opacity={hexOpacity * 0.7}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
      </svg>
    </div>
  )
}

export default HexagonPattern
