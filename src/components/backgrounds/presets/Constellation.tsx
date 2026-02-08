import { useMemo } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'
import './Constellation.css'

interface ConstellationProps {
  settings: BackgroundSettings
}

const Constellation = ({ settings }: ConstellationProps) => {
  const starCount = 30 + Math.floor((settings.density / 100) * 40) // 30-70 stars
  const animationDuration = 15 - (settings.speed / 100) * 10 // 5-15s

  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }))
  }, [starCount])

  const connections = useMemo(() => {
    const conns: Array<{ x1: number; y1: number; x2: number; y2: number }> = []
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[j].x - stars[i].x
        const dy = stars[j].y - stars[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 20) {
          conns.push({
            x1: stars[i].x,
            y1: stars[i].y,
            x2: stars[j].x,
            y2: stars[j].y,
          })
        }
      }
    }
    return conns
  }, [stars])

  return (
    <div className="constellation-container">
      <svg
        className="constellation-svg"
        style={{ animationDuration: `${animationDuration}s` }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {connections.map((conn, i) => (
          <line
            key={`line-${i}`}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="url(#line-gradient)"
            strokeWidth="0.1"
          />
        ))}

        {stars.map((star, i) => (
          <circle
            key={`star-${i}`}
            cx={star.x}
            cy={star.y}
            r={star.size / 20}
            fill="var(--primary)"
            opacity={0.6}
            className="constellation-star"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur={`${2 + Math.random() * 3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

export default Constellation
