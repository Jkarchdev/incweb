export interface BackgroundSettings {
  intensity: number   // 0-100
  speed: number       // 0-100
  density: number     // 0-100
  blur: number        // 0-20
}

export interface BackgroundConfig {
  presetId: string
  type: 'static' | 'animated'
  settings: BackgroundSettings
}

export interface BackgroundPreset {
  id: string
  name: string
  type: 'static' | 'animated'
  description: string
}

export const DEFAULT_BACKGROUND_SETTINGS: BackgroundSettings = {
  intensity: 45,
  speed: 35,
  density: 40,
  blur: 0,
}

export const DEFAULT_BACKGROUND: BackgroundConfig = {
  presetId: 'mesh_gradient',
  type: 'static',
  settings: { ...DEFAULT_BACKGROUND_SETTINGS },
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // Animated presets
  { id: 'aurora_drift', name: 'Aurora Drift', type: 'animated', description: 'Slow-moving gradient ribbons' },
  { id: 'floating_blobs', name: 'Floating Blobs', type: 'animated', description: 'Soft blurred orbs drifting gently' },
  { id: 'particle_drift', name: 'Particle Drift', type: 'animated', description: 'Gentle floating particles' },
  { id: 'flow_lines', name: 'Flow Lines', type: 'animated', description: 'Organic flowing line paths' },
  { id: 'waves', name: 'Waves', type: 'animated', description: 'Flowing wave animation' },
  { id: 'shimmer', name: 'Shimmer', type: 'animated', description: 'Shimmering light beams' },
  // Static presets
  { id: 'mesh_gradient', name: 'Mesh Gradient', type: 'static', description: 'Layered radial gradients with noise' },
  { id: 'spotlight_vignette', name: 'Spotlight', type: 'static', description: 'Centered spotlight with vignette edges' },
  { id: 'cut_paper', name: 'Cut Paper', type: 'static', description: 'Layered paper shapes with depth' },
  { id: 'topo_lines', name: 'Topo Lines', type: 'static', description: 'Topographic contour line pattern' },
  { id: 'gradient_orbs', name: 'Gradient Orbs', type: 'static', description: 'Large colorful gradient orbs' },
  { id: 'dot_grid', name: 'Dot Grid', type: 'static', description: 'Subtle dot grid pattern' },
  { id: 'radial_burst', name: 'Radial Burst', type: 'static', description: 'Radial lines from center' },
  { id: 'hexagon_pattern', name: 'Hexagons', type: 'static', description: 'Hexagonal grid pattern' },
  { id: 'geometric_shapes', name: 'Geometric', type: 'static', description: 'Abstract geometric shapes' },
  { id: 'nebula', name: 'Nebula', type: 'static', description: 'Space nebula effect' },
]
