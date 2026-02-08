import { useEffect, useRef } from 'react'
import type { BackgroundSettings } from '../backgroundPresets'

interface ParticleDriftProps {
  settings: BackgroundSettings
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
  phase: number   // for sine-wave wobble
}

function parseColor(cssVar: string, el: Element): string {
  const style = getComputedStyle(el)
  return style.getPropertyValue(cssVar).trim() || '#888888'
}

const CONNECTION_DISTANCE = 140

const ParticleDrift = ({ settings }: ParticleDriftProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const colorsRef = useRef<string[]>(['#888', '#aaa', '#999'])
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = canvas.parentElement
    if (!container) return

    const dpr = Math.min(window.devicePixelRatio, 2)

    const resize = () => {
      const rect = container.getBoundingClientRect()
      sizeRef.current = { w: rect.width, h: rect.height }
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const previewContainer = canvas.closest('.preview-container') || container
    colorsRef.current = [
      parseColor('--primary', previewContainer),
      parseColor('--border', previewContainer),
      parseColor('--muted', previewContainer),
    ]

    const count = 20 + Math.round((settings.density / 100) * 40) // 20-60
    const speedFactor = 0.15 + (settings.speed / 100) * 0.6 // 0.15-0.75

    const { w, h } = sizeRef.current
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speedFactor,
      vy: (Math.random() - 0.5) * speedFactor,
      radius: 1 + Math.random() * 2,
      color: colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)],
      opacity: 0.25 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
    }))

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let time = 0

    const animate = () => {
      const { w: cw, h: ch } = sizeRef.current
      ctx.clearRect(0, 0, cw, ch)
      time += 0.005

      const particles = particlesRef.current

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.2
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = lineOpacity
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Draw particles with glow
      for (const p of particles) {
        if (!prefersReducedMotion) {
          // Sine wobble for organic motion
          const wobbleX = Math.sin(time * 2 + p.phase) * 0.15
          const wobbleY = Math.cos(time * 1.5 + p.phase) * 0.15
          p.x += p.vx + wobbleX
          p.y += p.vy + wobbleY
          if (p.x < -10) p.x = cw + 10
          if (p.x > cw + 10) p.x = -10
          if (p.y < -10) p.y = ch + 10
          if (p.y > ch + 10) p.y = -10
        }

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = p.opacity * 0.3
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      resizeObserver.disconnect()
    }
  }, [settings.density, settings.speed])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

export default ParticleDrift
