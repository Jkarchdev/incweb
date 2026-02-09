import { useState, useEffect } from 'react'
import './App.css'
import Controls from './components/Controls'
import Preview from './components/Preview'
import type { BackgroundConfig } from './components/backgrounds/backgroundPresets'
import { DEFAULT_BACKGROUND } from './components/backgrounds/backgroundPresets'
import { supabase } from './supabaseClient'

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
export type TextAnimation = 'none' | 'typing' | 'color-shift' | 'shimmer' | 'bounce' | 'pulse'

export interface TextStyle {
  weight: number // 100-900
  color: string
  effect: 'none' | 'shadow' | 'glow' | 'outline'
  effectColor?: string
  effectIntensity?: number // 0-100
}

export interface HeroLogoConfig {
  size: 'small' | 'medium' | 'large' | 'xlarge'
  alignment: HeroLayout
  tagline: string
  sideText: string
  sideTextFont: string
  sideTextColor: string
  taglineFont: string
  taglineColor: string
  taglineSize: number // 50-200
  logoX: number  // -50 to 50 (percentage offset from center)
  logoY: number  // -50 to 50
  textX: number  // -50 to 50
  textY: number  // -50 to 50
  taglineX: number // -50 to 50
  taglineY: number // -50 to 50
  textGlow: boolean
  textGlowIntensity: number  // 0-100
  textShadow: boolean
  textShadowIntensity: number  // 0-100
  textOutline: boolean
  textOutlineWidth: number  // 0-5
}

export interface HeroProductImage {
  url: string
  x: number      // -200 to 200
  y: number      // -200 to 200
  scale: number  // 50 to 200 (percentage)
  visible: boolean
}

export interface DecorativeImage {
  id: string
  url: string
  x: number        // -100 to 100 (percentage from left)
  y: number        // 0 to 100 (percentage from top)
  scale: number    // 20 to 150 (percentage)
  rotation: number // -180 to 180 (degrees)
  zIndex: number   // 1 to 10
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
  layout: 'left' | 'right' | 'top' | 'bottom'
  imageSize: number // 20-80 percentage
  imageX: number
  imageY: number
  textX: number
  textY: number
  headingStyle: TextStyle
  headingSize: number
  headingFont: string
  headingColor: string
  descriptionStyle: TextStyle
  descriptionSize: number
  descriptionFont: string
  descriptionColor: string
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
  heroProductImage: HeroProductImage
  decorativeImages: DecorativeImage[]
  mainText: string
  teammates: Teammate[]
  instagramUrl: string
  contactEmail: string
  background: BackgroundConfig
  palette: string
  customColor: string

  // New fields
  teamNameFont: string
  teamRoleFont: string
  footerFont: string
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
  heroFontWeight: number
  heroTextAnimation: TextAnimation
  cardStyle: CardStyle
  cardBorderRadius: number
  teamCardLayout: TeamCardLayout
  teamNameSize: number
  teamRoleSize: number
  // Visibility toggles
  heroHeadlineVisible: boolean
  heroTaglineVisible: boolean
  subtextVisible: boolean
  // Per-element fonts and sizes
  mainTextFont: string
  mainTextSize: number
  subtextFont: string
  subtextSize: number
  teamHeadingFont: string
  teamHeadingSize: number
  teamSubheadingFont: string
  teamSubheadingSize: number
  heroHeadlineSize: number
  ctaTextSize: number
  footerTextSize: number
  heroHeight: number
  // Advanced Styles
  heroHeadlineStyle: TextStyle
  mainTextStyle: TextStyle
  subtextStyle: TextStyle
  teamHeadingStyle: TextStyle
  teamRoleStyle: TextStyle
  footerTextStyle: TextStyle
  ctaStyle: TextStyle
  // Header & Footer Styling
  headerFont: string
  headerTextColor: string
  headerBackgroundColor: string
  headerSticky: boolean
  headerTransparent: boolean
  footerBackgroundColor: string
  footerTextColor: string
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
    taglineFont: 'Inter',
    taglineColor: '',
    taglineSize: 100,
    logoX: 0,
    logoY: 0,
    textX: 0,
    textY: 0,
    taglineX: 0,
    taglineY: 0,
    textGlow: false,
    textGlowIntensity: 50,
    textShadow: false,
    textShadowIntensity: 50,
    textOutline: false,
    textOutlineWidth: 1,
  },
  heroProductImage: {
    url: '',
    x: 0,
    y: 0,
    scale: 100,
    visible: true,
  },
  decorativeImages: [],
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

  teamNameFont: 'Inter',
  teamRoleFont: 'Inter',
  footerFont: 'Inter',
  heroSubtext: '(Placeholder-Subtext)',
  ctaText: 'Our Product',
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
    layout: 'right', // DEPRECATED: Keep for migration, but UI will use X/Y
    imageSize: 50,
    imageX: 0,
    imageY: 0,
    textX: 0,
    textY: 0,
    headingStyle: { weight: 700, color: '', effect: 'none' },
    headingSize: 100,
    headingFont: 'Inter',
    headingColor: '',
    descriptionStyle: { weight: 400, color: '', effect: 'none' },
    descriptionSize: 100,
    descriptionFont: 'Inter',
    descriptionColor: '',
  },
  productPageEnabled: false,
  teamLocation: 'home',
  headingSize: 100,
  bodySize: 100,
  teamNameSize: 100,
  teamRoleSize: 100,
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
  heroLetterSpacing: 2,
  heroFontWeight: 400,
  heroTextAnimation: 'none',
  cardStyle: 'glass',
  cardBorderRadius: 24,
  teamCardLayout: 'grid',
  // Visibility toggles
  heroHeadlineVisible: true,
  heroTaglineVisible: true,
  subtextVisible: true,
  // Per-element fonts and sizes
  mainTextFont: 'Inter',
  mainTextSize: 120,
  subtextFont: 'Inter',
  subtextSize: 100,
  teamHeadingFont: 'Inter',
  teamHeadingSize: 100,
  teamSubheadingFont: 'Inter',
  teamSubheadingSize: 100,
  heroHeadlineSize: 100,
  ctaTextSize: 100,
  footerTextSize: 100,
  heroHeight: 400,
  heroHeadlineStyle: { weight: 700, color: '', effect: 'none' },
  mainTextStyle: { weight: 400, color: '', effect: 'none' },
  subtextStyle: { weight: 400, color: '', effect: 'none' },
  teamHeadingStyle: { weight: 600, color: '', effect: 'none' },
  teamRoleStyle: { weight: 400, color: '', effect: 'none' },
  footerTextStyle: { weight: 400, color: '', effect: 'none' },
  ctaStyle: { weight: 600, color: '#ffffff', effect: 'none' },
  // Header & Footer Styling
  headerFont: 'Inter',
  headerTextColor: '#000000',
  headerBackgroundColor: 'transparent',
  headerSticky: false,
  headerTransparent: false,
  footerBackgroundColor: '#1e293b',
  footerTextColor: '#000000',
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

      // Migrate old font field names to new ones
      const migratedState = {
        ...parsed,
        teamNameFont: parsed.teamNameFont || parsed.headingFont || 'Inter',
        teamRoleFont: parsed.teamRoleFont || parsed.bodyFont || 'Inter',
        footerFont: parsed.footerFont || parsed.bodyFont || 'Inter',
        teamNameSize: parsed.teamNameSize || parsed.headingSize || 100,
        teamRoleSize: parsed.teamRoleSize || parsed.bodySize || 100,
      }

      return {
        ...DEFAULT_STATE,
        ...migratedState,
        heroLogo: { ...DEFAULT_STATE.heroLogo, ...parsed.heroLogo },
        heroProductImage: { ...DEFAULT_STATE.heroProductImage, ...parsed.heroProductImage },
        decorativeImages: parsed.decorativeImages || [],
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
  const [previewMode, setPreviewMode] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [domainName, setDomainName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveTeamName, setSaveTeamName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [savedLink, setSavedLink] = useState('')
  const [currentTeamName, setCurrentTeamName] = useState<string | null>(null)

  // Load design from URL if visiting /design/team-name
  useEffect(() => {
    const loadDesignFromURL = async () => {
      const path = window.location.pathname
      const match = path.match(/^\/design\/(.+)$/)
      if (match) {
        const teamNameFromURL = decodeURIComponent(match[1])
        setCurrentTeamName(teamNameFromURL)

        try {
          const { data, error } = await supabase
            .from('saved_designs')
            .select('design_data')
            .eq('team_name', teamNameFromURL)
            .single()

          if (error) {
            console.error('Error loading design:', error)
            return
          }

          if (data) {
            setState(data.design_data)
          }
        } catch (error) {
          console.error('Error loading design:', error)
        }
      }
    }

    loadDesignFromURL()
  }, [])

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

  const handleSaveDesign = async () => {
    const nameToUse = currentTeamName || saveTeamName.trim()

    if (!nameToUse) {
      alert('Please enter your team name')
      return
    }

    setIsSaving(true)
    try {
      // Upsert - insert or update if team_name already exists
      const { error } = await supabase
        .from('saved_designs')
        .upsert([
          {
            team_name: nameToUse,
            design_data: state,
            updated_at: new Date().toISOString()
          }
        ], { onConflict: 'team_name' })

      if (error) throw error

      const link = `${window.location.origin}/design/${encodeURIComponent(nameToUse)}`
      setSavedLink(link)
      setCurrentTeamName(nameToUse)
      setSaveSuccess(true)
    } catch (error) {
      console.error('Error saving design:', error)
      alert('Failed to save design. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmitDesign = async () => {
    if (!teamName.trim()) {
      alert('Please enter your team name')
      return
    }

    // Confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to submit your design as "${teamName.trim()}"?\n\nThis action cannot be undone and you can only submit once per team.`
    )
    if (!confirmed) return

    setIsSubmitting(true)
    try {
      // Check if team already submitted
      const { data: existing } = await supabase
        .from('submissions')
        .select('id')
        .eq('team_name', teamName.trim())
        .single()

      if (existing) {
        alert(`Team "${teamName.trim()}" has already submitted! Contact admin if you need to update.`)
        setIsSubmitting(false)
        return
      }

      const { error } = await supabase
        .from('submissions')
        .insert([
          {
            team_name: teamName.trim(),
            domain_name: domainName.trim() || null,
            design_data: state
          }
        ])

      if (error) throw error

      setSubmitSuccess(true)
      setTimeout(() => {
        setShowSubmitModal(false)
        setSubmitSuccess(false)
        setTeamName('')
        setDomainName('')
      }, 2000)
    } catch (error) {
      console.error('Error submitting design:', error)
      alert('Failed to submit design. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`app-container ${previewMode ? 'preview-mode' : ''}`}>
      <div className={`controls-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="controls-header">
          <div className="controls-header-left">
            <h1>Customizer</h1>
            {currentTeamName && (
              <span className="current-team-badge">Editing: {currentTeamName}</span>
            )}
          </div>
          <div className="controls-header-actions">
            <a href="/admin" className="admin-link" title="View all submissions">
              📊
            </a>
            <button className="preview-toggle-button" onClick={() => setPreviewMode(!previewMode)} title="Toggle preview mode">
              👁️
            </button>
            <button className="save-link-button" onClick={() => setShowSaveModal(true)}>
              Save
            </button>
            <button className="submit-button" onClick={() => setShowSubmitModal(true)}>
              Submit
            </button>
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
        {previewMode && (
          <button className="exit-preview-button" onClick={() => setPreviewMode(false)}>
            ✕ Exit Preview
          </button>
        )}
      </div>

      {/* Save & Share Modal */}
      {showSaveModal && (
        <div className="modal-overlay" onClick={() => !isSaving && setShowSaveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {saveSuccess ? (
              <div className="modal-success">
                <div className="success-icon">💾</div>
                <h2>Design Saved!</h2>
                <p>Share this link with your team:</p>
                <div className="saved-link-display">
                  <input
                    type="text"
                    value={savedLink}
                    readOnly
                    className="link-input"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    className="copy-link-button"
                    onClick={() => {
                      navigator.clipboard.writeText(savedLink)
                      alert('Link copied!')
                    }}
                  >
                    Copy
                  </button>
                </div>
                <p className="save-note">Bookmark this link to continue editing later!</p>
                <button
                  className="modal-button modal-button-submit"
                  onClick={() => {
                    setShowSaveModal(false)
                    setSaveSuccess(false)
                  }}
                  style={{ marginTop: '1rem' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2>Save & Share Your Design</h2>
                {currentTeamName ? (
                  <>
                    <p>Saving as: <strong>{currentTeamName}</strong></p>
                    <p className="save-note">Your design will be updated and you'll get your shareable link.</p>
                  </>
                ) : (
                  <>
                    <p>Enter your team name to save your design and get a shareable link:</p>
                    <input
                      type="text"
                      value={saveTeamName}
                      onChange={(e) => setSaveTeamName(e.target.value)}
                      placeholder="Team Name"
                      className="modal-input"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveDesign()}
                      disabled={isSaving}
                    />
                  </>
                )}
                <div className="modal-actions">
                  <button
                    className="modal-button modal-button-cancel"
                    onClick={() => setShowSaveModal(false)}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-button modal-button-submit"
                    onClick={handleSaveDesign}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setShowSubmitModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {submitSuccess ? (
              <div className="modal-success">
                <div className="success-icon">✓</div>
                <h2>Design Submitted!</h2>
                <p>Your design has been saved successfully.</p>
              </div>
            ) : (
              <>
                <h2>Submit Your Design</h2>
                <p>Enter your team information to submit your design:</p>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team Name (e.g., Team Alpha)"
                  className="modal-input"
                  autoFocus
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  placeholder="Domain Name - Optional (e.g., teamalpha.com)"
                  className="modal-input"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitDesign()}
                  disabled={isSubmitting}
                />
                <div className="modal-actions">
                  <button
                    className="modal-button modal-button-cancel"
                    onClick={() => setShowSubmitModal(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-button modal-button-submit"
                    onClick={handleSubmitDesign}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
