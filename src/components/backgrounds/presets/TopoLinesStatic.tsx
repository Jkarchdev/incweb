import type { BackgroundSettings } from '../backgroundPresets'

interface TopoLinesStaticProps {
  settings: BackgroundSettings
}

const TopoLinesStatic = ({ settings }: TopoLinesStaticProps) => {
  const lineOpacity = 0.1 + (settings.density / 100) * 0.18 // 0.10-0.28
  const fineOpacity = lineOpacity * 0.5

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        viewBox="0 0 1000 800"
      >
        <defs>
          <pattern id="topo-pattern" x="0" y="0" width="1000" height="800" patternUnits="userSpaceOnUse">
            {/* Primary contour lines */}
            <path d="M0,100 C80,60 200,140 350,100 C500,60 650,140 800,100 C900,70 960,120 1000,100" fill="none" stroke="var(--primary)" strokeWidth="1.2" strokeOpacity={lineOpacity} />
            <path d="M0,200 C150,160 280,240 400,200 C520,160 650,240 750,200 C850,170 940,230 1000,200" fill="none" stroke="var(--border)" strokeWidth="1.2" strokeOpacity={lineOpacity} />
            <path d="M0,320 C100,280 250,360 380,320 C510,280 620,360 750,320 C880,280 950,350 1000,320" fill="none" stroke="var(--muted)" strokeWidth="1.2" strokeOpacity={lineOpacity} />
            <path d="M0,440 C120,390 280,490 420,440 C560,390 680,490 820,440 C920,400 970,470 1000,440" fill="none" stroke="var(--primary)" strokeWidth="1.2" strokeOpacity={lineOpacity} />
            <path d="M0,560 C100,520 300,600 450,560 C600,520 750,600 880,560 C950,530 980,580 1000,560" fill="none" stroke="var(--border)" strokeWidth="1.2" strokeOpacity={lineOpacity} />
            <path d="M0,680 C180,640 320,720 480,680 C640,640 780,720 900,680" fill="none" stroke="var(--muted)" strokeWidth="1.2" strokeOpacity={lineOpacity} />

            {/* Fine detail lines */}
            <path d="M0,150 C100,120 220,180 380,150 C540,120 680,180 850,150 C940,130 980,160 1000,150" fill="none" stroke="var(--primary)" strokeWidth="0.6" strokeOpacity={fineOpacity} />
            <path d="M0,260 C130,240 250,280 400,260 C550,240 680,280 800,260 C900,245 960,275 1000,260" fill="none" stroke="var(--border)" strokeWidth="0.6" strokeOpacity={fineOpacity} />
            <path d="M0,380 C110,360 260,400 400,380 C540,360 660,400 800,380 C900,365 960,395 1000,380" fill="none" stroke="var(--muted)" strokeWidth="0.6" strokeOpacity={fineOpacity} />
            <path d="M0,500 C90,480 240,520 380,500 C520,480 660,520 800,500 C900,485 960,515 1000,500" fill="none" stroke="var(--primary)" strokeWidth="0.6" strokeOpacity={fineOpacity} />
            <path d="M0,620 C140,600 290,640 440,620 C590,600 720,640 860,620 C940,608 980,635 1000,620" fill="none" stroke="var(--border)" strokeWidth="0.6" strokeOpacity={fineOpacity} />
            <path d="M0,740 C120,720 280,760 420,740 C560,720 700,760 850,740" fill="none" stroke="var(--muted)" strokeWidth="0.6" strokeOpacity={fineOpacity} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>
    </div>
  )
}

export default TopoLinesStatic
