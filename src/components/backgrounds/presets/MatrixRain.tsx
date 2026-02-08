import { useMemo } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'
import './MatrixRain.css'

interface MatrixRainProps {
  settings: BackgroundSettings
}

const MatrixRain = ({ settings }: MatrixRainProps) => {
  const columnCount = 15 + Math.floor((settings.density / 100) * 25) // 15-40 columns
  const animationDuration = 8 - (settings.speed / 100) * 6 // 2-8s

  const columns = useMemo(() => {
    return Array.from({ length: columnCount }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: animationDuration * (0.8 + Math.random() * 0.4),
    }))
  }, [columnCount, animationDuration])

  return (
    <div className="matrix-rain-container">
      {columns.map((col, i) => (
        <div
          key={i}
          className="matrix-column"
          style={{
            left: `${col.left}%`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default MatrixRain
