import { useState } from 'react'
import type { AppState, Teammate, HeroLogoConfig, HeroProductImage, DecorativeImage, SocialLinks, SectionVisibility, ProductPage, HeroAnimation, SectionAnimation, CardAnimation, HoverStyle, TextAnimation, CardStyle, TeamCardLayout } from '../App'
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
    'Black Ops One',
    'Anton',
    'Archivo Black',
    'Kanit',
    'Russo One',
    'Bowlby One SC',
    'Bungee',
    'Exo 2',
    'Fjalla One',
    'Permanent Marker',
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
    'Chewy',
    'Spicy Rice',
    'Titan One',
    'Fredoka',
    'Modak',
    'Chaeoi',
    'Shrikhand',
    'Coiny',
    'Dela Gothic One',
    'Baloo 2',
    'Chicle',
    'Bungee',
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

const TextControl = ({
    label,
    style,
    onChange
}: {
    label: string,
    style: any, // Using any for simplicity here, ideally matches TextStyle
    onChange: (newStyle: any) => void
}) => {
    // Helper to ensure style object has defaults if undefined
    const s = { weight: 400, color: '', effect: 'none', ...style }

    return (
        <div className="option-group" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>
            <label style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>{label} Style</label>

            <div className="option-row">
                <div className="option-group">
                    <label className="slider-label">
                        Weight
                        <span className="slider-value">{s.weight}</span>
                    </label>
                    <input
                        type="range"
                        min={100}
                        max={900}
                        step={100}
                        value={s.weight}
                        onChange={(e) => onChange({ ...s, weight: Number(e.target.value) })}
                    />
                </div>
                <div className="option-group">
                    <label>Color</label>
                    <div className="color-input-group">
                        <input
                            type="color"
                            value={s.color || '#000000'}
                            onChange={(e) => onChange({ ...s, color: e.target.value })}
                            style={{ width: '40px', height: '32px', cursor: 'pointer' }}
                        />
                        <button
                            type="button"
                            className="clear-color-btn"
                            onClick={() => onChange({ ...s, color: '' })}
                            title="Reset to default"
                            style={{ padding: '0 6px', fontSize: '12px' }}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            </div>

            <div className="option-group">
                <label>Effect</label>
                <select
                    value={s.effect}
                    onChange={(e) => onChange({ ...s, effect: e.target.value })}
                >
                    <option value="none">None</option>
                    <option value="shadow">Shadow</option>
                    <option value="glow">Glow</option>
                    <option value="outline">Outline</option>
                </select>
            </div>
        </div>
    )
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
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

    const updateHeroProductImage = <K extends keyof HeroProductImage>(key: K, value: HeroProductImage[K]) => {
        updateState({
            heroProductImage: {
                ...state.heroProductImage,
                [key]: value,
            }
        })
    }

    const handleHeroProductUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                updateState({
                    heroProductImage: {
                        ...state.heroProductImage,
                        url: event.target?.result as string
                    }
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDecorativeImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const newImages = state.decorativeImages.map(img =>
                    img.id === id ? { ...img, url: event.target?.result as string } : img
                )
                updateState({ decorativeImages: newImages })
            }
            reader.readAsDataURL(file)
        }
    }

    const addDecorativeImage = () => {
        const newImage: DecorativeImage = {
            id: Date.now().toString(),
            url: '',
            x: 0,
            y: 50,
            scale: 100,
            rotation: 0,
            zIndex: 5,
        }
        updateState({ decorativeImages: [...state.decorativeImages, newImage] })
    }

    const removeDecorativeImage = (id: string) => {
        updateState({
            decorativeImages: state.decorativeImages.filter(img => img.id !== id)
        })
    }

    const updateDecorativeImage = (id: string, key: keyof DecorativeImage, value: string | number) => {
        const newImages = state.decorativeImages.map(img =>
            img.id === id ? { ...img, [key]: value } : img
        )
        updateState({ decorativeImages: newImages })
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
            {/* Sections & Pages - Control what appears */}
            <CollapsibleSection title="Sections & Pages">
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

            {/* Theme & Colors Section */}
            <CollapsibleSection title="Theme & Colors">
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

            {/* Background Section */}
            <CollapsibleSection title="Background" defaultOpen={false}>
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

                <label>Background Color 1:</label>
                <div className="color-input-group">
                    <input
                        type="color"
                        value={state.background.color1 || '#3b82f6'}
                        onChange={(e) => updateState({ background: { ...state.background, color1: e.target.value } })}
                        style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={state.background.color1}
                        onChange={(e) => {
                            const v = e.target.value
                            if (/^#[0-9A-Fa-f]{0,6}$/.test(v) || v === '') {
                                updateState({ background: { ...state.background, color1: v } })
                            }
                        }}
                        placeholder="Theme default"
                        maxLength={7}
                        style={{ flex: 1 }}
                    />
                    {state.background.color1 && (
                        <button
                            type="button"
                            className="clear-color-btn"
                            onClick={() => updateState({ background: { ...state.background, color1: '' } })}
                            title="Reset to theme color"
                            style={{ padding: '0 8px', cursor: 'pointer', fontSize: '14px', background: 'none', border: '1px solid var(--border)', borderRadius: '4px' }}
                        >
                            &times;
                        </button>
                    )}
                </div>

                <label>Background Color 2:</label>
                <div className="color-input-group">
                    <input
                        type="color"
                        value={state.background.color2 || '#06b6d4'}
                        onChange={(e) => updateState({ background: { ...state.background, color2: e.target.value } })}
                        style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={state.background.color2}
                        onChange={(e) => {
                            const v = e.target.value
                            if (/^#[0-9A-Fa-f]{0,6}$/.test(v) || v === '') {
                                updateState({ background: { ...state.background, color2: v } })
                            }
                        }}
                        placeholder="Theme default"
                        maxLength={7}
                        style={{ flex: 1 }}
                    />
                    {state.background.color2 && (
                        <button
                            type="button"
                            className="clear-color-btn"
                            onClick={() => updateState({ background: { ...state.background, color2: '' } })}
                            title="Reset to theme color"
                            style={{ padding: '0 8px', cursor: 'pointer', fontSize: '14px', background: 'none', border: '1px solid var(--border)', borderRadius: '4px' }}
                        >
                            &times;
                        </button>
                    )}
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

            {/* Header Section */}
            <CollapsibleSection title="Header" defaultOpen={false}>
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

                <div className="option-row" style={{ marginTop: '1rem' }}>
                    <div className="option-group">
                        <label>Font:</label>
                        <select
                            value={state.headerFont}
                            onChange={(e) => updateState({ headerFont: e.target.value })}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <label>Text Color:</label>
                <div className="color-input-group">
                    <input
                        type="color"
                        value={state.headerTextColor || '#000000'}
                        onChange={(e) => updateState({ headerTextColor: e.target.value })}
                        style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={state.headerTextColor}
                        onChange={(e) => updateState({ headerTextColor: e.target.value })}
                        placeholder="#000000"
                        maxLength={7}
                        style={{ flex: 1 }}
                    />
                </div>

                <label>Background Color:</label>
                <div className="color-input-group">
                    <input
                        type="color"
                        value={state.headerBackgroundColor === 'transparent' ? '#ffffff' : state.headerBackgroundColor}
                        onChange={(e) => updateState({ headerBackgroundColor: e.target.value })}
                        style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={state.headerBackgroundColor}
                        onChange={(e) => updateState({ headerBackgroundColor: e.target.value })}
                        placeholder="transparent"
                        maxLength={20}
                        style={{ flex: 1 }}
                    />
                </div>
            </CollapsibleSection>

            {/* Hero Layout Section */}
            <CollapsibleSection title="Hero Layout" defaultOpen={false}>
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

                <div className="option-group">
                    <label className="slider-label">
                        Hero Height
                        <span className="slider-value">{state.heroHeight}px</span>
                    </label>
                    <input
                        type="range"
                        min={300}
                        max={700}
                        value={state.heroHeight}
                        onChange={(e) => updateState({ heroHeight: Number(e.target.value) })}
                    />
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
            </CollapsibleSection>

            {/* Hero Product Image Section */}
            <CollapsibleSection title="Hero Product Image" defaultOpen={false}>
                <label className="toggle-switch-label">
                    <span>Show Product Image</span>
                    <div className={`toggle-switch ${state.heroProductImage.visible ? 'toggle-switch--on' : ''}`}
                        onClick={() => updateHeroProductImage('visible', !state.heroProductImage.visible)}
                    >
                        <div className="toggle-switch-thumb" />
                    </div>
                </label>

                <div className="file-upload">
                    <label htmlFor="hero-product-upload" className="upload-button">
                        {state.heroProductImage.url ? '✓ Product Image Uploaded' : 'Upload Product Image'}
                    </label>
                    <input
                        id="hero-product-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleHeroProductUpload}
                    />
                </div>

                <div className="position-sliders">
                    <p className="section-hint" style={{ marginTop: '1rem' }}>Position</p>
                    <div className="option-row">
                        <div className="option-group">
                            <label className="slider-label">
                                X Position
                                <span className="slider-value">{state.heroProductImage.x}</span>
                            </label>
                            <input
                                type="range"
                                min={-200}
                                max={200}
                                value={state.heroProductImage.x}
                                onChange={(e) => updateHeroProductImage('x', Number(e.target.value))}
                            />
                        </div>
                        <div className="option-group">
                            <label className="slider-label">
                                Y Position
                                <span className="slider-value">{state.heroProductImage.y}</span>
                            </label>
                            <input
                                type="range"
                                min={-200}
                                max={200}
                                value={state.heroProductImage.y}
                                onChange={(e) => updateHeroProductImage('y', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <label className="slider-label">
                        Scale
                        <span className="slider-value">{state.heroProductImage.scale}%</span>
                    </label>
                    <input
                        type="range"
                        min={50}
                        max={200}
                        value={state.heroProductImage.scale}
                        onChange={(e) => updateHeroProductImage('scale', Number(e.target.value))}
                    />
                </div>
            </CollapsibleSection>

            {/* Decorative Floating Images Section */}
            <CollapsibleSection title="Decorative Floating Images" defaultOpen={false}>
                <p className="section-hint">Add decorative images that float around your page (like oranges, splashes, etc.)</p>

                <button
                    className="upload-button"
                    onClick={addDecorativeImage}
                    type="button"
                    style={{ width: '100%', marginBottom: '1rem' }}
                >
                    + Add Decorative Image
                </button>

                {state.decorativeImages.length === 0 && (
                    <p style={{ color: 'var(--muted-text)', fontSize: '0.875rem', textAlign: 'center', margin: '1rem 0' }}>
                        No decorative images added yet
                    </p>
                )}

                {state.decorativeImages.map((img, index) => (
                    <div key={img.id} className="decorative-image-control" style={{
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1rem',
                        background: 'var(--card-bg)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h4 style={{ margin: 0 }}>Decorative Image {index + 1}</h4>
                            <button
                                onClick={() => removeDecorativeImage(img.id)}
                                className="upload-button"
                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', background: '#ef4444' }}
                                type="button"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="file-upload">
                            <label htmlFor={`decorative-${img.id}`} className="upload-button small">
                                {img.url ? '✓ Image Uploaded' : 'Upload Image'}
                            </label>
                            <input
                                id={`decorative-${img.id}`}
                                type="file"
                                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                onChange={(e) => handleDecorativeImageUpload(img.id, e)}
                            />
                        </div>

                        <div className="option-row">
                            <div className="option-group">
                                <label className="slider-label">
                                    X Position
                                    <span className="slider-value">{img.x}%</span>
                                </label>
                                <input
                                    type="range"
                                    min={-100}
                                    max={100}
                                    value={img.x}
                                    onChange={(e) => updateDecorativeImage(img.id, 'x', Number(e.target.value))}
                                />
                            </div>
                            <div className="option-group">
                                <label className="slider-label">
                                    Y Position
                                    <span className="slider-value">{img.y}%</span>
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={img.y}
                                    onChange={(e) => updateDecorativeImage(img.id, 'y', Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="option-row">
                            <div className="option-group">
                                <label className="slider-label">
                                    Scale
                                    <span className="slider-value">{img.scale}%</span>
                                </label>
                                <input
                                    type="range"
                                    min={20}
                                    max={150}
                                    value={img.scale}
                                    onChange={(e) => updateDecorativeImage(img.id, 'scale', Number(e.target.value))}
                                />
                            </div>
                            <div className="option-group">
                                <label className="slider-label">
                                    Rotation
                                    <span className="slider-value">{img.rotation}°</span>
                                </label>
                                <input
                                    type="range"
                                    min={-180}
                                    max={180}
                                    value={img.rotation}
                                    onChange={(e) => updateDecorativeImage(img.id, 'rotation', Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <label className="slider-label">
                            Layer (Z-Index)
                            <span className="slider-value">{img.zIndex}</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={img.zIndex}
                            onChange={(e) => updateDecorativeImage(img.id, 'zIndex', Number(e.target.value))}
                        />
                    </div>
                ))}
            </CollapsibleSection>

            {/* Hero Headline Section */}
            <CollapsibleSection title="Hero Headline" defaultOpen={false}>
                <label className="toggle-switch-label">
                    <span>Show Headline</span>
                    <div className={`toggle-switch ${state.heroHeadlineVisible ? 'toggle-switch--on' : ''}`}
                        onClick={() => updateState({ heroHeadlineVisible: !state.heroHeadlineVisible })}
                    >
                        <div className="toggle-switch-thumb" />
                    </div>
                </label>

                <label>Headline Text:</label>
                <input
                    type="text"
                    value={state.heroLogo.sideText}
                    onChange={(e) => updateHeroLogo('sideText', e.target.value)}
                    placeholder="Company name or headline..."
                />

                <div className="option-row">
                    <div className="option-group">
                        <label>Font:</label>
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
                        <label>Color:</label>
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


                <label className="slider-label">
                    Headline Size
                    <span className="slider-value">{state.heroHeadlineSize}%</span>
                </label>
                <TextControl
                    label="Headline"
                    style={state.heroHeadlineStyle}
                    onChange={(newStyle) => updateState({ heroHeadlineStyle: newStyle })}
                />
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.heroHeadlineSize}
                    onChange={(e) => updateState({ heroHeadlineSize: Number(e.target.value) })}
                />

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

                <div className="option-row">
                    <div className="option-group">
                        <label className="slider-label">
                            Font Weight
                            <span className="slider-value">{state.heroFontWeight}</span>
                        </label>
                        <input
                            type="range"
                            min={100}
                            max={900}
                            step={100}
                            value={state.heroFontWeight}
                            onChange={(e) => updateState({ heroFontWeight: Number(e.target.value) })}
                        />
                    </div>
                    <div className="option-group">
                        <label>Text Animation:</label>
                        <select
                            value={state.heroTextAnimation}
                            onChange={(e) => updateState({ heroTextAnimation: e.target.value as TextAnimation })}
                        >
                            <option value="none">None</option>
                            <option value="typing">Typewriter</option>
                            <option value="color-shift">Color Shift (Rainbow)</option>
                            <option value="shimmer">Shimmer</option>
                        </select>
                    </div>
                </div>
            </CollapsibleSection >

            {/* Hero Tagline Section */}
            < CollapsibleSection title="Hero Tagline" defaultOpen={false} >
                <label className="toggle-switch-label">
                    <span>Show Tagline</span>
                    <div className={`toggle-switch ${state.heroTaglineVisible ? 'toggle-switch--on' : ''}`}
                        onClick={() => updateState({ heroTaglineVisible: !state.heroTaglineVisible })}
                    >
                        <div className="toggle-switch-thumb" />
                    </div>
                </label>

                <label>Tagline Text:</label>
                <input
                    type="text"
                    value={state.heroLogo.tagline}
                    onChange={(e) => updateHeroLogo('tagline', e.target.value)}
                    placeholder="Your company slogan..."
                />
            </CollapsibleSection >

            {/* Main Text / UVP Section */}
            < CollapsibleSection title="Main Text / UVP" defaultOpen={false} >
                <label>Text:</label>
                <textarea
                    value={state.mainText}
                    onChange={(e) => updateState({ mainText: e.target.value })}
                    rows={4}
                    placeholder="Enter your value proposition..."
                />

                <div className="option-row">
                    <div className="option-group">
                        <label>Font:</label>
                        <select
                            value={state.mainTextFont}
                            onChange={(e) => updateState({ mainTextFont: e.target.value })}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <label className="slider-label">
                    Size
                    <span className="slider-value">{state.mainTextSize}%</span>
                </label>
                <TextControl
                    label="Main Text"
                    style={state.mainTextStyle}
                    onChange={(newStyle) => updateState({ mainTextStyle: newStyle })}
                />
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.mainTextSize}
                    onChange={(e) => updateState({ mainTextSize: Number(e.target.value) })}
                />

                <label style={{ marginTop: '1rem' }}>CTA Button Text:</label>
                <input
                    type="text"
                    value={state.ctaText}
                    onChange={(e) => updateState({ ctaText: e.target.value })}
                    placeholder="Get Started"
                />

                <label className="slider-label">
                    CTA Text Size
                    <span className="slider-value">{state.ctaTextSize}%</span>
                </label>
                <TextControl
                    label="CTA Button"
                    style={state.ctaStyle}
                    onChange={(newStyle) => updateState({ ctaStyle: newStyle })}
                />
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.ctaTextSize}
                    onChange={(e) => updateState({ ctaTextSize: Number(e.target.value) })}
                />
            </CollapsibleSection >

            {/* Subtext Section */}
            < CollapsibleSection title="Subtext" defaultOpen={false} >
                <label className="toggle-switch-label">
                    <span>Show Subtext</span>
                    <div className={`toggle-switch ${state.subtextVisible ? 'toggle-switch--on' : ''}`}
                        onClick={() => updateState({ subtextVisible: !state.subtextVisible })}
                    >
                        <div className="toggle-switch-thumb" />
                    </div>
                </label>

                <label>Text:</label>
                <input
                    type="text"
                    value={state.heroSubtext}
                    onChange={(e) => updateState({ heroSubtext: e.target.value })}
                    placeholder="Building the future, one startup at a time"
                />

                <div className="option-row">
                    <div className="option-group">
                        <label>Font:</label>
                        <select
                            value={state.subtextFont}
                            onChange={(e) => updateState({ subtextFont: e.target.value })}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <label className="slider-label">
                    Size
                    <span className="slider-value">{state.subtextSize}%</span>
                </label>
                <TextControl
                    label="Subtext"
                    style={state.subtextStyle}
                    onChange={(newStyle) => updateState({ subtextStyle: newStyle })}
                />
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.subtextSize}
                    onChange={(e) => updateState({ subtextSize: Number(e.target.value) })}
                />
            </CollapsibleSection >

            {/* Product Section */}
            < CollapsibleSection title="Product" defaultOpen={false} >
                <div className="option-row" style={{ marginTop: '1rem' }}>
                    <div className="option-group">
                        <label>Layout</label>
                        <select
                            value={state.productPage.layout || 'right'}
                            onChange={(e) => updateProductPage('layout', e.target.value)}
                        >
                            <option value="right">Image Right</option>
                            <option value="left">Image Left</option>
                            <option value="top">Image Top</option>
                            <option value="bottom">Image Bottom</option>
                        </select>
                    </div>
                </div>

                <label className="slider-label">
                    Image Size
                    <span className="slider-value">{state.productPage.imageSize || 50}%</span>
                </label>
                <input
                    type="range"
                    min={20}
                    max={80}
                    value={state.productPage.imageSize || 50}
                    onChange={(e) => updateProductPage('imageSize', Number(e.target.value))}
                />

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
            </CollapsibleSection >

            {/* Team Heading Section */}
            < CollapsibleSection title="Team Heading" defaultOpen={false} >
                <label>Text:</label>
                <input
                    type="text"
                    value={state.teamHeading}
                    onChange={(e) => updateState({ teamHeading: e.target.value })}
                    placeholder="Meet Our Team"
                />

                <div className="option-row">
                    <div className="option-group">
                        <label>Font:</label>
                        <select
                            value={state.teamHeadingFont}
                            onChange={(e) => updateState({ teamHeadingFont: e.target.value })}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <label className="slider-label">
                    Size
                    <span className="slider-value">{state.teamHeadingSize}%</span>
                </label>
                <TextControl
                    label="Team Heading"
                    style={state.teamHeadingStyle}
                    onChange={(newStyle) => updateState({ teamHeadingStyle: newStyle })}
                />
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.teamHeadingSize}
                    onChange={(e) => updateState({ teamHeadingSize: Number(e.target.value) })}
                />
            </CollapsibleSection >

            {/* Team Subheading Section */}
            < CollapsibleSection title="Team Subheading" defaultOpen={false} >
                <label>Text:</label>
                <input
                    type="text"
                    value={state.teamSubheading}
                    onChange={(e) => updateState({ teamSubheading: e.target.value })}
                    placeholder="The passionate people behind our success"
                />

                <div className="option-row">
                    <div className="option-group">
                        <label>Font:</label>
                        <select
                            value={state.teamSubheadingFont}
                            onChange={(e) => updateState({ teamSubheadingFont: e.target.value })}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <label className="slider-label">
                    Size
                    <span className="slider-value">{state.teamSubheadingSize}%</span>
                </label>
                <TextControl
                    label="Team Subheading"
                    style={state.teamRoleStyle} // Using role style as general text style for now or add specific
                    onChange={(newStyle) => updateState({ teamRoleStyle: newStyle })}
                />
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.teamSubheadingSize}
                    onChange={(e) => updateState({ teamSubheadingSize: Number(e.target.value) })}
                />
            </CollapsibleSection >

            {/* Team Section */}
            < CollapsibleSection title="Team Section" defaultOpen={false} >
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

                {
                    state.teamDisplayMode === 'group' ? (
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
                    )
                }

                <p className="section-hint" style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>Typography</p>

                <label>Team Member Names Font:</label>
                <select
                    value={state.teamNameFont}
                    onChange={(e) => updateState({ teamNameFont: e.target.value })}
                >
                    {FONT_OPTIONS.map(f => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>

                <label className="slider-label">
                    Team Name Size
                    <span className="slider-value">{state.teamNameSize}%</span>
                </label>
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.teamNameSize}
                    onChange={(e) => updateState({ teamNameSize: Number(e.target.value) })}
                />

                <label style={{ marginTop: '1rem' }}>Team Member Roles Font:</label>
                <select
                    value={state.teamRoleFont}
                    onChange={(e) => updateState({ teamRoleFont: e.target.value })}
                >
                    {FONT_OPTIONS.map(f => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>

                <label className="slider-label">
                    Team Role Size
                    <span className="slider-value">{state.teamRoleSize}%</span>
                </label>
                <TextControl
                    label="Team Names"
                    style={state.teamRoleStyle}
                    onChange={(newStyle) => updateState({ teamRoleStyle: newStyle })}
                />
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.teamRoleSize}
                    onChange={(e) => updateState({ teamRoleSize: Number(e.target.value) })}
                />
            </CollapsibleSection >

            {/* Footer Section */}
            <CollapsibleSection title="Footer" defaultOpen={false}>
                <div className="option-row" style={{ marginBottom: '1rem' }}>
                    <div className="option-group">
                        <label>Font:</label>
                        <select
                            value={state.footerFont}
                            onChange={(e) => updateState({ footerFont: e.target.value })}
                        >
                            {FONT_OPTIONS.map(f => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <label className="slider-label">
                    Text Size
                    <span className="slider-value">{state.footerTextSize}%</span>
                </label>
                <input
                    type="range"
                    min={50}
                    max={200}
                    value={state.footerTextSize}
                    onChange={(e) => updateState({ footerTextSize: Number(e.target.value) })}
                />

                <label style={{ marginTop: '1rem' }}>Background Color:</label>
                <div className="color-input-group">
                    <input
                        type="color"
                        value={state.footerBackgroundColor === 'transparent' ? '#ffffff' : state.footerBackgroundColor}
                        onChange={(e) => updateState({ footerBackgroundColor: e.target.value })}
                        style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={state.footerBackgroundColor}
                        onChange={(e) => updateState({ footerBackgroundColor: e.target.value })}
                        placeholder="transparent"
                        maxLength={20}
                        style={{ flex: 1 }}
                    />
                </div>

                <label>Text Color:</label>
                <div className="color-input-group">
                    <input
                        type="color"
                        value={state.footerTextColor || '#000000'}
                        onChange={(e) => updateState({ footerTextColor: e.target.value })}
                        style={{ width: '60px', height: '38px', cursor: 'pointer' }}
                    />
                    <input
                        type="text"
                        value={state.footerTextColor}
                        onChange={(e) => updateState({ footerTextColor: e.target.value })}
                        placeholder="#000000"
                        maxLength={7}
                        style={{ flex: 1 }}
                    />
                </div>

                <p className="section-hint" style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>Social Links</p>

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
            </CollapsibleSection >



            {/* Animations Section */}
            < CollapsibleSection title="Animations" defaultOpen={false} >
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
            </CollapsibleSection >


        </div >
    )
}

export default Controls
