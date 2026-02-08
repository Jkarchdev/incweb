import { useState, useEffect } from 'react'
import type { AppState } from '../App'
import BackgroundRenderer from './backgrounds/BackgroundRenderer'
import './Preview.css'

type PageName = 'home' | 'product' | 'team'

interface PreviewProps {
    state: AppState
    onToggleMobileMenu: () => void
}

const placeholderSVG = (text: string) => `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#e5e7eb"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>
`)}`

const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
)

const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
)

const TikTokIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
)

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
)

const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
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

    const customStyle = state.customColor ? {
        '--primary': state.customColor,
    } as React.CSSProperties : {}

    const hScale = state.headingSize / 100
    const bScale = state.bodySize / 100
    const headingStyle = { fontFamily: `'${state.headingFont}', sans-serif`, fontSize: `${hScale}em` }
    const bodyStyle = { fontFamily: `'${state.bodyFont}', sans-serif`, fontSize: `${bScale}em` }

    const layout = state.heroLogo.alignment
    const isSide = layout === 'side-left' || layout === 'side-right'

    const hasSocialLinks = state.socialLinks.instagram || state.socialLinks.twitter || state.socialLinks.linkedin || state.socialLinks.tiktok || state.contactEmail

    const renderTeamContent = () => (
        <section className="team-section">
            <div className="container">
                <h2 className="section-title" style={headingStyle}>{state.teamHeading}</h2>
                <p className="section-subtitle" style={bodyStyle}>{state.teamSubheading}</p>
                {state.teamDisplayMode === 'group' ? (
                    <div className="team-group-photo">
                        <img
                            src={state.teamGroupImageUrl || placeholderSVG('Team Photo')}
                            alt="Our Team"
                        />
                    </div>
                ) : (
                    <div className="team-grid">
                        {state.teammates.map((teammate, index) => (
                            <div key={teammate.id} className="team-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="team-headshot">
                                    <img
                                        src={teammate.imageUrl || placeholderSVG('Photo')}
                                        alt={teammate.name}
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="team-name" style={headingStyle}>{teammate.name}</h3>
                                <p className="team-role" style={bodyStyle}>{teammate.role}</p>
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

            {/* Website Header */}
            <header className="website-header">
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
                        >
                            Home
                        </button>
                        {state.productPageEnabled && (
                            <button
                                className={`header-nav-link ${currentPage === 'product' ? 'header-nav-link--active' : ''}`}
                                onClick={() => setCurrentPage('product')}
                                type="button"
                            >
                                Product
                            </button>
                        )}
                        {state.teamLocation === 'separate' && (
                            <button
                                className={`header-nav-link ${currentPage === 'team' ? 'header-nav-link--active' : ''}`}
                                onClick={() => setCurrentPage('team')}
                                type="button"
                            >
                                Team
                            </button>
                        )}
                    </nav>
                    <button
                        className="mobile-settings-toggle"
                        onClick={onToggleMobileMenu}
                        aria-label="Settings"
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
                                <section className={`hero-logo-section hero-layout--${layout}`}>
                                    <div className="container">
                                        <div className={`hero-inner ${isSide ? 'hero-inner--side' : 'hero-inner--stacked'}`}>
                                            {/* Logo block — rendered second in DOM for side-right, but CSS order handles it */}
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
                                            {(state.heroLogo.sideText || state.heroLogo.tagline) && (
                                                <div
                                                    className="hero-text-block"
                                                    style={{ transform: `translate(${state.heroLogo.textX}%, ${state.heroLogo.textY}%)` }}
                                                >
                                                    {state.heroLogo.sideText && (
                                                        <h1
                                                            className="hero-side-text"
                                                            style={{
                                                                fontFamily: `'${state.heroLogo.sideTextFont}', sans-serif`,
                                                                color: state.heroLogo.sideTextColor || 'var(--text)',
                                                                fontSize: `${3 * hScale}rem`,
                                                            }}
                                                        >
                                                            {state.heroLogo.sideText}
                                                        </h1>
                                                    )}
                                                    {state.heroLogo.tagline && (
                                                        <p className="hero-tagline" style={bodyStyle}>{state.heroLogo.tagline}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* UVP Section */}
                            {state.sections.uvp && (
                                <section className="uvp-section">
                                    <div className="container">
                                        <p className="uvp-text" style={headingStyle}>{state.mainText}</p>
                                        {state.heroSubtext && (
                                            <p className="uvp-subtext" style={bodyStyle}>{state.heroSubtext}</p>
                                        )}
                                        {state.ctaText && (
                                            <button className="cta-button" style={bodyStyle}>{state.ctaText}</button>
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
                        <section className="product-section">
                            <div className="container">
                                <h2 className="section-title" style={headingStyle}>{state.productPage.heading}</h2>
                                <div className="product-layout">
                                    <div className="product-image-wrapper">
                                        <img
                                            src={state.productPage.imageUrl || placeholderSVG('Product')}
                                            alt="Product"
                                        />
                                    </div>
                                    <div className="product-description" style={bodyStyle}>
                                        {state.productPage.description}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* ===== TEAM PAGE ===== */}
                    {currentPage === 'team' && state.teamLocation === 'separate' && state.sections.team && renderTeamContent()}
                </div>
            </main>

            {/* Website Footer */}
            {state.sections.footer && (
                <footer className="website-footer">
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
                                <div className="footer-links" style={bodyStyle}>
                                    {state.socialLinks.instagram && (
                                        <a href={state.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">
                                            <InstagramIcon />
                                            <span>Instagram</span>
                                        </a>
                                    )}
                                    {state.socialLinks.twitter && (
                                        <a href={state.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="footer-link">
                                            <TwitterIcon />
                                            <span>Twitter</span>
                                        </a>
                                    )}
                                    {state.socialLinks.linkedin && (
                                        <a href={state.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
                                            <LinkedInIcon />
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                    {state.socialLinks.tiktok && (
                                        <a href={state.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="footer-link">
                                            <TikTokIcon />
                                            <span>TikTok</span>
                                        </a>
                                    )}
                                    {state.contactEmail && (
                                        <a href={`mailto:${state.contactEmail}`} className="footer-link">
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
