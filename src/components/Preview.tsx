import type { AppState } from '../App'
import './Preview.css'

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

const Preview = ({ state, onToggleMobileMenu }: PreviewProps) => {
    const getThemeClass = () => {
        if (state.customColor) {
            return 'custom'
        }
        return state.palette
    }

    const getBackgroundClass = () => {
        return `bg-${state.backgroundStyle}`
    }

    const customStyle = state.customColor ? {
        '--primary': state.customColor,
    } as React.CSSProperties : {}

    return (
        <div
            className={`preview-container ${getThemeClass()} ${getBackgroundClass()}`}
            style={customStyle}
        >
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
                    <button
                        className="mobile-settings-toggle"
                        onClick={onToggleMobileMenu}
                        aria-label="Settings"
                    >
                        ⚙️ Settings
                    </button>
                </div>
            </header>

            <main className="website-main">
                <div className="landing-content">
                    {/* UVP Section */}
                    <section className="uvp-section">
                        <div className="container">
                            <p className="uvp-text">{state.mainText}</p>
                        </div>
                    </section>

                    {/* Team Section */}
                    <section className="team-section">
                        <div className="container">
                            <h2 className="section-title">Meet Our Team</h2>
                            <div className="team-grid">
                                {state.teammates.map((teammate) => (
                                    <div key={teammate.id} className="team-card">
                                        <div className="team-headshot">
                                            <img
                                                src={teammate.imageUrl || placeholderSVG('Photo')}
                                                alt={teammate.name}
                                                loading="lazy"
                                            />
                                        </div>
                                        <h3 className="team-name">{teammate.name}</h3>
                                        <p className="team-role">{teammate.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Website Footer */}
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

                        <div className="footer-links">
                            {state.instagramUrl && (
                                <a href={state.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    <span>Instagram</span>
                                </a>
                            )}
                            {state.contactEmail && (
                                <a href={`mailto:${state.contactEmail}`} className="footer-link">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                    <span>{state.contactEmail}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Preview
