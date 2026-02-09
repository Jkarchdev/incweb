import React from 'react'
import type { BackgroundConfig } from './backgroundPresets'
import AuroraDrift from './presets/AuroraDrift'
import FloatingBlobs from './presets/FloatingBlobs'
import ParticleDrift from './presets/ParticleDrift'
import FlowLines from './presets/FlowLines'
import MeshGradient from './presets/MeshGradient'
import SpotlightVignette from './presets/SpotlightVignette'
import CutPaperLayers from './presets/CutPaperLayers'
import TopoLinesStatic from './presets/TopoLinesStatic'
import Waves from './presets/Waves'
import Shimmer from './presets/Shimmer'
import GradientOrbs from './presets/GradientOrbs'
import DotGrid from './presets/DotGrid'
import RadialBurst from './presets/RadialBurst'
import HexagonPattern from './presets/HexagonPattern'
import GeometricShapes from './presets/GeometricShapes'
import Nebula from './presets/Nebula'
import Ripples from './presets/Ripples'
import Constellation from './presets/Constellation'
import AuroraWaves from './presets/AuroraWaves'
import Plasma from './presets/Plasma'
import MatrixRain from './presets/MatrixRain'
import PulseRings from './presets/PulseRings'
import Fireflies from './presets/Fireflies'
import Spiral from './presets/Spiral'
import BokehLights from './presets/BokehLights'
import GradientWash from './presets/GradientWash'
import NeonGlow from './presets/NeonGlow'
import LightRays from './presets/LightRays'
import ColorBands from './presets/ColorBands'
import GridPulse from './presets/GridPulse'
import SolidColor from './presets/SolidColor'
import CitrusBurst from './presets/CitrusBurst'
import './BackgroundRenderer.css'

interface BackgroundRendererProps {
  config: BackgroundConfig
}

const PRESET_COMPONENTS: Record<string, React.ComponentType<{ settings: BackgroundConfig['settings'] }>> = {
  aurora_drift: AuroraDrift,
  floating_blobs: FloatingBlobs,
  particle_drift: ParticleDrift,
  flow_lines: FlowLines,
  mesh_gradient: MeshGradient,
  spotlight_vignette: SpotlightVignette,
  cut_paper: CutPaperLayers,
  topo_lines: TopoLinesStatic,
  waves: Waves,
  shimmer: Shimmer,
  gradient_orbs: GradientOrbs,
  dot_grid: DotGrid,
  radial_burst: RadialBurst,
  hexagon_pattern: HexagonPattern,
  geometric_shapes: GeometricShapes,
  nebula: Nebula,
  ripples: Ripples,
  constellation: Constellation,
  aurora_waves: AuroraWaves,
  plasma: Plasma,
  matrix_rain: MatrixRain,
  pulse_rings: PulseRings,
  fireflies: Fireflies,
  spiral: Spiral,
  bokeh_lights: BokehLights,
  gradient_wash: GradientWash,
  neon_glow: NeonGlow,
  light_rays: LightRays,
  color_bands: ColorBands,
  grid_pulse: GridPulse,
  solid_color: SolidColor,
  citrus_burst: CitrusBurst,
}

const BackgroundRenderer = React.memo(({ config }: BackgroundRendererProps) => {
  const PresetComponent = PRESET_COMPONENTS[config.presetId]
  if (!PresetComponent) return null

  const opacity = config.settings.intensity / 100
  const blur = config.settings.blur

  const colorOverrides: React.CSSProperties = {}
  if (config.color1) {
    (colorOverrides as Record<string, string>)['--primary'] = config.color1;
    (colorOverrides as Record<string, string>)['--secondary'] = config.color2 || config.color1;
    (colorOverrides as Record<string, string>)['--border'] = `color-mix(in srgb, ${config.color1} 70%, ${config.color2 || config.color1})`;
    (colorOverrides as Record<string, string>)['--muted'] = `color-mix(in srgb, ${config.color2 || config.color1} 60%, ${config.color1})`;
  }

  return (
    <div
      className="background-renderer"
      style={{
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        willChange: 'opacity, filter',
        ...colorOverrides,
      }}
    >
      <PresetComponent settings={config.settings} />
    </div>
  )
})

BackgroundRenderer.displayName = 'BackgroundRenderer'

export default BackgroundRenderer
