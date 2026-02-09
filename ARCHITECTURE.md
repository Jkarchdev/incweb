# IncWeb - Technical Architecture Documentation

## 📐 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         React Application (Vite Dev Server)           │  │
│  │                                                         │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │   App.tsx    │  │ Controls.tsx │  │ Preview.tsx │  │  │
│  │  │              │  │              │  │             │  │  │
│  │  │ - AppState   │◄─┤ - All inputs │  │ - Live      │  │  │
│  │  │ - Submission │  │ - Sliders    │  │   preview   │  │  │
│  │  │   modal      │  │ - Uploads    │  │ - Renders   │  │  │
│  │  └──────┬───────┘  └──────────────┘  └─────────────┘  │  │
│  │         │                                               │  │
│  │         │ AppState updates (useState)                  │  │
│  │         │                                               │  │
│  │         ▼                                               │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │         localStorage (auto-save)                 │  │  │
│  │  │  Key: "landingPageState"                        │  │  │
│  │  │  Value: JSON stringified AppState               │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                         │  │
│  └─────────────────────────┬───────────────────────────────┘  │
│                            │                                  │
│                            │ Submission (POST)                │
│                            ▼                                  │
└────────────────────────────┼──────────────────────────────────┘
                             │
                             │ HTTPS
                             │
                    ┌────────▼─────────┐
                    │   Supabase API   │
                    │  (PostgreSQL)    │
                    │                  │
                    │  submissions     │
                    │  table           │
                    │  - id            │
                    │  - created_at    │
                    │  - team_name     │
                    │  - domain_name   │
                    │  - design_data   │
                    └──────────────────┘
```

---

## 🗄️ Database Schema

### **Supabase PostgreSQL Database**

**Table: `submissions`**

| Column       | Type      | Constraints           | Description                          |
|--------------|-----------|-----------------------|--------------------------------------|
| `id`         | `int8`    | PRIMARY KEY, AUTO     | Auto-incrementing submission ID      |
| `created_at` | `timestamptz` | NOT NULL, DEFAULT now() | Submission timestamp (UTC)       |
| `team_name`  | `text`    | NOT NULL              | Team's name (user input)             |
| `domain_name`| `text`    | NULL                  | Optional custom domain               |
| `design_data`| `jsonb`   | NOT NULL              | Full AppState as JSON                |

**Row-Level Security (RLS):** Disabled (intentional for simplicity)
- Anyone can insert submissions
- Admin dashboard reads all submissions
- No authentication required (suitable for one-time event use)

**Indexes:**
- Primary key on `id`
- Default index on `created_at` for timestamp queries

**Sample Row:**
```json
{
  "id": 1,
  "created_at": "2026-02-08T18:30:00.000Z",
  "team_name": "Team Phoenix",
  "domain_name": "teamphoenix.com",
  "design_data": {
    "theme": "ocean",
    "primaryColor": "#3b82f6",
    "heroText": "Welcome to Phoenix",
    "logoUrl": "data:image/png;base64,...",
    "heroProductImage": {
      "url": "data:image/png;base64,...",
      "x": 50,
      "y": 0,
      "scale": 120,
      "visible": true
    },
    "decorativeImages": [
      {
        "id": "dec-1",
        "url": "data:image/png;base64,...",
        "x": 20,
        "y": 30,
        "scale": 80,
        "rotation": 15,
        "zIndex": 3
      }
    ],
    "background": {
      "presetId": "solid_color",
      "color1": "#ff6b00",
      "color2": "#ff6b00",
      "settings": { "intensity": 65, "speed": 50, "density": 55 }
    }
    // ... rest of AppState
  }
}
```

---

## 🎨 Frontend Architecture

### **State Management**

**AppState Interface** (TypeScript)
```typescript
interface AppState {
  // Theme & Colors
  theme: string
  primaryColor: string
  secondaryColor: string

  // Background
  background: BackgroundConfig

  // Hero Section
  heroText: string
  subText: string
  heroTextFont: string
  heroTextSize: number
  heroLetterSpacing: number
  heroTextColor: string
  heroTextEffect: 'none' | 'glow' | 'shadow' | 'outline' | 'gradient'
  logoSize: 'small' | 'medium' | 'large' | 'extra-large'
  logoUrl: string
  logoOffsetX: number
  logoOffsetY: number
  heroAnimation: 'none' | 'fade-in' | 'slide-up' | 'scale-in' | 'typewriter'

  // Hero Product Image (NEW)
  heroProductImage: HeroProductImage

  // Decorative Floating Images (NEW)
  decorativeImages: DecorativeImage[]

  // Typography (reorganized)
  teamNameFont: string
  teamNameSize: number
  teamRoleFont: string
  teamRoleSize: number
  footerFont: string
  subTextFont: string
  subTextSize: number
  uvpTextFont: string
  uvpTextSize: number

  // Team Section
  teamPhoto: string
  teamPhotoStyle: 'individual' | 'group'
  teamMembers: TeamMember[]
  cardStyle: 'glass' | 'solid' | 'outline' | 'shadow'
  cardLayout: 'grid' | 'carousel' | 'stacked'
  cardAnimation: 'none' | 'fade-in' | 'slide-up' | 'flip' | 'bounce'
  cardHoverEffect: 'none' | 'lift' | 'grow' | 'glow' | 'tilt'

  // Product Page
  showProductPage: boolean
  productName: string
  productDescription: string
  productImage: string

  // Social & Footer
  socialLinks: SocialLinks
  contactEmail: string

  // Visibility Toggles
  showTeamSection: boolean
  showHero: boolean

  // Animations
  enableAnimations: boolean
}

interface HeroProductImage {
  url: string           // base64 encoded image
  x: number            // -200 to 200 (percentage)
  y: number            // -200 to 200 (percentage)
  scale: number        // 50 to 200 (percentage)
  visible: boolean
}

interface DecorativeImage {
  id: string           // unique identifier
  url: string          // base64 encoded image
  x: number           // -100 to 100 (percentage)
  y: number           // 0 to 100 (percentage)
  scale: number       // 20 to 150 (percentage)
  rotation: number    // -180 to 180 (degrees)
  zIndex: number      // 1 to 10 (layering)
}

interface BackgroundConfig {
  presetId: string
  type: 'static' | 'animated'
  settings: BackgroundSettings
  color1: string       // custom color override
  color2: string       // custom color override
}
```

### **State Persistence**

**localStorage Auto-Save:**
```typescript
// Save on every state change
useEffect(() => {
  try {
    localStorage.setItem('landingPageState', JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save state:', error)
  }
}, [state])

// Load on mount
useEffect(() => {
  const savedState = localStorage.getItem('landingPageState')
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState)
      // Backward compatibility migration
      const migrated = migrateOldState(parsed)
      setState({ ...DEFAULT_STATE, ...migrated })
    } catch (error) {
      console.error('Failed to load state:', error)
    }
  }
}, [])
```

**Backward Compatibility Strategy:**
```typescript
function loadState() {
  const savedState = localStorage.getItem('landingPageState')
  if (!savedState) return DEFAULT_STATE

  const parsed = JSON.parse(savedState)

  // Migrate renamed fields
  const migrated = {
    ...parsed,
    // Typography migration (Feb 8, 2026)
    teamNameFont: parsed.teamNameFont || parsed.headingFont || 'Inter',
    teamRoleFont: parsed.teamRoleFont || parsed.bodyFont || 'Inter',
    footerFont: parsed.footerFont || parsed.bodyFont || 'Inter',
    teamNameSize: parsed.teamNameSize || parsed.headingSize || 100,
    teamRoleSize: parsed.teamRoleSize || parsed.bodySize || 100,

    // New fields with defaults
    heroProductImage: {
      ...DEFAULT_STATE.heroProductImage,
      ...parsed.heroProductImage
    },
    decorativeImages: parsed.decorativeImages || [],

    // Background color overrides
    background: {
      ...DEFAULT_STATE.background,
      ...parsed.background,
      color1: parsed.background?.color1 || '',
      color2: parsed.background?.color2 || ''
    }
  }

  return { ...DEFAULT_STATE, ...migrated }
}
```

### **Image Upload Pattern**

All image uploads use FileReader API to convert to base64:

```typescript
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    const base64 = event.target?.result as string
    updateState({ logoUrl: base64 })
  }
  reader.readAsDataURL(file)
}
```

**Why base64?**
- No external file hosting needed
- Images stored directly in state/localStorage
- Submitted to database as part of JSON
- Simplifies deployment (no asset management)

**Trade-offs:**
- Larger JSON payload (~30-40% larger than binary)
- Not ideal for large images (keep uploads under 2MB)
- Acceptable for logo/product images in landing page context

---

## 🎨 Background System Architecture

### **Preset Component Pattern**

Each background preset is a React component:

```
src/components/backgrounds/presets/
├── FloatingBlobs.tsx/css
├── MeshGradient.tsx
├── SolidColor.tsx
├── BokehLights.tsx/css
└── ... (31 total)
```

**Component Structure:**
```typescript
interface BackgroundPresetProps {
  settings: BackgroundSettings
}

export default function FloatingBlobs({ settings }: BackgroundPresetProps) {
  const { intensity, speed, density } = settings

  // Generate random positions (memoized for performance)
  const blobs = useMemo(() =>
    Array.from({ length: Math.floor(density / 10) }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * intensity + 50
    })),
    [density, intensity]
  )

  return (
    <div className="floating-blobs-background">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="blob"
          style={{
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            animationDuration: `${20 / speed}s`
          }}
        />
      ))}
    </div>
  )
}
```

**CSS Variable Override System:**
```typescript
// BackgroundRenderer.tsx
const colorOverrides: React.CSSProperties = {}
if (config.color1) {
  (colorOverrides as Record<string, string>)['--primary'] = config.color1
  (colorOverrides as Record<string, string>)['--secondary'] = config.color2 || config.color1
  (colorOverrides as Record<string, string>)['--border'] = `color-mix(in srgb, ${config.color1} 70%, ${config.color2 || config.color1})`
  (colorOverrides as Record<string, string>)['--muted'] = `color-mix(in srgb, ${config.color2 || config.color1} 60%, ${config.color1})`
}

return (
  <div style={colorOverrides}>
    <PresetComponent settings={config.settings} />
  </div>
)
```

This allows ANY preset to use custom colors without modifying preset code.

### **Preset Registration**

Presets must be registered in 3 locations:

1. **backgroundPresets.ts** - Metadata
```typescript
export const BACKGROUND_PRESETS = [
  {
    id: 'bokeh_lights',
    name: 'Bokeh Lights',
    type: 'animated',
    description: 'Soft glowing orbs',
    category: 'Animated'
  }
]
```

2. **BackgroundRenderer.tsx** - Runtime rendering
```typescript
import BokehLights from './presets/BokehLights'

const PRESET_COMPONENTS: Record<string, React.ComponentType<any>> = {
  bokeh_lights: BokehLights,
  // ...
}
```

3. **PresetThumbnail.tsx** - Preview grid
```typescript
import BokehLights from './presets/BokehLights'

const PRESET_COMPONENTS: Record<string, React.ComponentType<any>> = {
  bokeh_lights: BokehLights,
  // ...
}
```

---

## 🔄 Component Communication Flow

```
User Action (Controls.tsx)
         │
         │ Event handler (e.g., handleLogoUpload)
         ▼
    updateState()
         │
         │ setState() call propagates to App.tsx
         ▼
   AppState updates
         │
         ├──► localStorage saves (auto-save effect)
         │
         └──► Preview.tsx re-renders
                   │
                   ├──► BackgroundRenderer.tsx updates
                   ├──► Hero section re-renders with new images
                   ├──► Team cards update
                   └──► Typography changes apply
```

**Key Pattern: Unidirectional Data Flow**
- State lives in `App.tsx` (single source of truth)
- `Controls.tsx` receives `state` and `updateState` as props
- `Preview.tsx` receives `state` as read-only prop
- No child components modify state directly
- Clean separation: Controls = input, Preview = output

---

## 🌐 API Integration (Supabase)

### **Client Setup**

```typescript
// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Environment Variables (.env):**
```bash
VITE_SUPABASE_URL=https://klreatquddzaqastpbcz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**Security Note:** Anon key is public (safe to expose). RLS would normally restrict access, but we've disabled it for this event use case.

### **Submission Flow**

```typescript
// App.tsx
const handleSubmitDesign = async () => {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        {
          team_name: teamName,
          domain_name: domainName || null,
          design_data: state
        }
      ])
      .select()

    if (error) throw error

    alert('Design submitted successfully!')
    setShowSubmitModal(false)
  } catch (error) {
    console.error('Error submitting design:', error)
    alert('Failed to submit design. Please try again.')
  }
}
```

### **Admin Dashboard Queries**

```typescript
// AdminDashboard.tsx
const fetchSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    setSubmissions(data || [])
  } catch (error) {
    console.error('Error fetching submissions:', error)
  }
}
```

**Query Performance:**
- Small dataset (~20-100 submissions expected)
- No pagination needed
- Default `created_at` index provides fast sorting
- `SELECT *` acceptable (full design data needed for download)

---

## 📱 Responsive Design Strategy

### **Breakpoints**

```css
/* Mobile */
@media (max-width: 768px) {
  .hero-product-image-block {
    width: 60% !important;
    max-width: 300px !important;
  }

  .decorative-floating-image {
    width: 30vw !important;
    max-width: 150px !important;
  }

  .preview-container {
    padding: 1rem;
  }

  .hero-text {
    font-size: 2rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Mobile-First Approach:**
- Base styles for mobile
- Progressive enhancement for larger screens
- Images scale proportionally
- Text remains readable (minimum 16px base)
- Touch targets at least 44x44px

---

## 🚀 Build & Deployment

### **Development**

```bash
npm install
npm run dev
# Runs on http://localhost:5173
```

**Vite Features Used:**
- Hot Module Replacement (HMR) for fast development
- TypeScript compilation
- CSS bundling
- Environment variable injection (`import.meta.env`)

### **Production Build**

```bash
npm run build
# Output: dist/ folder
# - index.html
# - assets/index-[hash].js (bundled JS)
# - assets/index-[hash].css (bundled CSS)
```

**Build Optimizations:**
- Tree-shaking (removes unused code)
- Minification (JS + CSS)
- Code splitting (dynamic imports)
- Asset hashing for cache busting

### **Deployment to Vercel**

**Option 1: Vercel CLI**
```bash
npm install -g vercel
vercel
# Follow prompts, will auto-detect Vite
```

**Option 2: GitHub Integration**
1. Push to GitHub
2. Connect repo to Vercel
3. Auto-deploy on every push to main

**Vercel Config (vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

**Environment Variables on Vercel:**
- Add in Vercel dashboard: Settings → Environment Variables
- Prefix with `VITE_` for client-side access
- Rebuild required after adding new env vars

---

## 🔐 Security Considerations

### **Current Security Posture**

**Intentionally Minimal** (suitable for one-time educational event):
- No authentication
- No authorization
- Public Supabase anon key
- RLS disabled
- Admin dashboard at public `/admin` route

**Acceptable Because:**
- One-time use (tomorrow's event)
- No sensitive data (just website designs)
- Controlled environment (teacher supervision)
- Small scale (~20 teams)

### **Production Hardening (If Needed Later)**

**If this becomes a long-term tool:**

1. **Add Authentication:**
```typescript
// Use Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'secure-password'
})
```

2. **Enable Row-Level Security:**
```sql
-- Only allow read access to authenticated admins
CREATE POLICY "Admin read access"
ON submissions FOR SELECT
USING (auth.role() = 'admin');

-- Allow anonymous inserts (students can still submit)
CREATE POLICY "Anonymous insert"
ON submissions FOR INSERT
WITH CHECK (true);
```

3. **Rate Limiting:**
```typescript
// Use Vercel Edge Config or Upstash Redis
// Limit submissions to 1 per team per hour
```

4. **Input Validation:**
```typescript
// Server-side validation (Supabase Edge Function)
if (team_name.length > 100) {
  return new Response('Team name too long', { status: 400 })
}
```

5. **CORS Configuration:**
```typescript
// Only allow requests from your domain
headers: {
  'Access-Control-Allow-Origin': 'https://your-domain.com'
}
```

---

## 📊 Performance Optimization

### **Current Optimizations**

1. **Memoization:**
```typescript
// Background presets use useMemo for random positions
const particles = useMemo(() =>
  generateParticles(density),
  [density]
)
```

2. **Lazy Loading:**
```typescript
// Background components only render active preset
{PRESET_COMPONENTS[config.presetId] && (
  <PresetComponent settings={config.settings} />
)}
```

3. **CSS Animations (GPU-accelerated):**
```css
.blob {
  transform: translate3d(0, 0, 0); /* Force GPU layer */
  animation: float 20s infinite;
  will-change: transform;
}
```

4. **Debounced localStorage:**
```typescript
// Auto-save throttled to prevent excessive writes
const debouncedSave = useMemo(
  () => debounce((state) => {
    localStorage.setItem('landingPageState', JSON.stringify(state))
  }, 500),
  []
)
```

### **Future Performance Improvements**

**If needed for scale:**

1. **Virtual Scrolling** (for admin dashboard with 1000+ submissions)
2. **Image Compression** (compress base64 images before saving)
3. **Service Worker** (offline support, cache assets)
4. **CDN for Assets** (move uploaded images to Cloudinary/Imgix)
5. **Database Indexing** (add indexes on frequently queried columns)

---

## 🧪 Testing Strategy

### **Current Testing**

**Manual Testing:**
- ✅ All background presets render correctly
- ✅ Image uploads (logo, hero product, decorative)
- ✅ State persistence (localStorage)
- ✅ Submission flow (Supabase insert)
- ✅ Admin dashboard (fetch & download)
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Cross-browser (Chrome, Safari, Firefox)

### **Automated Testing (Future)**

**Unit Tests (Vitest):**
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Preview from './components/Preview'

describe('Preview Component', () => {
  it('renders hero text', () => {
    const state = { heroText: 'Welcome' }
    render(<Preview state={state} />)
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })
})
```

**E2E Tests (Playwright):**
```typescript
test('submit design flow', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.fill('#team-name', 'Test Team')
  await page.click('button:has-text("Submit Design")')
  await expect(page.locator('.success-message')).toBeVisible()
})
```

---

## 📁 File Structure

```
incweb/
├── src/
│   ├── main.tsx                      # App entry point
│   ├── App.tsx                       # Root component, state, submission modal
│   ├── App.css                       # App-level styles, modal
│   ├── supabaseClient.ts             # Supabase connection
│   │
│   └── components/
│       ├── Controls.tsx              # Customization sidebar
│       ├── Controls.css              # Controls styling
│       ├── Preview.tsx               # Live website preview
│       ├── Preview.css               # Preview styling
│       ├── AdminDashboard.tsx        # Admin view
│       ├── AdminDashboard.css        # Admin styling
│       │
│       └── backgrounds/
│           ├── backgroundPresets.ts  # Preset metadata & defaults
│           ├── BackgroundRenderer.tsx # Renders active preset
│           ├── PresetThumbnail.tsx   # Preview grid thumbnails
│           │
│           └── presets/              # 31 background components
│               ├── SolidColor.tsx
│               ├── FloatingBlobs.tsx
│               ├── FloatingBlobs.css
│               ├── MeshGradient.tsx
│               ├── BokehLights.tsx
│               ├── BokehLights.css
│               └── ... (28 more)
│
├── index.html                        # HTML entry point, Google Fonts
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── vite.config.ts                    # Vite config
├── .env                              # Environment variables (GITIGNORED)
├── .gitignore                        # Git ignore rules
├── PROJECT_PLAN.md                   # High-level overview
├── ARCHITECTURE.md                   # This file (technical details)
└── README.md                         # Basic setup instructions
```

---

## 🔄 Future Architectural Improvements

### **State Management**
**Current:** useState in App.tsx
**Future:** Zustand or Jotai for complex state
```typescript
import { create } from 'zustand'

const useStore = create((set) => ({
  state: DEFAULT_STATE,
  updateState: (updates) => set((state) => ({ ...state, ...updates }))
}))
```

### **Type Safety**
**Current:** Interfaces in App.tsx
**Future:** Zod schemas for runtime validation
```typescript
import { z } from 'zod'

const AppStateSchema = z.object({
  heroText: z.string().min(1).max(100),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  // ...
})
```

### **Component Library**
**Current:** Custom CSS
**Future:** shadcn/ui or Radix UI for accessible components
```typescript
import { Slider } from '@/components/ui/slider'
<Slider value={[state.intensity]} onValueChange={handleChange} />
```

### **Backend**
**Current:** Direct Supabase calls
**Future:** tRPC or GraphQL for type-safe API
```typescript
const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: '/api/trpc' })]
})

await trpc.submissions.create.mutate({ teamName, designData })
```

---

**Document Version:** 1.0
**Last Updated:** February 8, 2026
**Maintained By:** Project Team
