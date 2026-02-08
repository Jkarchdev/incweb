import type { BackgroundSettings } from '../backgroundPresets'

interface GradientOrbsProps {
  settings: BackgroundSettings
}

const GradientOrbs = ({ settings }: GradientOrbsProps) => {
  const orbOpacity = 0.2 + (settings.density / 100) * 0.3
  const orbSize = 40 + (settings.density / 100) * 35 // 40-75%

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Large orb top-left */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: `${orbSize}%`,
          height: `${orbSize}%`,
          borderRadius: '50%',
          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
          opacity: orbOpacity,
          filter: 'blur(40px)',
        }}
      />

      {/* Medium orb top-right */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: `${orbSize * 0.7}%`,
          height: `${orbSize * 0.7}%`,
          borderRadius: '50%',
          background: `radial-gradient(circle, var(--secondary) 0%, transparent 70%)`,
          opacity: orbOpacity * 0.8,
          filter: 'blur(35px)',
        }}
      />

      {/* Large orb bottom-center */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '30%',
          width: `${orbSize * 0.9}%`,
          height: `${orbSize * 0.9}%`,
          borderRadius: '50%',
          background: `radial-gradient(circle, var(--border) 0%, transparent 70%)`,
          opacity: orbOpacity * 0.7,
          filter: 'blur(50px)',
        }}
      />

      {/* Small orb middle-left */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '10%',
          width: `${orbSize * 0.5}%`,
          height: `${orbSize * 0.5}%`,
          borderRadius: '50%',
          background: `radial-gradient(circle, var(--muted) 0%, transparent 70%)`,
          opacity: orbOpacity * 0.6,
          filter: 'blur(30px)',
        }}
      />

      {/* Medium orb bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: `${orbSize * 0.6}%`,
          height: `${orbSize * 0.6}%`,
          borderRadius: '50%',
          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
          opacity: orbOpacity * 0.5,
          filter: 'blur(45px)',
        }}
      />
    </div>
  )
}

export default GradientOrbs
