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

export type HeroLayout = 'center' | 'left' | 'right' | 'side-left' | 'side-right'
export type HeroAnimation = 'none' | 'fade-in' | 'slide-up' | 'scale-in' | 'typewriter'
export type SectionAnimation = 'none' | 'fade-in' | 'slide-up' | 'scale-in'
export type CardAnimation = 'none' | 'fade-in' | 'slide-up' | 'flip' | 'bounce'
export type HoverStyle = 'none' | 'lift' | 'grow' | 'glow' | 'tilt'
export type CardStyle = 'glass' | 'solid' | 'outline' | 'shadow'
export type TeamCardLayout = 'grid' | 'carousel' | 'stacked'
export type TextAnimation = 'none' | 'typing' | 'color-shift' | 'shimmer'

export interface HeroLogoConfig {
  size: 'small' | 'medium' | 'large' | 'xlarge'
  alignment: HeroLayout
  tagline: string
  sideText: string
  sideTextFont: string
  sideTextColor: string
  logoX: number  // -50 to 50 (percentage offset from center)
  logoY: number  // -50 to 50
  textX: number  // -50 to 50
  textY: number  // -50 to 50
  textGlow: boolean
  textGlowIntensity: number  // 0-100
  textShadow: boolean
  textShadowIntensity: number  // 0-100
  textOutline: boolean
  textOutlineWidth: number  // 0-5
}

export interface SocialLinks {
  instagram: string
  twitter: string
  linkedin: string
  tiktok: string
}

export interface ProductPage {
  heading: string
  description: string
  imageUrl: string
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
  productPage: ProductPage
  productPageEnabled: boolean
  teamLocation: 'home' | 'separate'
  headingSize: number
  bodySize: number
  teamDisplayMode: 'individual' | 'group'
  teamGroupImageUrl: string
  secondaryColor: string
  heroAnimation: HeroAnimation
  sectionAnimation: SectionAnimation
  cardAnimation: CardAnimation
  hoverStyle: HoverStyle
  heroGradientText: boolean
  heroGradientFrom: string
  heroGradientTo: string
  heroLetterSpacing: number
  heroTextAnimation: TextAnimation
  cardStyle: CardStyle
  cardBorderRadius: number
  teamCardLayout: TeamCardLayout
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
    logoX: 0,
    logoY: 0,
    textX: 0,
    textY: 0,
    textGlow: false,
    textGlowIntensity: 50,
    textShadow: false,
    textShadowIntensity: 50,
    textOutline: false,
    textOutlineWidth: 1,
  },
  mainText: '(Placeholder-Main-Text)',
  teammates: Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: `(Name ${i + 1})`,
    role: `(Role ${i + 1})`,
    imageUrl: ''
  })),
  instagramUrl: 'https://instagram.com',
  contactEmail: 'hello@incubator.com',
  background: { ...DEFAULT_BACKGROUND },
  palette: 'ocean',
  customColor: '',

  headingFont: 'Inter',
  bodyFont: 'Inter',
  heroSubtext: '(Placeholder-Subtext)',
  ctaText: '(Placeholder-CTA)',
  teamHeading: '(Placeholder-Team-Heading)',
  teamSubheading: '(Placeholder-Team-Subheading)',
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
  productPage: {
    heading: '(Product-Heading)',
    description: '(Product-Description)',
    imageUrl: '',
  },
  productPageEnabled: false,
  teamLocation: 'home',
  headingSize: 100,
  bodySize: 100,
  teamDisplayMode: 'individual',
  teamGroupImageUrl: '',
  secondaryColor: '',
  heroAnimation: 'fade-in',
  sectionAnimation: 'fade-in',
  cardAnimation: 'fade-in',
  hoverStyle: 'lift',
  heroGradientText: false,
  heroGradientFrom: '',
  heroGradientTo: '',
  heroLetterSpacing: 0,
  heroTextAnimation: 'none',
  cardStyle: 'glass',
  cardBorderRadius: 24,
  teamCardLayout: 'grid',
}

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge with defaults so new fields are always present
      const mergedSections = { ...DEFAULT_STATE.sections, ...parsed.sections }
      // Remove stale 'product' key from sections (now controlled by productPageEnabled)
      delete (mergedSections as Record<string, unknown>).product
      return {
        ...DEFAULT_STATE,
        ...parsed,
        heroLogo: { ...DEFAULT_STATE.heroLogo, ...parsed.heroLogo },
        socialLinks: { ...DEFAULT_STATE.socialLinks, ...parsed.socialLinks },
        sections: mergedSections,
        background: { ...DEFAULT_STATE.background, ...parsed.background, settings: { ...DEFAULT_STATE.background.settings, ...(parsed.background?.settings || {}) } },
        productPage: { ...DEFAULT_STATE.productPage, ...(parsed.productPage || {}) },
      }
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
