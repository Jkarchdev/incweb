import type { BackgroundConfig } from './backgroundPresets'
import AuroraDrift from './presets/AuroraDrift'
import FloatingBlobs from './presets/FloatingBlobs'
import ParticleDrift from './presets/ParticleDrift'
import FlowLines from './presets/FlowLines'
import MeshGradient from './presets/MeshGradient'
import SpotlightVignette from './presets/SpotlightVignette'
import CutPaperLayers from './presets/CutPaperLayers'
import TopoLinesStatic from './presets/TopoLinesStatic'

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
