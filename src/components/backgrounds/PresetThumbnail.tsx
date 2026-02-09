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
import Ripples from './presets/Ripples'
import Constellation from './presets/Constellation'
import AuroraWaves from './presets/AuroraWaves'
import Plasma from './presets/Plasma'
import MatrixRain from './presets/MatrixRain'
import PulseRings from './presets/PulseRings'
import Fireflies from './presets/Fireflies'
import Spiral from './presets/Spiral'
import GradientOrbs from './presets/GradientOrbs'
import DotGrid from './presets/DotGrid'
import RadialBurst from './presets/RadialBurst'
import HexagonPattern from './presets/HexagonPattern'
import GeometricShapes from './presets/GeometricShapes'
import Nebula from './presets/Nebula'
import BokehLights from './presets/BokehLights'
import GradientWash from './presets/GradientWash'
import NeonGlow from './presets/NeonGlow'
import LightRays from './presets/LightRays'
import ColorBands from './presets/ColorBands'
import GridPulse from './presets/GridPulse'
import SolidColor from './presets/SolidColor'
import CitrusBurst from './presets/CitrusBurst'

interface PresetThumbnailProps {
  presetId: string
  name: string
  selected: boolean
  onClick: () => void
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
  ripples: Ripples,
  constellation: Constellation,
  aurora_waves: AuroraWaves,
  plasma: Plasma,
  matrix_rain: MatrixRain,
  pulse_rings: PulseRings,
  fireflies: Fireflies,
  spiral: Spiral,
  gradient_orbs: GradientOrbs,
  dot_grid: DotGrid,
  radial_burst: RadialBurst,
  hexagon_pattern: HexagonPattern,
  geometric_shapes: GeometricShapes,
  nebula: Nebula,
  bokeh_lights: BokehLights,
  gradient_wash: GradientWash,
  neon_glow: NeonGlow,
  light_rays: LightRays,
  color_bands: ColorBands,
  grid_pulse: GridPulse,
  solid_color: SolidColor,
  citrus_burst: CitrusBurst,
}

const THUMBNAIL_SETTINGS: BackgroundConfig['settings'] = {
  intensity: 50,
  speed: 20,
  density: 30,
  blur: 0,
}

const PresetThumbnail = ({ presetId, name, selected, onClick }: PresetThumbnailProps) => {
  const PresetComponent = PRESET_COMPONENTS[presetId]
  if (!PresetComponent) return null

  return (
    <button
      className={`preset-thumbnail ${selected ? 'preset-thumbnail--selected' : ''}`}
      onClick={onClick}
      type="button"
      title={name}
    >
      <div className="preset-thumbnail__preview">
        <PresetComponent settings={THUMBNAIL_SETTINGS} />
      </div>
      <span className="preset-thumbnail__label">{name}</span>
    </button>
  )
}

export default PresetThumbnail
