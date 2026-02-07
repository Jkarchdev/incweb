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
}

function parseColor(cssVar: string, el: Element): string {
  const style = getComputedStyle(el)
  return style.getPropertyValue(cssVar).trim() || '#888888'
}

const CONNECTION_DISTANCE = 120

const ParticleDrift = ({ settings }: ParticleDriftProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const colorsRef = useRef<string[]>(['#888', '#aaa', '#999'])

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
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Read theme colors - re-read on each effect run (palette changes trigger re-render)
    const previewContainer = canvas.closest('.preview-container') || container
    colorsRef.current = [
      parseColor('--primary', previewContainer),
      parseColor('--border', previewContainer),
      parseColor('--muted', previewContainer),
    ]

    const count = 15 + Math.round((settings.density / 100) * 35) // 15-50
    const speedFactor = 0.2 + (settings.speed / 100) * 0.8 // 0.2-1.0

    const rect = container.getBoundingClientRect()
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * speedFactor,
      vy: (Math.random() - 0.5) * speedFactor,
      radius: 1.5 + Math.random() * 2.5,
      color: colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)],
      opacity: 0.3 + Math.random() * 0.4, // 0.3-0.7 range
    }))

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const animate = () => {
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = lineOpacity
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
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
