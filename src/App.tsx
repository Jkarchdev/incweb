import { useState } from 'react'
import './App.css'
import Controls from './components/Controls'
import Preview from './components/Preview'

export interface Teammate {
  id: number
  name: string
  role: string
  imageUrl: string
}

export interface AppState {
  logoUrl: string
  mainText: string
  teammates: Teammate[]
  instagramUrl: string
  contactEmail: string
  backgroundStyle: string
  palette: string
  customColor: string
}

function App() {
  const [state, setState] = useState<AppState>({
    logoUrl: '',
    mainText: 'Transform your ideas into reality with our comprehensive business incubator program. Join a community of innovative entrepreneurs and bring your vision to life.',
    teammates: Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `Team Member ${i + 1}`,
      role: `Role ${i + 1}`,
      imageUrl: ''
    })),
    instagramUrl: 'https://instagram.com',
    contactEmail: 'hello@incubator.com',
    backgroundStyle: 'gradient',
    palette: 'ocean',
    customColor: ''
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="app-container">
      <div className={`controls-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="controls-header">
          <h1>Customizer</h1>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
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
