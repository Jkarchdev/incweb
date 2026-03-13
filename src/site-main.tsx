import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import Preview from './components/Preview'
import type { AppState } from './App'
import designData from '../team-site-data.json'

// Hide the settings toggle button — not needed on deployed sites
const style = document.createElement('style')
style.textContent = '.mobile-settings-toggle { display: none !important; }'
document.head.appendChild(style)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview state={designData as AppState} onToggleMobileMenu={() => {}} />
  </StrictMode>
)
