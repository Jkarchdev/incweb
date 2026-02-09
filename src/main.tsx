import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminDashboard from './components/AdminDashboard.tsx'

// Simple routing based on URL path
const path = window.location.pathname
const isAdminRoute = path === '/admin'

// For /design/team-name routes, show the main App (it will load the design)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? <AdminDashboard /> : <App />}
  </StrictMode>,
)
