import { useState } from 'react'
import type { AppState, Teammate, HeroLogoConfig, SocialLinks, SectionVisibility, ProductPage, HeroAnimation, SectionAnimation, CardAnimation, HoverStyle, TextAnimation, CardStyle, TeamCardLayout } from '../App'
import { BACKGROUND_PRESETS } from './backgrounds/backgroundPresets'
import PresetThumbnail from './backgrounds/PresetThumbnail'
import './Controls.css'

interface ControlsProps {
    state: AppState
    updateState: (updates: Partial<AppState>) => void
}

const FONT_OPTIONS = [
    // Clean / Modern
    'Inter',
    'DM Sans',
    'Montserrat',
    'Poppins',
    'Outfit',
    'Raleway',
    'Quicksand',
    'Comfortaa',
    'Space Grotesk',
    // Bold / Display
    'Oswald',
    'Bebas Neue',
    'Syne',
    'Unbounded',
    'Righteous',
    // Elegant / Serif
    'Playfair Display',
    'Crimson Pro',
    'Cormorant Garamond',
    'Cinzel',
    'Abril Fatface',
    // Script / Handwritten
    'Dancing Script',
    'Great Vibes',
    'Pacifico',
    'Lobster',
    'Satisfy',
]

const PALETTE_OPTIONS = [
    { id: 'ocean', label: 'Ocean', color: '#0284c7' },
    { id: 'sunset', label: 'Sunset', color: '#ea580c' },
    { id: 'forest', label: 'Forest', color: '#059669' },
    { id: 'grape', label: 'Grape', color: '#9333ea' },
    { id: 'slate', label: 'Slate', color: '#475569' },
    { id: 'sand', label: 'Sand', color: '#b45309' },
]

interface CollapsibleSectionProps {
    title: string
    defaultOpen?: boolean
    children: React.ReactNode
}

const CollapsibleSection = ({ title, defaultOpen = true, children }: CollapsibleSectionProps) => {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <section className="control-section">
            <button
                className="section-header-toggle"
                onClick={() => setOpen(!open)}
                type="button"
            >
                <h3>{title}</h3>
                <span className={`section-chevron ${open ? 'section-chevron--open' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </button>
            <div className={`section-body ${open ? 'section-body--open' : ''}`}>
                <div className="section-body-inner">
                    {children}
                </div>
            </div>
        </section>
    )
}

const Controls = ({ state, updateState }: ControlsProps) => {
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                updateState({ logoUrl: event.target?.result as string })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTeammateImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const newTeammates = state.teammates.map(t =>
                    t.id === id ? { ...t, imageUrl: event.target?.result as string } : t
                )
                updateState({ teammates: newTeammates })
            }
            reader.readAsDataURL(file)
        }
    }

    const updateTeammate = (id: number, field: keyof Teammate, value: string) => {
        const newTeammates = state.teammates.map(t =>
            t.id === id ? { ...t, [field]: value } : t
        )
        updateState({ teammates: newTeammates })
    }

    const handleTeammateCountChange = (count: number) => {
        const currentTeammates = state.teammates
        if (count > currentTeammates.length) {
            const newTeammates = [
                ...currentTeammates,
                ...Array.from({ length: count - currentTeammates.length }, (_, i) => ({
                    id: currentTeammates.length + i,
                    name: `Team Member ${currentTeammates.length + i + 1}`,
                    role: `Role ${currentTeammates.length + i + 1}`,
                    imageUrl: ''
                }))
            ]
            updateState({ teammates: newTeammates })
        } else {
            updateState({ teammates: currentTeammates.slice(0, count) })
        }
    }

    const handleCustomColorChange = (value: string) => {
        if (/^#[0-9A-Fa-f]{6}$/.test(value) || value === '') {
            updateState({ customColor: value })
        }
    }

    const handleSecondaryColorChange = (value: string) => {
        if (/^#[0-9A-Fa-f]{6}$/.test(value) || value === '') {
            updateState({ secondaryColor: value })
        }
    }

    const updateHeroLogo = <K extends keyof HeroLogoConfig>(key: K, value: HeroLogoConfig[K]) => {
        updateState({
            heroLogo: {
                ...state.heroLogo,
                [key]: value,
            }
        })
    }

    const updateSocialLink = (key: keyof SocialLinks, value: string) => {
        updateState({
            socialLinks: { ...state.socialLinks, [key]: value }
        })
    }

    const updateProductPage = (key: keyof ProductPage, value: string) => {
        updateState({
            productPage: { ...state.productPage, [key]: value }
        })
    }

    const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                updateProductPage('imageUrl', event.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTeamGroupImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                updateState({ teamGroupImageUrl: event.target?.result as string })
            }
            reader.readAsDataURL(file)
        }
    }

    const updateSectionVisibility = (key: keyof SectionVisibility, value: boolean) => {
        updateState({
            sections: { ...state.sections, [key]: value }
        })
    }

    const handlePresetSelect = (presetId: string) => {
        const preset = BACKGROUND_PRESETS.find(p => p.id === presetId)
        if (preset) {
            updateState({
                background: {
                    ...state.background,
                    presetId: preset.id,
                    type: preset.type,
                }
            })
        }
    }

    const handleSettingChange = (key: 'intensity' | 'speed' | 'density' | 'blur', value: number) => {
        updateState({
            background: {
                ...state.background,
                settings: {
                    ...state.background.settings,
                    [key]: value,
                }
            }
        })
    }

    const isAnimated = state.background.type === 'animated'

    return (
        <div className="controls-content">
            {/* Hero Section */}
            <CollapsibleSection title="Hero">
                <div className="file-upload">
                    <label htmlFor="logo-upload" className="upload-button">
                        {state.logoUrl ? '✓ Logo Uploaded' : 'Upload Logo'}
                    </label>
                    <input
                        id="logo-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        onChange={handleLogoUpload}
                    />
                </div>

                <div className="option-row">
                    <div className="option-group">
                        <label>Logo Size:</label>
                        <select
                            value={state.heroLogo.size}
                            onChange={(e) => updateHeroLogo('size', e.target.value as HeroLogoConfig['size'])}
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="xlarge">Extra Large</option>
                        </select>
                    </div>
                </div>

                <label>Hero Headline:</label>
                <input
                    type="text"
                    value={state.heroLogo.sideText}
                    onChange={(e) => updateHeroLogo('sideText', e.target.value)}
                    placeholder="Company name or headline..."
                />

                <label>Tagline:</label>
                <input
                    type="text"
                    value={state.heroLogo.tagline}
                    onChange={(e) => updateHeroLogo('tagline', e.target.value)}
                    placeholder="Your company slogan..."
                />

                <div className="option-row">
                    <div className="option-group">
                        <label>Headline Font:</label>
                        <select
                            value={state.heroLogo.sideTextFont}
                            onChange={(e) => updateHeroLogo('sideTextFont', e.target.value)}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                    <div className="option-group">
                        <label>Headline Color:</label>
                        <div className="color-input-group">
                            <input
                                type="color"
                                value={state.heroLogo.sideTextColor || '#000000'}
                                onChange={(e) => updateHeroLogo('sideTextColor', e.target.value)}
                                style={{ width: '50px', height: '32px', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                value={state.heroLogo.sideTextColor}
                                onChange={(e) => updateHeroLogo('sideTextColor', e.target.value)}
                                placeholder="#000000"
                                maxLength={7}
                                style={{ flex: 1 }}
                            />
                        </div>
                    </div>
                </div>

                <div className="position-sliders">
                    <p className="section-hint" style={{ marginTop: '1rem' }}>Logo Position</p>
                    <div className="option-row">
                        <div className="option-group">
                            <label className="slider-label">
                                Logo X
                                <span className="slider-value">{state.heroLogo.logoX}</span>
                            </label>
                            <input
                                type="range"
                                min={-200}
                                max={200}
                                value={state.heroLogo.logoX}
                                onChange={(e) => updateHeroLogo('logoX', Number(e.target.value))}
                            />
                        </div>
                        <div className="option-group">
                            <label className="slider-label">
                                Logo Y
                                <span className="slider-value">{state.heroLogo.logoY}</span>
                            </label>
                            <input
                                type="range"
                                min={-200}
                                max={200}
                                value={state.heroLogo.logoY}
                                onChange={(e) => updateHeroLogo('logoY', Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div className="position-sliders">
                    <p className="section-hint" style={{ marginTop: '1rem' }}>Text Position</p>
                    <div className="option-row">
                        <div className="option-group">
                            <label className="slider-label">
                                Text X
                                <span className="slider-value">{state.heroLogo.textX}</span>
                            </label>
                            <input
                                type="range"
                                min={-200}
                                max={200}
                                value={state.heroLogo.textX}
                                onChange={(e) => updateHeroLogo('textX', Number(e.target.value))}
                            />
                        </div>
                        <div className="option-group">
                            <label className="slider-label">
                                Text Y
                                <span className="slider-value">{state.heroLogo.textY}</span>
                            </label>
                            <input
                                type="range"
                                min={-200}
                                max={200}
                                value={state.heroLogo.textY}
                                onChange={(e) => updateHeroLogo('textY', Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div className="position-sliders">
                    <p className="section-hint" style={{ marginTop: '1rem' }}>Text Effects</p>

                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={state.heroLogo.textGlow}
                            onChange={(e) => updateHeroLogo('textGlow', e.target.checked)}
                        />
                        <span>Glowing Text</span>
                    </label>
                    {state.heroLogo.textGlow && (
                        <div>
                            <label className="slider-label">
                                Glow Intensity
                                <span className="slider-value">{state.heroLogo.textGlowIntensity}</span>
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={state.heroLogo.textGlowIntensity}
                                onChange={(e) => updateHeroLogo('textGlowIntensity', Number(e.target.value))}
                            />
                        </div>
                    )}

                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={state.heroLogo.textShadow}
                            onChange={(e) => updateHeroLogo('textShadow', e.target.checked)}
                        />
                        <span>Text Shadow</span>
                    </label>
                    {state.heroLogo.textShadow && (
                        <div>
                            <label className="slider-label">
                                Shadow Intensity
                                <span className="slider-value">{state.heroLogo.textShadowIntensity}</span>
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={state.heroLogo.textShadowIntensity}
                                onChange={(e) => updateHeroLogo('textShadowIntensity', Number(e.target.value))}
                            />
                        </div>
                    )}

                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={state.heroLogo.textOutline}
                            onChange={(e) => updateHeroLogo('textOutline', e.target.checked)}
                        />
                        <span>Text Outline</span>
                    </label>
                    {state.heroLogo.textOutline && (
                        <div>
                            <label className="slider-label">
                                Outline Width
                                <span className="slider-value">{state.heroLogo.textOutlineWidth}px</span>
                            </label>
                            <input
                                type="range"
                                min={0.5}
                                max={5}
                                step={0.5}
                                value={state.heroLogo.textOutlineWidth}
                                onChange={(e) => updateHeroLogo('textOutlineWidth', Number(e.target.value))}
                            />
                        </div>
                    )}

                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={state.heroGradientText}
                            onChange={(e) => updateState({ heroGradientText: e.target.checked })}
                        />
                        <span>Gradient Text</span>
                    </label>
                    {state.heroGradientText && (
                        <>
                            <label>Gradient From:</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={state.heroGradientFrom || '#ff0000'}
                                    onChange={(e) => updateState({ heroGradientFrom: e.target.value })}
                                    style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                                />
                                <input
                                    type="text"
                                    value={state.heroGradientFrom}
                                    onChange={(e) => updateState({ heroGradientFrom: e.target.value })}
                                    placeholder="#ff0000"
                                    maxLength={7}
                                    style={{ flex: 1 }}
                                />
                            </div>
                            <label>Gradient To:</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={state.heroGradientTo || '#0000ff'}
                                    onChange={(e) => updateState({ heroGradientTo: e.target.value })}
                                    style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                                />
                                <input
                                    type="text"
                                    value={state.heroGradientTo}
                                    onChange={(e) => updateState({ heroGradientTo: e.target.value })}
                                    placeholder="#0000ff"
                                    maxLength={7}
                                    style={{ flex: 1 }}
                                />
                            </div>
                        </>
                    )}

                    <label className="slider-label">
                        Letter Spacing
                        <span className="slider-value">{state.heroLetterSpacing}</span>
                    </label>
                    <input
                        type="range"
                        min={-5}
                        max={20}
                        value={state.heroLetterSpacing}
                        onChange={(e) => updateState({ heroLetterSpacing: Number(e.target.value) })}
                    />
                </div>
            </CollapsibleSection>

            {/* Content Section */}
            <CollapsibleSection title="Content">
                <label>Main Text:</label>
                <textarea
                    value={state.mainText}
                    onChange={(e) => updateState({ mainText: e.target.value })}
                    rows={4}
                    placeholder="Enter your value proposition..."
                />

                <label>Subtext:</label>
                <input
                    type="text"
                    value={state.heroSubtext}
                    onChange={(e) => updateState({ heroSubtext: e.target.value })}
                    placeholder="Building the future, one startup at a time"
                />

            </CollapsibleSection>

            {/* Product Section */}
            <CollapsibleSection title="Product" defaultOpen={false}>
                <label>Heading:</label>
                <input
                    type="text"
                    value={state.productPage.heading}
                    onChange={(e) => updateProductPage('heading', e.target.value)}
                    placeholder="Our Product"
                />

                <label>Description:</label>
                <textarea
                    value={state.productPage.description}
                    onChange={(e) => updateProductPage('description', e.target.value)}
                    rows={4}
                    placeholder="Describe your product..."
                />

                <div className="file-upload">
                    <label htmlFor="product-image-upload" className="upload-button">
                        {state.productPage.imageUrl ? '✓ Image Uploaded' : 'Upload Product Image'}
                    </label>
                    <input
                        id="product-image-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        onChange={handleProductImageUpload}
                    />
                </div>
            </CollapsibleSection>

            {/* Team Section */}
            <CollapsibleSection title="Team">
                <label>Section Heading:</label>
                <input
                    type="text"
                    value={state.teamHeading}
                    onChange={(e) => updateState({ teamHeading: e.target.value })}
                    placeholder="Meet Our Team"
                />

                <label>Section Subheading:</label>
                <input
                    type="text"
                    value={state.teamSubheading}
                    onChange={(e) => updateState({ teamSubheading: e.target.value })}
                    placeholder="The passionate people behind our success"
                />

                <label>Display Mode:</label>
                <select
                    value={state.teamDisplayMode}
                    onChange={(e) => updateState({ teamDisplayMode: e.target.value as 'individual' | 'group' })}
                >
                    <option value="individual">Individual Photos</option>
                    <option value="group">Group Photo</option>
                </select>

                <div className="option-group">
                    <label>Card Style:</label>
                    <select
                        value={state.cardStyle}
                        onChange={(e) => updateState({ cardStyle: e.target.value as CardStyle })}
                    >
                        <option value="glass">Glass</option>
                        <option value="solid">Solid</option>
                        <option value="outline">Outline</option>
                        <option value="shadow">Shadow</option>
                    </select>
                </div>

                <label className="slider-label">
                    Card Roundness
                    <span className="slider-value">{state.cardBorderRadius}px</span>
                </label>
                <input
                    type="range"
                    min={0}
                    max={50}
                    value={state.cardBorderRadius}
                    onChange={(e) => updateState({ cardBorderRadius: Number(e.target.value) })}
                />

                <div className="option-group">
                    <label>Card Layout:</label>
                    <select
                        value={state.teamCardLayout}
                        onChange={(e) => updateState({ teamCardLayout: e.target.value as TeamCardLayout })}
                    >
                        <option value="grid">Grid</option>
                        <option value="carousel">Carousel</option>
                        <option value="stacked">Stacked</option>
                    </select>
                </div>

                {state.teamDisplayMode === 'group' ? (
                    <>
                        <div className="file-upload" style={{ marginTop: '1rem' }}>
                            <label htmlFor="team-group-upload" className="upload-button">
                                {state.teamGroupImageUrl ? '✓ Group Photo Uploaded' : 'Upload Group Photo'}
                            </label>
                            <input
                                id="team-group-upload"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleTeamGroupImageUpload}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="teammate-count">
                            <label>Members:</label>
                            <select
                                value={state.teammates.length}
                                onChange={(e) => handleTeammateCountChange(Number(e.target.value))}
                            >
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                        </div>

                        <div className="teammates-list">
                            {state.teammates.map((teammate) => (
                                <div key={teammate.id} className="teammate-control">
                                    <h4>Teammate {teammate.id + 1}</h4>
                                    <div className="file-upload">
                                        <label htmlFor={`teammate-${teammate.id}`} className="upload-button small">
                                            {teammate.imageUrl ? '✓ Image' : 'Upload'}
                                        </label>
                                        <input
                                            id={`teammate-${teammate.id}`}
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            onChange={(e) => handleTeammateImageUpload(teammate.id, e)}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={teammate.name}
                                        onChange={(e) => updateTeammate(teammate.id, 'name', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        value={teammate.role}
                                        onChange={(e) => updateTeammate(teammate.id, 'role', e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </CollapsibleSection>

            {/* Links Section */}
            <CollapsibleSection title="Links">
                <label>Instagram URL:</label>
                <input
                    type="url"
                    value={state.socialLinks.instagram}
                    onChange={(e) => updateSocialLink('instagram', e.target.value)}
                    placeholder="https://instagram.com/yourpage"
                />
                <label>Twitter / X URL:</label>
                <input
                    type="url"
                    value={state.socialLinks.twitter}
                    onChange={(e) => updateSocialLink('twitter', e.target.value)}
                    placeholder="https://x.com/yourpage"
                />
                <label>LinkedIn URL:</label>
                <input
                    type="url"
                    value={state.socialLinks.linkedin}
                    onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/yourpage"
                />
                <label>TikTok URL:</label>
                <input
                    type="url"
                    value={state.socialLinks.tiktok}
                    onChange={(e) => updateSocialLink('tiktok', e.target.value)}
                    placeholder="https://tiktok.com/@yourpage"
                />
                <label>Contact Email:</label>
                <input
                    type="email"
                    value={state.contactEmail}
                    onChange={(e) => updateState({ contactEmail: e.target.value })}
                    placeholder="hello@incubator.com"
                />
            </CollapsibleSection>

            {/* Background Section */}
            <CollapsibleSection title="Background">
                <div className="preset-grid">
                    {BACKGROUND_PRESETS.map((preset) => (
                        <PresetThumbnail
                            key={preset.id}
                            presetId={preset.id}
                            name={preset.name}
                            selected={state.background.presetId === preset.id}
                            onClick={() => handlePresetSelect(preset.id)}
                        />
                    ))}
                </div>

                <div className="bg-sliders">
                    <label className="slider-label">
                        Intensity
                        <span className="slider-value">{state.background.settings.intensity}</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={state.background.settings.intensity}
                        onChange={(e) => handleSettingChange('intensity', Number(e.target.value))}
                    />

                    <label className="slider-label">
                        Blur
                        <span className="slider-value">{state.background.settings.blur}</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={20}
                        value={state.background.settings.blur}
                        onChange={(e) => handleSettingChange('blur', Number(e.target.value))}
                    />

                    {isAnimated && (
                        <>
                            <label className="slider-label">
                                Speed
                                <span className="slider-value">{state.background.settings.speed}</span>
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={state.background.settings.speed}
                                onChange={(e) => handleSettingChange('speed', Number(e.target.value))}
                            />

                            <label className="slider-label">
                                Density
                                <span className="slider-value">{state.background.settings.density}</span>
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={state.background.settings.density}
                                onChange={(e) => handleSettingChange('density', Number(e.target.value))}
                            />
                        </>
                    )}
                </div>
            </CollapsibleSection>

            {/* Animations Section */}
            <CollapsibleSection title="Animations" defaultOpen={false}>
                <div className="option-group">
                    <label>Hero Entrance:</label>
                    <select
                        value={state.heroAnimation}
                        onChange={(e) => updateState({ heroAnimation: e.target.value as HeroAnimation })}
                    >
                        <option value="none">None</option>
                        <option value="fade-in">Fade In</option>
                        <option value="slide-up">Slide Up</option>
                        <option value="scale-in">Scale In</option>
                        <option value="typewriter">Typewriter</option>
                    </select>
                </div>

                <div className="option-group">
                    <label>Section Entrance:</label>
                    <select
                        value={state.sectionAnimation}
                        onChange={(e) => updateState({ sectionAnimation: e.target.value as SectionAnimation })}
                    >
                        <option value="none">None</option>
                        <option value="fade-in">Fade In</option>
                        <option value="slide-up">Slide Up</option>
                        <option value="scale-in">Scale In</option>
                    </select>
                </div>

                <div className="option-group">
                    <label>Card Entrance:</label>
                    <select
                        value={state.cardAnimation}
                        onChange={(e) => updateState({ cardAnimation: e.target.value as CardAnimation })}
                    >
                        <option value="none">None</option>
                        <option value="fade-in">Fade In</option>
                        <option value="slide-up">Slide Up</option>
                        <option value="flip">Flip</option>
                        <option value="bounce">Bounce</option>
                    </select>
                </div>

                <div className="option-group">
                    <label>Card Hover Effect:</label>
                    <select
                        value={state.hoverStyle}
                        onChange={(e) => updateState({ hoverStyle: e.target.value as HoverStyle })}
                    >
                        <option value="none">None</option>
                        <option value="lift">Lift</option>
                        <option value="grow">Grow</option>
                        <option value="glow">Glow</option>
                        <option value="tilt">Tilt</option>
                    </select>
                </div>

                <div className="option-group">
                    <label>Hero Text Animation:</label>
                    <select
                        value={state.heroTextAnimation}
                        onChange={(e) => updateState({ heroTextAnimation: e.target.value as TextAnimation })}
                    >
                        <option value="none">None</option>
                        <option value="color-shift">Color Shift</option>
                        <option value="shimmer">Shimmer</option>
                    </select>
                </div>
            </CollapsibleSection>

            {/* Theme Section */}
            <CollapsibleSection title="Theme">
                <label>Palette:</label>
                <div className="palette-swatches">
                    {PALETTE_OPTIONS.map(p => (
                        <button
                            key={p.id}
                            className={`palette-swatch ${state.palette === p.id && !state.customColor ? 'palette-swatch--selected' : ''}`}
                            onClick={() => updateState({ palette: p.id, customColor: '', secondaryColor: '' })}
                            type="button"
                            title={p.label}
                        >
                            <span className="swatch-circle" style={{ backgroundColor: p.color }} />
                            <span className="swatch-label">{p.label}</span>
                        </button>
                    ))}
                </div>

                <label>Custom Primary Color:</label>
                <div className="color-input-group">
                    <input
                        type="color"
                        value={state.customColor || '#3b82f6'}
                        onChange={(e) => updateState({ customColor: e.target.value })}
                        style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={state.customColor}
                        onChange={(e) => handleCustomColorChange(e.target.value)}
                        placeholder="#3b82f6"
                        maxLength={7}
                        style={{ flex: 1 }}
                    />
                </div>

                <label>Custom Secondary Color:</label>
                <div className="color-input-group">
                    <input
                        type="color"
                        value={state.secondaryColor || '#06b6d4'}
                        onChange={(e) => updateState({ secondaryColor: e.target.value })}
                        style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={state.secondaryColor}
                        onChange={(e) => handleSecondaryColorChange(e.target.value)}
                        placeholder="#06b6d4"
                        maxLength={7}
                        style={{ flex: 1 }}
                    />
                </div>
            </CollapsibleSection>

            {/* Typography Section */}
            <CollapsibleSection title="Typography">
                <div className="option-row">
                    <div className="option-group">
                        <label>Heading Font:</label>
                        <select
                            value={state.headingFont}
                            onChange={(e) => updateState({ headingFont: e.target.value })}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f} style={{ fontFamily: `'${f}', sans-serif` }}>{f}</option>
                            ))}
                        </select>
                    </div>
                    <div className="option-group">
                        <label>Body Font:</label>
                        <select
                            value={state.bodyFont}
                            onChange={(e) => updateState({ bodyFont: e.target.value })}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f} style={{ fontFamily: `'${f}', sans-serif` }}>{f}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-sliders">
                    <label className="slider-label">
                        Heading Size
                        <span className="slider-value">{state.headingSize}%</span>
                    </label>
                    <input
                        type="range"
                        min={50}
                        max={200}
                        value={state.headingSize}
                        onChange={(e) => updateState({ headingSize: Number(e.target.value) })}
                    />

                    <label className="slider-label">
                        Body Size
                        <span className="slider-value">{state.bodySize}%</span>
                    </label>
                    <input
                        type="range"
                        min={50}
                        max={200}
                        value={state.bodySize}
                        onChange={(e) => updateState({ bodySize: Number(e.target.value) })}
                    />
                </div>
            </CollapsibleSection>

            {/* Sections & Pages */}
            <CollapsibleSection title="Sections">
                <p className="section-hint">Toggle which sections and pages are visible.</p>
                <div className="visibility-toggles">
                    {([
                        ['hero', 'Hero'],
                        ['uvp', 'Value Prop'],
                        ['team', 'Team'],
                        ['footer', 'Footer'],
                    ] as [keyof typeof state.sections, string][]).map(([key, label]) => (
                        <label key={key} className="toggle-switch-label">
                            <span>{label}</span>
                            <div className={`toggle-switch ${state.sections[key] ? 'toggle-switch--on' : ''}`}
                                onClick={() => updateSectionVisibility(key, !state.sections[key])}
                            >
                                <div className="toggle-switch-thumb" />
                            </div>
                        </label>
                    ))}
                    <label className="toggle-switch-label">
                        <span>Product Page</span>
                        <div className={`toggle-switch ${state.productPageEnabled ? 'toggle-switch--on' : ''}`}
                            onClick={() => updateState({ productPageEnabled: !state.productPageEnabled })}
                        >
                            <div className="toggle-switch-thumb" />
                        </div>
                    </label>
                </div>

                <label style={{ marginTop: '0.75rem' }}>Team Location:</label>
                <select
                    value={state.teamLocation}
                    onChange={(e) => updateState({ teamLocation: e.target.value as 'home' | 'separate' })}
                >
                    <option value="home">Home Page</option>
                    <option value="separate">Separate Page</option>
                </select>
            </CollapsibleSection>
        </div>
    )
}

export default Controls
