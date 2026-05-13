# CopilotRink 🏒🤖

Fort Vermilion School Division — Microsoft 365 Copilot adoption game.

Two-team hockey-themed leaderboard where departments compete by logging Copilot wins. A separate **CopilotMan Arcade** acts as an engagement hook (carrot-and-stick to keep people opening the app and logging wins).

## V1 (this build)

- JSON-file data layer (no backend) — persisted to `localStorage` after first load
- Hardcoded current user (switchable via Profile page for PoC demo)
- 4 departments split into 2 teams (Ice Hawks vs. Tundra Wolves)
- Scoring engine implements the locked-in hockey-realistic formula:

| Period | Weeks | Hours/goal | Wins/goal | Multiplier |
|--------|-------|-----------|-----------|-----------|
| Regulation | 1–2 | 5h | 10 verified | 1.0× |
| Overtime | 3 | 5h | 10 verified | 1.5× |
| Shootout | 4 | 3h | 5 verified | 2.0× |

Verified wins get a +5 min bonus. Weekly highlight reel = +1 bonus goal (admin awarded).

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173/gamification/`).

## Deploy to GitHub Pages

This repo ships with `.github/workflows/deploy.yml`. On every push to `main`:

1. GitHub Actions runs `npm ci && npm run build`
2. The `dist/` folder is uploaded as a Pages artifact
3. GitHub deploys it to `https://skmckenFVSD.github.io/gamification/`

**One-time setup in the repo:**

1. Settings → Pages → Source: **GitHub Actions**
2. Push to `main` — the workflow takes over

The Vite config sets `base: '/gamification/'` to match the Pages path.

## Project layout

```
src/
  components/   Layout, Rink (SVG), Avatar
  pages/        Home, SubmitWin, Profile, Arcade, HallOfFame
  context/      AppContext — single source of truth, localStorage-backed
  lib/          scoring.js (period engine), dataStore.js (JSON loader)
  styles/       global.css with CSS variables + dark-mode support
public/
  data/         departments.json, players.json, games.json, wins.json, arcadeScores.json
```

## V2 (planned)

- Dataverse migration (replace `dataStore.js`)
- Entra ID SSO (replace hardcoded `currentPlayerId`)
- Power Automate human-in-the-loop verification flow
- Real profile photos from Graph
- Viva Insights Copilot Dashboard integration for "simulated" → real metrics

See the Planner plan for the full backlog.
