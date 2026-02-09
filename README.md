# IncWeb - Team Website Builder

A customizable landing page builder for high school business incubator teams to design, preview, and submit their startup websites. Built for ~20 teams to create unique, professional sites using a rich customization interface.

![Status](https://img.shields.io/badge/status-ready_for_event-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-19.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)

---

## ✨ Features

### 🎨 **Rich Customization**
- **31 Background Presets** (animated & static) with custom color pickers
- **50+ Google Fonts** including 10 bold/display fonts for impactful headlines
- **Hero Product Images** - Upload & position large product images with scale/positioning controls
- **Decorative Floating Images** - Add unlimited positioned decorative elements
- **Complete Typography Control** - Separate controls for hero, team names, roles, footer
- **Logo Upload** with positioning and 4 size presets
- **6 Theme Palettes** + custom color picker
- **Text Effects** - Glow, shadow, outline, gradient
- **Animations** - Hero animations, card animations, hover effects

### 🚀 **Team Workflow**
- **Live Preview** - See changes instantly as you customize
- **Auto-Save** - Design persists in browser localStorage
- **One-Click Submit** - Teams submit completed designs to database
- **Admin Dashboard** - View all submissions, download design JSON files
- **Mobile Responsive** - Works on phones, tablets, desktops

### 💾 **Backend**
- **Supabase PostgreSQL** database for submissions
- **No Authentication Required** - Simple submission flow for event use
- **JSON Export** - Full design state saved for later HTML generation

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- npm or yarn package manager

### **1. Clone & Install**
```bash
git clone <repository-url>
cd incweb
npm install
```

### **2. Set Up Environment Variables**
Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=https://klreatquddzaqastpbcz.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Never commit `.env` to git (already in `.gitignore`)

### **3. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### **4. Access Admin Dashboard**
Navigate to [http://localhost:5173/admin](http://localhost:5173/admin) to view all team submissions.

---

## 📖 Documentation

- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - High-level overview, timeline, deployment plan
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture, database schema, API docs

---

## 🏗️ Project Structure

```
incweb/
├── src/
│   ├── App.tsx                    # Root component, state management, submission modal
│   ├── supabaseClient.ts          # Supabase connection setup
│   └── components/
│       ├── Controls.tsx           # Customization sidebar with all controls
│       ├── Preview.tsx            # Live website preview
│       ├── AdminDashboard.tsx     # Admin view for submissions
│       └── backgrounds/           # 31 background preset components
│           ├── BackgroundRenderer.tsx
│           ├── PresetThumbnail.tsx
│           ├── backgroundPresets.ts
│           └── presets/
│               ├── SolidColor.tsx
│               ├── FloatingBlobs.tsx/css
│               ├── BokehLights.tsx/css
│               └── ... (28 more)
├── .env                           # Environment variables (GITIGNORED)
├── PROJECT_PLAN.md                # High-level project overview
├── ARCHITECTURE.md                # Technical documentation
└── README.md                      # This file
```

---

## 🎯 How It Works

### **For Students (Teams):**
1. Open the customizer at `http://localhost:5173`
2. Customize their site using the controls sidebar:
   - Choose background preset & colors
   - Upload logo and product images
   - Add decorative elements
   - Customize typography, colors, animations
   - Add team photos and info
3. Click **"Submit Design"** button
4. Enter team name and optional domain
5. Design saved to database with timestamp

### **For Admin (You):**
1. Monitor submissions at `/admin` dashboard
2. Download each team's design as JSON
3. Later: Convert JSON → HTML (using export script)
4. Deploy all team sites to hosting (Vercel)
5. Teams connect their custom domains via DNS

---

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

---

## 🎨 Customization Capabilities

### **Backgrounds (31 Total)**

**Animated (20):**
Aurora Drift, Floating Blobs, Particle Drift, Flow Lines, Waves, Shimmer, Ripples, Constellation, Aurora Waves, Plasma, Matrix Rain, Pulse Rings, Fireflies, Spiral, Bokeh Lights, Gradient Wash, Neon Glow, Light Rays, Color Bands, Grid Pulse

**Static (11):**
Mesh Gradient, Spotlight Vignette, Cut Paper Layers, Topographic Lines, Gradient Orbs, Dot Grid, Radial Burst, Hexagons, Geometric, Nebula, Solid Color

### **Typography (50+ Fonts)**

**Bold/Display:**
Black Ops One, Anton, Archivo Black, Kanit, Russo One, Bowlby One SC, Bungee, Exo 2, Fjalla One, Permanent Marker, Bebas Neue

**Script:**
Pacifico, Dancing Script, Satisfy, Great Vibes, Lobster

**Serif:**
Playfair Display, Merriweather, Lora, Crimson Text

**Sans-Serif:**
Inter, Roboto, Poppins, Montserrat, Open Sans, Raleway, and 30+ more

### **Images**
- Logo upload (4 size presets, X/Y positioning)
- Hero product image (large product photo with scale & positioning)
- Decorative floating images (unlimited, each with position/rotation/scale/z-index)
- Team member photos (individual or group)
- Product page image (optional)

### **Effects & Animations**
- Text effects: Glow, shadow, outline, gradient
- Hero animations: Fade-in, slide-up, scale-in, typewriter
- Card animations: Fade-in, slide-up, flip, bounce
- Hover effects: Lift, grow, glow, tilt

---

## 🗄️ Database Schema

**Table: `submissions`**

| Column        | Type          | Description                    |
|---------------|---------------|--------------------------------|
| `id`          | `int8`        | Auto-increment primary key     |
| `created_at`  | `timestamptz` | Submission timestamp (UTC)     |
| `team_name`   | `text`        | Team name (required)           |
| `domain_name` | `text`        | Custom domain (optional)       |
| `design_data` | `jsonb`       | Full AppState as JSON          |

---

## 🌐 Deployment

### **Deploy Customizer Tool (Vercel)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# Add environment variables in Vercel dashboard
```

**Or:** Connect GitHub repo to Vercel for automatic deployments on push.

### **Deploy Team Sites (Future)**

After teams submit designs:

1. **Export HTML** - Convert each team's JSON → static HTML/CSS
2. **Deploy All** - Batch deploy all team sites to Vercel
3. **Domain Setup** - Teams connect custom domains via DNS (CNAME records)

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for detailed deployment workflow.

---

## 🔐 Security Notes

**Current Setup (Event Use):**
- No authentication (intentional for simplicity)
- Public Supabase anon key (read/write access)
- Row-Level Security disabled
- Admin dashboard at public `/admin` route

**Suitable for:**
- One-time educational events
- Controlled environments (teacher supervision)
- Small scale (~20-100 teams)

**For Production:**
If this becomes a long-term tool, add:
- User authentication (Supabase Auth)
- Row-Level Security policies
- Rate limiting
- Admin password protection

See [ARCHITECTURE.md](./ARCHITECTURE.md) for security hardening details.

---

## 🐛 Troubleshooting

### **Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Environment Variables Not Loading**
- Ensure `.env` file is in project root
- Restart dev server after adding/changing env vars
- Variables must be prefixed with `VITE_` to be accessible

### **Supabase Connection Issues**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check Supabase project is active
- Verify table `submissions` exists with correct schema

### **Background Presets Not Showing**
- Check that preset is registered in all 3 locations:
  1. `backgroundPresets.ts` (metadata)
  2. `BackgroundRenderer.tsx` (import + PRESET_COMPONENTS)
  3. `PresetThumbnail.tsx` (import + PRESET_COMPONENTS)

---

## 🤝 Contributing

This is a project for a specific educational event. If you're working on it:

1. Read [PROJECT_PLAN.md](./PROJECT_PLAN.md) for context
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
3. Follow existing patterns (see component structure)
4. Test on mobile before committing
5. Never commit `.env` file

---

## 📝 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Custom CSS (no framework)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel (planned)
- **Image Handling:** FileReader API (base64 encoding)
- **State Management:** React useState + localStorage

---

## 📞 Support

For questions or issues:
- Review documentation: [PROJECT_PLAN.md](./PROJECT_PLAN.md), [ARCHITECTURE.md](./ARCHITECTURE.md)
- Check [Troubleshooting](#-troubleshooting) section
- Contact project maintainer

---

## 📄 License

This project is for educational use in a high school business incubator program.

---

## 🎓 Context

**Purpose:** Enable ~20 high school junior teams to design professional landing pages for their startup projects

**Timeline:**
- Tool ready: ✅ Complete
- Event: Tomorrow (teams submit designs)
- Deployment: Next week (convert JSON → HTML → host)

**Scale:** ~100 students, 20 teams, 1 event

---

**Last Updated:** February 8, 2026
**Status:** ✅ Ready for event! All features complete and tested.
