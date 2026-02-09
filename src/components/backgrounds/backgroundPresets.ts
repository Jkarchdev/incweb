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
  color1: string
  color2: string
}

export interface BackgroundPreset {
  id: string
  name: string
  type: 'static' | 'animated'
  description: string
}

export const DEFAULT_BACKGROUND_SETTINGS: BackgroundSettings = {
  intensity: 65,
  speed: 50,
  density: 55,
  blur: 0,
}

export const DEFAULT_BACKGROUND: BackgroundConfig = {
  presetId: 'mesh_gradient',
  type: 'static',
  settings: { ...DEFAULT_BACKGROUND_SETTINGS },
  color1: '',
  color2: '',
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // Animated presets
  { id: 'aurora_drift', name: 'Aurora Drift', type: 'animated', description: 'Slow-moving gradient ribbons' },
  { id: 'floating_blobs', name: 'Floating Blobs', type: 'animated', description: 'Soft blurred orbs drifting gently' },
  { id: 'particle_drift', name: 'Particle Drift', type: 'animated', description: 'Gentle floating particles' },
  { id: 'flow_lines', name: 'Flow Lines', type: 'animated', description: 'Organic flowing line paths' },
  { id: 'waves', name: 'Waves', type: 'animated', description: 'Flowing wave animation' },
  { id: 'shimmer', name: 'Shimmer', type: 'animated', description: 'Shimmering light beams' },
  { id: 'ripples', name: 'Ripples', type: 'animated', description: 'Expanding ripple rings' },
  { id: 'constellation', name: 'Constellation', type: 'animated', description: 'Connected stars' },
  { id: 'aurora_waves', name: 'Aurora Waves', type: 'animated', description: 'Northern lights effect' },
  { id: 'plasma', name: 'Plasma', type: 'animated', description: 'Lava lamp plasma blobs' },
  { id: 'matrix_rain', name: 'Matrix Rain', type: 'animated', description: 'Falling light streams' },
  { id: 'pulse_rings', name: 'Pulse Rings', type: 'animated', description: 'Pulsing concentric rings' },
  { id: 'fireflies', name: 'Fireflies', type: 'animated', description: 'Floating glowing particles' },
  { id: 'spiral', name: 'Spiral', type: 'animated', description: 'Rotating spiral arms' },
  { id: 'bokeh_lights', name: 'Bokeh Lights', type: 'animated', description: 'Large soft glowing circles' },
  { id: 'gradient_wash', name: 'Gradient Wash', type: 'animated', description: 'Full-screen rotating gradient' },
  { id: 'neon_glow', name: 'Neon Glow', type: 'animated', description: 'Glowing geometric shapes' },
  { id: 'light_rays', name: 'Light Rays', type: 'animated', description: 'Dramatic light beams from corner' },
  { id: 'color_bands', name: 'Color Bands', type: 'animated', description: 'Bold diagonal scrolling stripes' },
  { id: 'grid_pulse', name: 'Grid Pulse', type: 'animated', description: 'Pulsing grid wave pattern' },
  // Static presets
  { id: 'solid_color', name: 'Solid Color', type: 'static', description: 'Flat solid color background' },
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
