import type { BackgroundSettings } from '../backgroundPresets'

interface GeometricShapesProps {
  settings: BackgroundSettings
}

const GeometricShapes = ({ settings }: GeometricShapesProps) => {
  const shapeOpacity = 0.08 + (settings.density / 100) * 0.12
  const scale = 0.8 + (settings.density / 100) * 0.6 // 0.8-1.4

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Triangle top-left */}
        <polygon
          points="100,50 250,250 50,250"
          fill="var(--primary)"
          opacity={shapeOpacity}
          transform={`scale(${scale})`}
        />

        {/* Circle top-right */}
        <circle
          cx="850"
          cy="150"
          r="80"
          fill="var(--secondary)"
          opacity={shapeOpacity * 0.8}
          transform={`scale(${scale})`}
        />

        {/* Square middle-left */}
        <rect
          x="50"
          y="400"
          width="150"
          height="150"
          fill="var(--border)"
          opacity={shapeOpacity * 0.7}
          transform={`rotate(15 125 475) scale(${scale})`}
        />

        {/* Diamond middle-right */}
        <rect
          x="750"
          y="450"
          width="120"
          height="120"
          fill="var(--primary)"
          opacity={shapeOpacity * 0.6}
          transform={`rotate(45 810 510) scale(${scale})`}
        />

        {/* Triangle bottom-center */}
        <polygon
          points="450,700 600,900 300,900"
          fill="var(--muted)"
          opacity={shapeOpacity * 0.5}
          transform={`scale(${scale})`}
        />

        {/* Pentagon bottom-right */}
        <polygon
          points="850,750 950,800 920,920 780,920 750,800"
          fill="var(--secondary)"
          opacity={shapeOpacity * 0.4}
          transform={`scale(${scale})`}
        />

        {/* Small circles scattered */}
        <circle cx="600" cy="200" r="30" fill="var(--border)" opacity={shapeOpacity * 0.6} />
        <circle cx="300" cy="650" r="40" fill="var(--primary)" opacity={shapeOpacity * 0.5} />
        <circle cx="200" cy="800" r="25" fill="var(--secondary)" opacity={shapeOpacity * 0.7} />
      </svg>
    </div>
  )
}

export default GeometricShapes
