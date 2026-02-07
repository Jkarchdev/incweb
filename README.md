# Team Website Builder (Business Incubator)

## What this project is
This project is a **web app that lets incubator teams design their own website** using a shared template (colors, fonts, text, sections, images, animations), and then **turn those choices into a real published team website** — without someone manually building 20 separate sites.

## End goal ✅
Create a **repeatable "one template → many team sites" system**:

- Teams use the builder to customize a site to match their brand
- Their choices are saved as a **team configuration** (the "source of truth")
- That configuration can be **exported and/or published**
- The system can generate and host **a separate website for each team** (e.g., 20+ teams) with minimal manual work

## What the app should enable
- **Live preview** while teams edit
- Customization of:
  - layout/sections (what appears on the page and where)
  - colors, typography, and styling
  - text content (headlines, descriptions, CTA buttons, etc.)
  - images/logos (with auto-fit / crop behavior)
  - optional animations / effects
- **Export** of team settings (so a team's site can be reproduced exactly later)
- A clear path to **publishing** each team's site using the saved/exported configuration

## Core idea (high-level)
Everything a team designs becomes a structured config (ex: JSON).
The public team website is simply the template rendered using that config.

This keeps the project flexible: the UI and template can evolve, while the concept stays the same.

## What's intentionally flexible right now 🧪
Implementation details (exact UI, sections, storage method, backend choice, export format) may change as the builder experience is refined. The README focuses on the outcome and workflow, not locked technical decisions.

## Success looks like
- Teams can independently build a site they're proud of
- Their choices can be saved/exported reliably
- The incubator can launch and maintain many team websites quickly and consistently
