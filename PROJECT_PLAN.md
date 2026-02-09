# IncWeb - Team Website Builder & Deployment Plan

## 🎯 Project Overview
A website customization tool for ~20 high school teams to design their startup websites. Each team creates their design, submits it, and you deploy them all to their custom domains.

---

## ✅ What's Built (Completed)

### 1. **Customization Tool** (`http://localhost:5173`)
- Full website customizer with:
  - **31 animated/static backgrounds** with custom color pickers
  - **Solid color backgrounds** for bold, vibrant flat color designs
  - Theme colors & custom color picker for primary/secondary
  - **Background color override system** (apply custom colors to any preset)
  - Logo upload & positioning (X/Y offsets, 4 size presets)
  - **Hero product image** upload with positioning/scaling (NEW)
  - **Decorative floating images** with full position/rotation/scale/z-index control (NEW)
  - **50+ typography options** including 10 bold/display fonts (NEW)
  - Reorganized typography controls (team names, roles, footer separated)
  - Team section (individual or group photos)
  - Product page option
  - Social media links
  - Hero text effects (glow, shadow, outline, gradient)
  - Animations for hero, sections, and cards
  - Mobile responsive with breakpoints for images
  - **Enables bold product-focused landing pages** (beverage brands, physical products)

### 2. **Submission System**
- **"Submit Design" button** in the controls header
- Modal popup collects:
  - Team name (required)
  - Domain name (optional - teams might not have domains yet)
- Saves to Supabase database with timestamp
- Success confirmation after submission

### 3. **Admin Dashboard** (`http://localhost:5173/admin`)
- View all team submissions
- Shows: Team name, domain (if provided), submission time
- Click any submission to see details
- Download each team's design data as JSON
- Refresh button to get latest submissions

### 4. **Database** (Supabase)
- **Table:** `submissions`
- **Columns:**
  - `id` (auto-increment)
  - `created_at` (timestamp)
  - `team_name` (text)
  - `domain_name` (text, nullable)
  - `design_data` (jsonb - entire AppState)

---

## 📅 Timeline & Next Steps

### **Tomorrow (Day of Event):**
1. ✅ Tool is ready - students use it to design sites
2. ✅ Each team clicks "Submit Design" when done
3. ✅ You monitor admin dashboard to see submissions come in
4. ✅ Download all design JSON files for later deployment

### **After Tomorrow (Week After):**
**Phase 1: Generate HTML from Designs**
- Build script to convert each team's design JSON → HTML/CSS/JS
- Create folder structure:
  ```
  /exports
    /team-alpha
      - index.html
      - styles.css
      - assets/
    /team-beta
      - index.html
      - ...
  ```

**Phase 2: Batch Deploy All Sites**
- Deploy all ~20 sites to Vercel at once
- Get list of deployment URLs:
  - Team Alpha → `https://team-alpha.vercel.app`
  - Team Beta → `https://team-beta.vercel.app`
  - etc.

**Phase 3: Domain Connection**
- Create simple instruction sheet with screenshots
- Send to teacher to post in Google Classroom
- Students connect their own domains during class (5-10 min each)
- Teacher + classmates can help each other
- You're available via email for the 2-3 teams that might have issues

---

## 🏗️ Architecture

### **Frontend:**
- React + TypeScript + Vite
- Components:
  - `App.tsx` - Main app, submission modal, state management
  - `Controls.tsx` - Customization sidebar with all controls
  - `Preview.tsx` - Live website preview with hero product & decorative images
  - `AdminDashboard.tsx` - View all submissions
  - `backgrounds/` - 31 background preset components
    - 20 animated presets (Aurora Drift, Floating Blobs, Bokeh Lights, etc.)
    - 11 static presets (Mesh Gradient, Solid Color, etc.)
  - `PresetThumbnail.tsx` - Renders background previews in selector grid

### **Backend:**
- Supabase (PostgreSQL database)
- No auth needed - teams just submit anonymously
- Admin accesses dashboard directly (no login for now)

### **State Management:**
- `AppState` interface contains ALL customization data including:
  - Background config (preset, colors, settings)
  - Theme colors and fonts
  - Logo and hero product image data (base64 encoded)
  - Decorative images array with position/rotation/scale
  - Typography settings (6 separate font controls)
  - Team photos, social links, visibility toggles
  - Animation preferences
- Saved to localStorage (auto-save as user customizes)
- Backward compatibility migration in `loadState()` for renamed fields
- Submitted to Supabase when team clicks "Submit"
- Each submission includes full `AppState` as JSON (including all images as base64)

---

## 🔑 Key Files

### **Configuration:**
- `.env` - Supabase credentials (DO NOT COMMIT TO GIT)
- `src/supabaseClient.ts` - Supabase connection setup

### **Main Components:**
- `src/App.tsx` - Root component, submission logic
- `src/components/Controls.tsx` - Customization controls
- `src/components/Preview.tsx` - Live preview rendering
- `src/components/AdminDashboard.tsx` - Admin view
- `src/components/backgrounds/backgroundPresets.ts` - All 24 backgrounds defined

### **Styles:**
- `src/App.css` - App layout, modal styles
- `src/components/Preview.css` - Preview/website styles
- `src/components/Controls.css` - Controls panel styles
- `src/components/AdminDashboard.css` - Admin dashboard styles

---

## 🚀 Deployment Plan (Detailed)

### **Current URLs:**
- **Dev Server:** `http://localhost:5173` (customizer)
- **Admin Dashboard:** `http://localhost:5173/admin`

### **For Tomorrow:**
**Option A: Keep it Local**
- Run dev server on your laptop
- Students access via `http://YOUR-LOCAL-IP:5173` on school WiFi
- Simple, no deployment needed

**Option B: Deploy Tool to Vercel**
- Deploy this customizer app to Vercel
- Get public URL like `incweb-builder.vercel.app`
- Students access from anywhere
- Takes 5 minutes to deploy

### **For Team Sites (After Submissions):**
1. **Export HTML Script** (Need to build):
   ```bash
   node scripts/export-all-designs.js
   # Reads from Supabase, generates HTML for each team
   ```

2. **Deploy All Script** (Need to build):
   ```bash
   node scripts/deploy-all-teams.js
   # Deploys each team folder to Vercel
   # Outputs: Team Name → Vercel URL
   ```

3. **Domain Connection Instructions** (Need to create):
   - Simple PDF with screenshots
   - Step-by-step DNS setup
   - Teacher posts in Google Classroom

---

## 📧 Domain Setup Process

### **How Domains Work:**
1. Teams bought domains (GoDaddy, Namecheap, etc.)
2. You deploy their site → get `team-name.vercel.app`
3. Teams add DNS record pointing their domain → your Vercel URL
4. Their custom domain now shows their site
5. **No passwords needed from them!**

### **DNS Instructions (Simplified):**
```
1. Log into your domain provider (GoDaddy/Namecheap/etc.)
2. Find "DNS Settings"
3. Add CNAME record:
   - Name: www
   - Value: cname.vercel-dns.com
4. Save & wait 10 minutes
5. Visit www.yourteamdomain.com - should work!
```

### **Classroom Setup:**
- Post instructions + team URL list in Google Classroom
- Students do it during class together
- Teacher available to help
- You available via email for edge cases

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Custom CSS (no framework)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel (planned)
- **Domain Management:** Teams handle their own DNS

---

## 📝 Important Notes

### **What Students See:**
- Clean customization interface
- Live preview of their website
- Simple "Submit Design" button
- No accounts/passwords needed

### **What You See:**
- Admin dashboard with all submissions
- Download JSON for each team
- Team names + domains + submission times

### **Security:**
- No user authentication (intentionally simple)
- Supabase has RLS disabled (teams can submit freely)
- Admin dashboard is at `/admin` (anyone can access - add password later if needed)

### **Data Flow:**
```
Student customizes → AppState updates → Clicks Submit
                                              ↓
                                    Saves to Supabase
                                              ↓
                     You view in Admin Dashboard → Download JSON
                                              ↓
                           Later: Convert JSON → HTML → Deploy
```

---

## 🔄 To Resume This Project:

When starting a new Claude Code session, say:
**"Read PROJECT_PLAN.md and help me continue building the IncWeb project"**

Then ask your specific question or task!

---

## 📞 Contact Info

- **Your Role:** Project owner (18, working with high school juniors)
- **Timeline:** Tool ready today, submissions tomorrow, deployments next week
- **Scale:** ~20 teams, ~100 students total

---

## 🎨 Customization Features Summary

**Background Options:** 31 total
- **Animated:** Aurora Drift, Floating Blobs, Particle Drift, Flow Lines, Waves, Shimmer, Ripples, Constellation, Aurora Waves, Plasma, Matrix Rain, Pulse Rings, Fireflies, Spiral, Bokeh Lights, Gradient Wash, Neon Glow, Light Rays, Color Bands, Grid Pulse
- **Static:** Mesh Gradient, Spotlight, Cut Paper, Topo Lines, Gradient Orbs, Dot Grid, Radial Burst, Hexagons, Geometric, Nebula, Solid Color
- **Background Customization:**
  - Custom color pickers (Color 1 & Color 2) for all presets
  - Settings: intensity, speed, density sliders
  - Enhanced opacity (all presets boosted 30-50% for better visibility)

**Theme Options:**
- 6 preset palettes (Ocean, Sunset, Forest, Grape, Slate, Sand)
- Custom primary + secondary colors
- Auto-generates theme colors from custom color

**Typography:**
- **50+ Google Fonts** including 10 new bold/display fonts:
  - Bold/Display: Black Ops One, Anton, Archivo Black, Kanit, Russo One, Bowlby One SC, Bungee, Exo 2, Fjalla One, Permanent Marker
  - Script: Pacifico, Dancing Script, Satisfy
  - Serif: Playfair Display, Merriweather, Lora
  - Sans-Serif: Inter, Roboto, Poppins, Montserrat, and 30+ more
- **Separate font controls for:**
  - Hero text (main headline)
  - Subtext (tagline/subtitle)
  - Team member names
  - Team member roles
  - Footer links
  - UVP text
- Size sliders for each text element (increased defaults for bolder look)
- Letter spacing control for hero text

**Hero Section:**
- Logo upload + 4 size options
- Logo position sliders (X/Y offset)
- **Hero Product Image** (NEW):
  - Upload large product/hero image
  - Position controls (X/Y offset: -200% to 200%)
  - Scale slider (50-200%)
  - Visibility toggle
  - Perfect for bold product-focused designs (cans, bottles, products)
- Hero headline with customizable font/color/position
- Tagline below headline
- Text effects: glow, shadow, outline, gradient
- Hero animations: fade-in, slide-up, scale-in, typewriter

**Decorative Floating Images** (NEW):
- Add multiple decorative images (oranges, water splashes, floating elements)
- Per-image controls:
  - Upload custom image
  - X position (-100% to 100%)
  - Y position (0% to 100%)
  - Scale (20-150%)
  - Rotation (-180° to 180°)
  - Z-index (1-10 for layering)
- Add/remove unlimited decorative elements
- Enables bold, vibrant designs like beverage brand sites

**Team Section:**
- Individual photos or group photo mode
- 3-6 team members
- Card styles: glass, solid, outline, shadow
- Card layouts: grid, carousel, stacked
- Card animations: fade-in, slide-up, flip, bounce
- Hover effects: lift, grow, glow, tilt

**Other:**
- Product page (optional)
- Social media links (Instagram, Twitter, LinkedIn, TikTok)
- Contact email in footer
- Section visibility toggles
- Animation controls for all elements

---

## 🎨 Recent Major Updates (Feb 8, 2026)

### **Bold Product-Focused Features Update**
Inspired by modern beverage brand sites (like FIZI), added capabilities for vibrant, product-centric designs:

1. **Solid Color Backgrounds**
   - New "Solid Color" preset for flat, bold backgrounds
   - Perfect for vibrant single-color designs (bright orange, teal, etc.)
   - Uses CSS variables so it picks up custom color picker values

2. **Hero Product Image System**
   - Upload large product images (cans, bottles, devices)
   - Full positioning control (X/Y from -200% to 200%)
   - Scale from 50% to 200%
   - Visibility toggle
   - Z-index: 2 (sits above background, below text)

3. **Decorative Floating Images**
   - Add unlimited decorative elements (oranges, water splashes, geometric shapes)
   - Per-image controls: upload, X/Y position, scale, rotation, z-index
   - Enables layered, dynamic compositions
   - Mobile responsive (scales down appropriately)

4. **Expanded Typography**
   - Added 10 bold/display fonts for impactful headlines
   - Increased default sizes for bolder appearance
   - Reorganized controls: separate labels for team names, roles, footer

5. **Background System Overhaul**
   - Added 7 new animated presets (Bokeh Lights, Gradient Wash, Neon Glow, Light Rays, Color Bands, Grid Pulse, Solid Color)
   - Background color pickers (Color 1 & Color 2) apply to all presets
   - Boosted opacity across all presets by 30-50% for better visibility
   - Increased default intensity/speed/density settings

**Result:** Teams can now create bold, modern product-focused landing pages with vibrant solid colors, large product imagery, and floating decorative elements—matching the aesthetic of professional beverage/product brands.

---

## 🐛 Known Issues / Future Improvements

### **Current Limitations:**
- No undo/redo functionality
- No design templates (students start from scratch)
- Admin dashboard has no password protection
- Can't preview mobile view in customizer (is mobile responsive though)

### **Could Add Later:**
- User accounts + saved projects
- Share designs with a link
- Duplicate/copy designs
- Export to HTML directly from customizer (currently requires manual export script)
- Image gallery for team photos
- Preset templates (pre-designed starting points)
- Real-time collaboration (multiple users editing same design)
- Version history / snapshots
- Asset library (pre-loaded decorative images teams can use)

---

## 💾 Supabase Info

**Project Name:** Team-Sites (or whatever you named it)
**URL:** `https://klreatquddzaqastpbcz.supabase.co`
**Table:** `submissions`

**To view submissions:**
1. Go to supabase.com
2. Log in
3. Select "Team-Sites" project
4. Click "Table Editor"
5. Click "submissions" table
6. See all submissions with team names, domains, timestamps

**To query via SQL:**
```sql
SELECT team_name, domain_name, created_at
FROM submissions
ORDER BY created_at DESC;
```

---

## 📦 Git Repository Status

**Latest Commit:** `48163df` - "Add bold product-focused features and reorganize typography"
- 38 files changed: 2,471 insertions, 161 deletions
- Includes: Hero product image system, decorative floating images, 10 new bold fonts, 7 new background presets, background color pickers, typography reorganization

**Branch:** `main`
**Remote:** Pushed to GitHub

**Important:** `.env` file is in `.gitignore` (contains Supabase credentials - never commit!)

---

**Last Updated:** February 8, 2026, 6:15 PM
**Status:** ✅ Ready for event! All features complete and tested.
