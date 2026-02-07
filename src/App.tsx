import { useState, useEffect } from 'react'
import './App.css'
import Controls from './components/Controls'
import Preview from './components/Preview'
import type { BackgroundConfig } from './components/backgrounds/backgroundPresets'
import { DEFAULT_BACKGROUND } from './components/backgrounds/backgroundPresets'

export interface Teammate {
  id: number
  name: string
  role: string
  imageUrl: string
}

export interface HeroLogoConfig {
  size: 'small' | 'medium' | 'large' | 'xlarge'
  alignment: 'center' | 'left'
  tagline: string
  sideText: string
  sideTextFont: string
  sideTextColor: string
}

export interface SocialLinks {
  instagram: string
  twitter: string
  linkedin: string
  tiktok: string
}

export interface SectionVisibility {
  hero: boolean
  uvp: boolean
  team: boolean
  footer: boolean
}

export interface AppState {
  logoUrl: string
  heroLogo: HeroLogoConfig
  mainText: string
  teammates: Teammate[]
  instagramUrl: string
  contactEmail: string
  background: BackgroundConfig
  palette: string
  customColor: string

  // New fields
  headingFont: string
  bodyFont: string
  heroSubtext: string
  ctaText: string
  teamHeading: string
  teamSubheading: string
  socialLinks: SocialLinks
  sections: SectionVisibility
}

const STORAGE_KEY = 'incweb-config'

const DEFAULT_STATE: AppState = {
  logoUrl: '',
  heroLogo: {
    size: 'large',
    alignment: 'center',
    tagline: '',
    sideText: '',
    sideTextFont: 'Inter',
    sideTextColor: '',
  },
  mainText: 'Transform your ideas into reality with our comprehensive business incubator program. Join a community of innovative entrepreneurs and bring your vision to life.',
  teammates: Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: `Team Member ${i + 1}`,
    role: `Role ${i + 1}`,
    imageUrl: ''
  })),
  instagramUrl: 'https://instagram.com',
  contactEmail: 'hello@incubator.com',
  background: { ...DEFAULT_BACKGROUND },
  palette: 'ocean',
  customColor: '',

  headingFont: 'Inter',
  bodyFont: 'Inter',
  heroSubtext: 'Building the future, one startup at a time',
  ctaText: 'Get Started',
  teamHeading: 'Meet Our Team',
  teamSubheading: 'The passionate people behind our success',
  socialLinks: {
    instagram: 'https://instagram.com',
    twitter: '',
    linkedin: '',
    tiktok: '',
  },
  sections: {
    hero: true,
    uvp: true,
    team: true,
    footer: true,
  },
}

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge with defaults so new fields are always present
      return { ...DEFAULT_STATE, ...parsed, heroLogo: { ...DEFAULT_STATE.heroLogo, ...parsed.heroLogo }, socialLinks: { ...DEFAULT_STATE.socialLinks, ...parsed.socialLinks }, sections: { ...DEFAULT_STATE.sections, ...parsed.sections }, background: { ...DEFAULT_STATE.background, ...parsed.background, settings: { ...DEFAULT_STATE.background.settings, ...(parsed.background?.settings || {}) } } }
    }
  } catch {
    // ignore parse errors
  }
  return { ...DEFAULT_STATE }
}

function App() {
  const [state, setState] = useState<AppState>(loadState)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore quota errors
    }
  }, [state])

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY)
    setState({ ...DEFAULT_STATE })
  }

  return (
    <div className="app-container">
      <div className={`controls-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="controls-header">
          <h1>Customizer</h1>
          <div className="controls-header-actions">
            <button className="reset-button" onClick={resetToDefaults}>
              Reset
            </button>
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        <Controls state={state} updateState={updateState} />
      </div>
      <div className="preview-panel">
        <Preview state={state} onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
      </div>
    </div>
  )
}

export default App
