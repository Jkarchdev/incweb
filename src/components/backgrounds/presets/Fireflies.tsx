import { useMemo } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'
import './Fireflies.css'

interface FirefliesProps {
  settings: BackgroundSettings
}

const Fireflies = ({ settings }: FirefliesProps) => {
  const fireflyCount = 20 + Math.floor((settings.density / 100) * 40) // 20-60 fireflies
  const baseSpeed = 15 - (settings.speed / 100) * 10 // 5-15s

  const fireflies = useMemo(() => {
    return Array.from({ length: fireflyCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: baseSpeed * (0.8 + Math.random() * 0.4),
      delay: Math.random() * 5,
      glowDuration: 1 + Math.random() * 2,
    }))
  }, [fireflyCount, baseSpeed])

  return (
    <div className="fireflies-container">
      {fireflies.map((fly, i) => (
        <div
          key={i}
          className="firefly"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            animationDuration: `${fly.duration}s`,
            animationDelay: `${fly.delay}s`,
          }}
        >
          <div
            className="firefly-glow"
            style={{
              animationDuration: `${fly.glowDuration}s`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default Fireflies
