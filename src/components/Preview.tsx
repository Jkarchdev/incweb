import { useState, useEffect } from 'react'
import type { AppState, TextStyle } from '../App'
import BackgroundRenderer from './backgrounds/BackgroundRenderer'
import './Preview.css'

type PageName = 'home' | 'product' | 'team'

interface PreviewProps {
    state: AppState
    onToggleMobileMenu: () => void
}

const getTextStyle = (config: TextStyle) => {
    const style: React.CSSProperties = {
        fontWeight: config.weight,
    }

    if (config.color) {
        style.color = config.color
    }

    if (config.effect === 'shadow') {
        style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)'
    } else if (config.effect === 'glow') {
        style.textShadow = `0 0 10px ${config.color || 'var(--primary)'}`
    } else if (config.effect === 'outline') {
        style.WebkitTextStroke = `1px ${config.color || 'var(--text)'}`
        style.color = 'transparent'
    }

    return style
}

const placeholderSVG = (text: string) => `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#e5e7eb"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>
`)}`

const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const TikTokIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
)

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
)

const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
)

const Preview = ({ state, onToggleMobileMenu }: PreviewProps) => {
    const [currentPage, setCurrentPage] = useState<PageName>('home')

    // Reset to home if the current page gets disabled
    useEffect(() => {
        if (currentPage === 'product' && !state.productPageEnabled) {
            setCurrentPage('home')
        }
        if (currentPage === 'team' && state.teamLocation !== 'separate') {
            setCurrentPage('home')
        }
    }, [currentPage, state.productPageEnabled, state.teamLocation])

    const getThemeClass = () => {
        if (state.customColor) return 'custom'
        return state.palette
    }

    const customStyle = {
        ...(state.customColor ? { '--primary': state.customColor } : {}),
        ...(state.secondaryColor ? { '--secondary': state.secondaryColor } : {}),
        ...(state.heroGradientFrom ? { '--gradient-from': state.heroGradientFrom } : {}),
        ...(state.heroGradientTo ? { '--gradient-to': state.heroGradientTo } : {}),
    } as React.CSSProperties

    const teamNameScale = state.teamNameSize / 100
    const teamRoleScale = state.teamRoleSize / 100
    const teamNameStyle = { fontFamily: `'${state.teamNameFont}', sans-serif`, fontSize: `${1.5 * teamNameScale}rem` }
    const teamRoleStyle = {
        fontFamily: `'${state.teamRoleFont}', sans-serif`,
        fontSize: `${1.125 * teamRoleScale}rem`,
        ...getTextStyle(state.teamRoleStyle)
    }

    const footerParamScale = (state.footerTextSize || 100) / 100
    const footerStyle = {
        fontFamily: `'${state.footerFont}', sans-serif`,
        fontSize: `${1 * footerParamScale}rem`,
        ...getTextStyle(state.footerTextStyle)
    }

    const hasSocialLinks = state.socialLinks.instagram || state.socialLinks.twitter || state.socialLinks.linkedin || state.socialLinks.tiktok || state.contactEmail

    const renderTeamContent = () => (
        <section className={`team-section section-anim-${state.sectionAnimation}`}>
            <div className="container">
                <h2 className="section-title" style={{
                    fontFamily: `'${state.teamHeadingFont}', sans-serif`,
                    fontSize: `${2.75 * (state.teamHeadingSize / 100)}rem`,
                    ...getTextStyle(state.teamHeadingStyle)
                }}>{state.teamHeading}</h2>
                <p className="section-subtitle" style={{
                    fontFamily: `'${state.teamSubheadingFont}', sans-serif`,
                    fontSize: `${1.25 * (state.teamSubheadingSize / 100)}rem`,
                    ...getTextStyle(state.teamRoleStyle) // Using role style for general subtitle or create new one
                }}>{state.teamSubheading}</p>
                {state.teamDisplayMode === 'group' ? (
                    <div className="team-group-photo">
                        <img
                            src={state.teamGroupImageUrl || placeholderSVG('Team Photo')}
                            alt="Our Team"
                        />
                    </div>
                ) : (
                    <div className={`team-layout-${state.teamCardLayout}`}>
                        {state.teammates.map((teammate, index) => (
                            <div
                                key={teammate.id}
                                className={`team-card card-anim-${state.cardAnimation} hover-${state.hoverStyle} card-style-${state.cardStyle}`}
                                style={{ animationDelay: `${index * 0.1}s`, borderRadius: `${state.cardBorderRadius}px` }}
                            >
                                <div className="team-headshot">
                                    <img
                                        src={teammate.imageUrl || placeholderSVG('Photo')}
                                        alt={teammate.name}
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="team-name" style={teamNameStyle}>{teammate.name}</h3>
                                <p className="team-role" style={teamRoleStyle}>{teammate.role}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )

    return (
        <div
            className={`preview-container ${getThemeClass()}`}
            style={customStyle}
        >
            <BackgroundRenderer config={state.background} />

            {/* Decorative Floating Images */}
            {state.decorativeImages.map((img) => (
                img.url && (
                    <div
                        key={img.id}
                        className="decorative-floating-image"
                        style={{
                            position: 'absolute',
                            left: `${img.x}%`,
                            top: `${img.y}%`,
                            transform: `translate(-50%, -50%) scale(${img.scale / 100}) rotate(${img.rotation}deg)`,
                            zIndex: img.zIndex,
                            pointerEvents: 'none',
                            maxWidth: '300px',
                            width: '20vw',
                        }}
                    >
                        <img
                            src={img.url}
                            alt="Decorative element"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                )
            ))}

            {/* Website Header */}
            <header className="website-header" style={{
                fontFamily: `'${state.headerFont}', sans-serif`,
                backgroundColor: state.headerBackgroundColor
            }}>
                <div className="header-content">
                    <div className="header-logo">
                        <img
                            src={state.logoUrl || placeholderSVG('Logo')}
                            alt="Logo"
                            className="landing-logo"
                        />
                    </div>
                    <nav className="header-nav">
                        <button
                            className={`header-nav-link ${currentPage === 'home' ? 'header-nav-link--active' : ''}`}
                            onClick={() => setCurrentPage('home')}
                            type="button"
                            style={{ color: state.headerTextColor }}
                        >
                            Home
                        </button>
                        {state.productPageEnabled && (
                            <button
                                className={`header-nav-link ${currentPage === 'product' ? 'header-nav-link--active' : ''}`}
                                onClick={() => setCurrentPage('product')}
                                type="button"
                                style={{ color: state.headerTextColor }}
                            >
                                Product
                            </button>
                        )}
                        {state.teamLocation === 'separate' && (
                            <button
                                className={`header-nav-link ${currentPage === 'team' ? 'header-nav-link--active' : ''}`}
                                onClick={() => setCurrentPage('team')}
                                type="button"
                                style={{ color: state.headerTextColor }}
                            >
                                Team
                            </button>
                        )}
                    </nav>
                    <button
                        className="mobile-settings-toggle"
                        onClick={onToggleMobileMenu}
                        aria-label="Settings"
                        style={{ color: state.headerTextColor }}
                    >
                        Settings
                    </button>
                </div>
            </header>

            <main className="website-main">
                <div className="landing-content">
                    {/* ===== HOME PAGE ===== */}
                    {currentPage === 'home' && (
                        <>
                            {/* Hero Logo Section */}
                            {state.sections.hero && (
                                <section className={`hero-logo-section hero-anim-${state.heroAnimation}`}>
                                    <div className="container hero-container" style={{ minHeight: `${state.heroHeight}px` }}>
                                        {/* Logo block */}
                                        <div
                                            className={`hero-logo-block hero-logo--${state.heroLogo.size}`}
                                            style={{ transform: `translate(${state.heroLogo.logoX}%, ${state.heroLogo.logoY}%)` }}
                                        >
                                            <div className="hero-logo-wrapper">
                                                <img
                                                    src={state.logoUrl || placeholderSVG('Your Logo')}
                                                    alt="Company Logo"
                                                    className="hero-logo-img"
                                                />
                                            </div>
                                        </div>

                                        {/* Text block */}
                                        {((state.heroLogo.sideText && state.heroHeadlineVisible) || (state.heroLogo.tagline && state.heroTaglineVisible)) && (
                                            <div
                                                className="hero-text-block"
                                                style={{ transform: `translate(${state.heroLogo.textX}%, ${state.heroLogo.textY}%)` }}
                                            >
                                                {state.heroLogo.sideText && state.heroHeadlineVisible && (
                                                    <h1
                                                        className={`hero-side-text${state.heroGradientText ? ' hero-gradient-text' : ''}${state.heroTextAnimation !== 'none' ? ` text-anim-${state.heroTextAnimation}` : ''}`}
                                                        style={{
                                                            fontFamily: `'${state.heroLogo.sideTextFont}', sans-serif`,
                                                            fontWeight: state.heroFontWeight,
                                                            ...(!state.heroGradientText && state.heroTextAnimation !== 'shimmer' ? { color: state.heroLogo.sideTextColor || 'var(--text)' } : {}),
                                                            fontSize: `${3.5 * (state.heroHeadlineSize / 100)}rem`,
                                                            letterSpacing: `${state.heroLetterSpacing * 0.01}em`,
                                                            textShadow: state.heroLogo.textGlow
                                                                ? `0 0 ${20 * (state.heroLogo.textGlowIntensity / 100)}px ${state.heroLogo.sideTextColor || 'var(--primary)'}, 0 0 ${40 * (state.heroLogo.textGlowIntensity / 100)}px ${state.heroLogo.sideTextColor || 'var(--primary)'}80`
                                                                : state.heroLogo.textShadow
                                                                    ? `0 ${4 * (state.heroLogo.textShadowIntensity / 100)}px ${8 * (state.heroLogo.textShadowIntensity / 100)}px rgba(0, 0, 0, ${0.5 * (state.heroLogo.textShadowIntensity / 100)})`
                                                                    : 'none',
                                                            WebkitTextStroke: state.heroLogo.textOutline
                                                                ? `${state.heroLogo.textOutlineWidth}px rgba(0, 0, 0, 0.2)`
                                                                : 'none',
                                                            ...getTextStyle(state.heroHeadlineStyle),
                                                        }}
                                                    >
                                                        {state.heroLogo.sideText}
                                                    </h1>
                                                )}
                                                {state.heroLogo.tagline && state.heroTaglineVisible && (
                                                    <p
                                                        className="hero-tagline"
                                                        style={{
                                                            fontFamily: `'${state.subtextFont}', sans-serif`,
                                                            fontSize: `${1.375 * (state.subtextSize / 100)}rem`,
                                                            textShadow: state.heroLogo.textGlow
                                                                ? `0 0 ${10 * (state.heroLogo.textGlowIntensity / 100)}px ${state.heroLogo.sideTextColor || 'var(--primary)'}, 0 0 ${20 * (state.heroLogo.textGlowIntensity / 100)}px ${state.heroLogo.sideTextColor || 'var(--primary)'}80`
                                                                : state.heroLogo.textShadow
                                                                    ? `0 ${2 * (state.heroLogo.textShadowIntensity / 100)}px ${4 * (state.heroLogo.textShadowIntensity / 100)}px rgba(0, 0, 0, ${0.3 * (state.heroLogo.textShadowIntensity / 100)})`
                                                                    : 'none',
                                                            WebkitTextStroke: state.heroLogo.textOutline
                                                                ? `${state.heroLogo.textOutlineWidth * 0.5}px rgba(0, 0, 0, 0.15)`
                                                                : 'none',
                                                        }}
                                                    >
                                                        {state.heroLogo.tagline}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Hero Product Image */}
                                        {state.heroProductImage.visible && state.heroProductImage.url && (
                                            <div
                                                className="hero-product-image-block"
                                                style={{
                                                    transform: `translate(${state.heroProductImage.x}%, ${state.heroProductImage.y}%) scale(${state.heroProductImage.scale / 100})`,
                                                }}
                                            >
                                                <img
                                                    src={state.heroProductImage.url}
                                                    alt="Hero Product"
                                                    className="hero-product-img"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* UVP Section */}
                            {state.sections.uvp && (
                                <section className={`uvp-section section-anim-${state.sectionAnimation}`}>
                                    <div className="uvp-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                                        <h2 className="uvp-title" style={{
                                            fontFamily: `'${state.mainTextFont}', sans-serif`,
                                            fontSize: `${2.5 * (state.mainTextSize / 100)}rem`,
                                            ...getTextStyle(state.mainTextStyle)
                                        }}>
                                            {state.mainText}
                                        </h2>
                                        {state.heroSubtext && state.subtextVisible && (
                                            <p className="uvp-subtext" style={{
                                                fontFamily: `'${state.subtextFont}', sans-serif`,
                                                fontSize: `${1.375 * (state.subtextSize / 100)}rem`,
                                                ...getTextStyle(state.subtextStyle)
                                            }}>{state.heroSubtext}</p>
                                        )}
                                        {state.productPageEnabled && state.ctaText && (
                                            <button
                                                className="cta-button"
                                                onClick={() => setCurrentPage('product')}
                                                style={{
                                                    fontSize: `${1.125 * (state.ctaTextSize / 100)}rem`,
                                                    fontFamily: `'${state.mainTextFont}', sans-serif`,
                                                    ...getTextStyle(state.ctaStyle)
                                                }}
                                            >
                                                {state.ctaText}
                                            </button>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Team Section (on home page) */}
                            {state.sections.team && state.teamLocation === 'home' && renderTeamContent()}
                        </>
                    )}

                    {/* ===== PRODUCT PAGE ===== */}
                    {currentPage === 'product' && state.productPageEnabled && (
                        <section className={`product-section section-anim-${state.sectionAnimation}`}>
                            {(() => {
                                const layout = state.productPage.layout || 'right'
                                const isColumn = layout === 'top' || layout === 'bottom'
                                const isReverse = layout === 'left' || layout === 'top' // Top means Image first (so reverse column)

                                const contentStyle: React.CSSProperties = {
                                    display: 'flex',
                                    flexDirection: isColumn ? (isReverse ? 'column-reverse' : 'column') : (isReverse ? 'row-reverse' : 'row'),
                                    alignItems: 'center',
                                    gap: '4rem',
                                    padding: '4rem 0',
                                }

                                const imageSizePercent = state.productPage.imageSize || 50
                                const textWidth = isColumn ? '100%' : `${100 - imageSizePercent}%`
                                const imageWidth = isColumn ? '100%' : `${imageSizePercent}%`

                                return (
                                    <div className={`product-page section-anim-${state.sectionAnimation}`}>
                                        <div className="container" style={contentStyle}>
                                            <div className="product-text" style={{ width: textWidth }}>
                                                <h1 style={{ ...getTextStyle(state.mainTextStyle) }}>{state.productPage.heading}</h1>
                                                <p style={{ ...getTextStyle(state.subtextStyle) }}>{state.productPage.description}</p>
                                                <button className="cta-button" style={{ marginTop: '2rem', ...getTextStyle(state.ctaStyle) }}>Learn More</button>
                                            </div>
                                            <div className="product-image-container" style={{ width: imageWidth, display: 'flex', justifyContent: 'center' }}>
                                                {state.productPage.imageUrl ? (
                                                    <img
                                                        src={state.productPage.imageUrl}
                                                        alt="Product"
                                                        className={`product-image hover-${state.hoverStyle}`}
                                                        style={{
                                                            maxWidth: '100%',
                                                            borderRadius: '24px',
                                                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)'
                                                        }}
                                                    />
                                                ) : (
                                                    <div className={`product-image-placeholder hover-${state.hoverStyle}`}>
                                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                                        </svg>
                                                        <span>Product Image</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })()}
                        </section>
                    )}

                    {/* ===== TEAM PAGE ===== */}
                    {currentPage === 'team' && state.teamLocation === 'separate' && state.sections.team && renderTeamContent()}
                </div>
            </main>

            {/* Website Footer */}
            {state.sections.footer && (
                <footer className="website-footer" style={{
                    backgroundColor: state.footerBackgroundColor,
                    color: state.footerTextColor
                }}>
                    <div className="container">
                        <div className="footer-content">
                            <div className="footer-brand">
                                <img
                                    src="/heights-logo.png"
                                    alt="Heights Business Incubator"
                                    className="footer-logo-img"
                                />
                            </div>

                            {hasSocialLinks && (
                                <div className="footer-links" style={{ ...footerStyle, color: state.footerTextColor }}>
                                    {state.socialLinks.instagram && (
                                        <a href={state.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: state.footerTextColor }}>
                                            <InstagramIcon />
                                            <span>Instagram</span>
                                        </a>
                                    )}
                                    {state.socialLinks.twitter && (
                                        <a href={state.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: state.footerTextColor }}>
                                            <TwitterIcon />
                                            <span>Twitter</span>
                                        </a>
                                    )}
                                    {state.socialLinks.linkedin && (
                                        <a href={state.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: state.footerTextColor }}>
                                            <LinkedInIcon />
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                    {state.socialLinks.tiktok && (
                                        <a href={state.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ color: state.footerTextColor }}>
                                            <TikTokIcon />
                                            <span>TikTok</span>
                                        </a>
                                    )}
                                    {state.contactEmail && (
                                        <a href={`mailto:${state.contactEmail}`} className="footer-link" style={{ color: state.footerTextColor }}>
                                            <EmailIcon />
                                            <span>{state.contactEmail}</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </footer>
            )}
        </div>
    )
}

export default Preview
