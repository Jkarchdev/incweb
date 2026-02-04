# Incubator Landing Page Customizer

An interactive single-page web app for teams to customize and preview their business incubator landing pages in real-time. Upload images, edit content, test different color palettes and backgrounds, all with full mobile responsiveness.

## Features

- **Live Preview**: See changes instantly as you customize
- **Two-Panel Layout**: Controls on left, live preview on right (desktop)
- **Mobile Responsive**: Works beautifully on screens as small as 390px
- **Image Upload**: Upload logo and team headshots with automatic fitting/cropping
- **6 Color Palettes**: Ocean, Sunset, Forest, Grape, Slate, Sand
- **6 Background Styles**: Solid, Gradient, Dots, Grid, Waves, Noise
- **Custom Colors**: Override with your own hex color
- **Team Management**: Create 3-6 teammate cards with photos, names, and roles
- **Smart Placeholders**: Beautiful SVG placeholders before you upload images

## Tech Stack

- **Vite** - Fast build tool
- **React** - UI library with TypeScript
- **CSS Variables** - Powerful theming system
- **No Backend** - Runs completely offline/locally

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to the URL shown (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## Usage Guide

### Controls Panel (Left Side)

**A) Logo/Wordmark**
- Click "Upload Logo" to select your logo image (PNG, JPG, WebP)
- Logo displays with `object-fit: contain` (never crops)

**B) Main Text**
- Edit your value proposition or description in the textarea

**C) Team Cards**
- Choose 3-6 team members from the dropdown
- For each teammate:
  - Upload headshot photo (auto-crops to square 1:1 ratio)
  - Enter name
  - Enter role/title

**D) Links**
- Set Instagram URL
- Set contact email (creates mailto link)

**E) Style Options**
- **Background Style**: Choose from 6 subtle patterns
- **Palette**: Select from 6 pre-designed color schemes
- **Custom Color**: Enter hex color (#RRGGBB) to override the primary color

### Mobile View

On screens smaller than 768px:
- Controls collapse into a drawer
- Click "⚙️ Settings" in the preview header to open controls
- Click "✕" to close and see the preview

## Image Requirements

- **Logo**: Any size/ratio - displays with `object-fit: contain`
- **Headshots**: Any size/ratio - auto-crops to 1:1 square with `object-fit: cover`
- **Formats**: PNG, JPG, WebP supported
- **No Upload Limit**: But keep files reasonable for performance

## Responsive Breakpoints

- **Desktop (>1024px)**: 3-column team grid
- **Tablet (768-1024px)**: 2-column team grid
- **Mobile (<768px)**: 1-column team grid, controls drawer
- **Small Mobile (390px)**: Optimized spacing and font sizes

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
