<div align="center">

<img src="./public/copilot-rink-logo.svg" alt="FVSD Faceoff Logo" width="180" />

# FVSD Faceoff
### Competing Together for the Future of AI in Education

</div>

*A premium hockey-inspired Microsoft 365 Copilot adoption experience built for Fort Vermilion School Division.*

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Styled-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Copilot](https://img.shields.io/badge/Microsoft_365-Copilot-5E5ADB?style=for-the-badge&logo=microsoft&logoColor=white)
![Status](https://img.shields.io/badge/Status-V1.5_In_Development-00C853?style=for-the-badge)

</div>

---

# 🎯 Vision

FVSD Faceoff is not a generic leaderboard app.

It is a Division-wide hockey-themed engagement platform designed to increase meaningful Microsoft 365 Copilot adoption across Fort Vermilion School Division.

The project reframes Copilot usage as a competitive hockey season:

- Departments become Teams
- Copilot interactions become stats
- Monthly competitions become Games
- Users contribute points toward their Team standings
- Seasonal progression creates long-term engagement

The app combines:

- Hockey culture familiar to Northern Alberta
- Premium esports-inspired UI design
- Real-time leaderboard mechanics
- Gamification systems
- Seasonal presentation layers
- AI productivity metaphors

The goal is simple:

> Make Copilot adoption visible, collaborative, competitive, and genuinely fun.

---

# 🧊 Core Design Philosophy

## Images Create Atmosphere. React Owns Meaning.

FVSD Faceoff uses cinematic environmental artwork to establish immersion while keeping all meaningful content dynamic and data-driven.

### Environmental Assets
Used for:

- Seasonal backgrounds
- Aurora effects
- Ice overlays
- Atmospheric lighting
- Rink environments
- UI glow systems

### React / DOM Components
Used for:

- Scoreboards
- Metrics
- Team standings
- Leaderboards
- XP systems
- Achievements
- Challenges
- Dynamic game state

This architecture ensures:

- Full responsiveness
- Mobile compatibility
- Accessibility
- Dynamic rendering
- Real-time updates
- Maintainable UI composition

---

# 🏒 Experience Overview

## Seasonal Hockey Experience

FVSD Faceoff runs as a full hockey season across the school year.

| Season | Months | Visual Direction |
|---|---|---|
| 🍂 Fall | September → December | Copper skies, frost, amber lighting |
| ❄️ Winter | January → March | Aurora borealis, neon cyan, snowfall |
| 🌱 Spring | April → June | Ice melt, teal sunrise, championship atmosphere |

Each season dynamically changes:

- Background environments
- Rink visuals
- Lighting systems
- UI accent colors
- Overlay effects
- Scoreboard presentation

---

# 🧩 Feature Overview

## 🏟️ Hockey-Themed League System

- Department vs Department competition
- Monthly Games
- Seasonal standings
- Featured Games
- Team rosters
- League progression

## 📊 Dynamic Scoreboard System

The scoreboard is a fully DOM-rendered React component.

No bitmap overlays.

This enables:

- Dynamic values
- Responsive scaling
- Mobile support
- Flexible layouts
- Multiple featured game views
- Future live updates

## 🥅 Beat the Goalie Mini-Game

A hockey shooting challenge replacing the original Pacman-style arcade concept.

Players use Copilot-themed slapshots to clear incoming work represented as puck objects.

The mini-game acts as:

- an engagement mechanic
- a skills challenge
- a productivity metaphor
- a recurring seasonal event

## 🏆 Gamification Systems

- XP progression
- Achievement badges
- Seasonal rewards
- Milestone unlocks
- Team rankings
- Challenge systems
- MVP tracking
- League standings

---

# 🎨 Visual System

FVSD Faceoff uses a layered cinematic rendering model.

## Rendering Layers

```txt
Layer 1 → Seasonal Environment Background
Layer 2 → Atmospheric FX (Aurora / Snow / Haze)
Layer 3 → Ice Reflection and Texture Overlays
Layer 4 → Rink System
Layer 5 → Scoreboard Components
Layer 6 → UI Panels and Navigation
Layer 7 → Gamification FX and Motion Systems
```

## Visual Direction

The design language combines:

- NHL broadcast aesthetics
- esports presentation systems
- glassmorphism UI
- cinematic Northern Alberta environments
- premium dashboard composition

The goal is to feel:

> modern, immersive, and premium

rather than:

> a traditional corporate dashboard

---

# 📦 Asset System

All production artwork and visual systems are organized under:

```txt
/public/assets/fvsd-faceoff/
```

## Asset Phases

| Phase | Description |
|---|---|
| Phase 1 | Seasonal cinematic backgrounds and environmental overlays |
| Phase 2 | Rink systems, ice overlays, and arena environment assets |
| Phase 3 | Scoreboard concepts, glass systems, responsive layout references |
| Phase 4 | Gamification systems, badges, XP visuals, rewards |
| Phase 5 | UI design system, components, micro interactions, effects |

## Asset Architecture

```txt
public/
  assets/
    fvsd-faceoff/
      phase1-backgrounds/
      phase2-rink/
      phase3-scoreboard/
      phase4-gamification/
      phase5-ui/
```

---

# 🛠️ Technical Stack

## Frontend

- React
- Vite
- TailwindCSS
- Framer Motion
- CSS Variable Seasonal Theming

## Planned Platform Services

- Microsoft 365 Copilot
- Dataverse
- Entra ID
- Copilot Studio
- Power Automate
- Microsoft Graph

---

# 🧱 Current Architecture

## V1.5

Current development focuses on:

- Premium UI rebuild
- Seasonal theming system
- Responsive scoreboard architecture
- Team and Game management
- Monthly game structure
- League standings
- Enhanced gamification systems

## V2 (Planned)

Future architecture introduces:

- Dataverse as system of record
- Entra ID authentication
- Role and permissions tables
- Copilot Agent synchronization
- Real M365 telemetry integration
- Automated challenge generation
- Live data services

---

# 🚀 Quick Start

## Install

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

# 🌐 GitHub Pages Deployment

This repository deploys automatically through GitHub Actions.

On every push to `main`:

1. Vite production build executes
2. `dist/` output is generated
3. GitHub Pages deploy workflow runs automatically
4. Updated app publishes to GitHub Pages

## Repository Settings

```txt
Settings → Pages → Source → GitHub Actions
```

The Vite configuration uses:

```js
base: '/gamification/'
```

to correctly align with GitHub Pages routing.

---

# 📁 Project Structure

```txt
src/
  components/
    faceoff/
      AppShell.tsx
      SeasonalBackground.tsx
      Scoreboard.tsx
      MetricCard.tsx
      AchievementBadge.tsx
      Leaderboard.tsx
      FaceoffFrame.tsx

  context/
    AppContext

  pages/
    Dashboard
    Games
    Challenges
    Achievements
    Arcade
    HallOfFame

  styles/
    faceoff-season.css

  lib/
    scoring.js
    dataStore.js

public/
  assets/
    fvsd-faceoff/
      phase1-backgrounds/
      phase2-rink/
      phase3-scoreboard/
      phase4-gamification/
      phase5-ui/

  data/
    departments.json
    games.json
    players.json
    wins.json
```

---

# 🧠 Build Principles

## Core Rules

### Images create atmosphere. React owns meaning.

### Mobile-first responsive design.

### Seasonal identity is core architecture, not decoration.

### Premium experience over novelty.

### Hockey metaphor must remain consistent across the platform.

---

# 📸 Design Direction

FVSD Faceoff draws inspiration from:

- NHL broadcast graphics
- esports overlays
- Microsoft Copilot visual language
- cinematic Northern Alberta landscapes
- glassmorphism UI systems
- modern gaming HUD design

---

# 🏔️ Built for Northern Alberta

FVSD Faceoff is intentionally local.

The visual identity, hockey metaphors, environmental design, and seasonal cadence are all designed specifically around the culture and geography of Northern Alberta and Fort Vermilion School Division.

This is not a generic SaaS platform.

It is an internally-built engagement experience designed around how people here already think, compete, and collaborate.

---

# 👤 Author

**Scott McKenzie**  
Fort Vermilion School Division  
Microsoft Fabric, Copilot, Power Platform, and AI Strategy

---

# 📄 License

Internal FVSD project.

Not intended for commercial distribution.

