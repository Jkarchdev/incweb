import type { BackgroundSettings } from '../backgroundPresets'

interface TopoLinesStaticProps {
  settings: BackgroundSettings
}

const TopoLinesStatic = ({ settings }: TopoLinesStaticProps) => {
  const lineOpacity = 0.08 + (settings.density / 100) * 0.12 // 0.08-0.20

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        viewBox="0 0 1000 800"
      >
        <defs>
          <pattern id="topo-pattern" x="0" y="0" width="1000" height="800" patternUnits="userSpaceOnUse">
            <path d="M100,200 C200,150 300,250 400,200 C500,150 600,250 700,200 C800,150 900,250 1000,200" fill="none" stroke="var(--primary)" strokeWidth="1" strokeOpacity={lineOpacity} />
            <path d="M0,300 C100,270 250,330 350,300 C450,270 600,330 700,300 C800,270 900,330 1000,300" fill="none" stroke="var(--border)" strokeWidth="1" strokeOpacity={lineOpacity} />
            <path d="M50,400 C150,370 280,430 380,400 C480,370 580,430 750,400 C850,370 950,430 1000,400" fill="none" stroke="var(--muted)" strokeWidth="1" strokeOpacity={lineOpacity} />
            <path d="M0,500 C120,460 220,540 350,500 C480,460 580,540 720,500 C860,460 950,540 1000,500" fill="none" stroke="var(--primary)" strokeWidth="1" strokeOpacity={lineOpacity} />
            <path d="M80,600 C180,570 300,630 420,600 C540,570 640,630 780,600 C900,570 950,630 1000,600" fill="none" stroke="var(--border)" strokeWidth="1" strokeOpacity={lineOpacity} />
            <path d="M0,150 C100,120 200,180 350,150 C500,120 650,180 800,150 C900,120 950,180 1000,150" fill="none" stroke="var(--muted)" strokeWidth="0.8" strokeOpacity={lineOpacity * 0.7} />
            <path d="M0,700 C150,670 300,730 450,700 C600,670 750,730 900,700" fill="none" stroke="var(--primary)" strokeWidth="0.8" strokeOpacity={lineOpacity * 0.7} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>
    </div>
  )
}

export default TopoLinesStatic
