# FVSD Faceoff

> **Competing Together for the Future of AI in Education**

A Copilot adoption game built as a hockey league, running across Fort Vermilion School Division.

---

## The short version

Training videos didn't move the dial on Copilot adoption across our Division.

Nudge emails didn't either.

So we built a hockey rink.

FVSD Faceoff turns Copilot usage into a Season-long league. Departments are Teams. Copilot interactions are stats. Each month is a Game, played on a real scoreboard with real standings. The point isn't to gamify for the sake of it, it's that the scoreboard works on staff the way nudge emails never will.

## What it is

A React app with a seasonal scoreboard, a leaderboard, achievement badges, and Department standings. Copilot telemetry feeds the scoring. The visual language is rink-side, the math is straightforward, and the social pressure is the engine.

| Concept | In the game |
|---|---|
| Department | Team |
| Staff member | Player |
| Month | Game |
| School Year | Season |
| Copilot interaction | Stat (prompts, AI Hours, XP) |
| Scoreboard | Live standings, badges, and milestones |

The whole thing themes itself across three Seasons (Fall, Winter, Spring), with its own palette, rink artwork, and atmospheric overlays per Season.

## Status

**Wave 1, in active development.**

Everything you see in `docs/art-boards/` is concept art, not screenshots. The component library at `src/components/FaceoffPreview.jsx` renders a working Winter scoreboard against the staged Wave 1 assets. Wave 2 (full Scoreboard component with live Department rankings, Game switcher, roster cards) is on the board next.

A full manifest of staged assets and their mapping to production paths lives at `docs/assets-manifest.json`, with the human-readable version in the project's working documents.

## How it works

```
M365 telemetry  →  scoring engine  →  Department standings  →  Faceoff scoreboard
   (Copilot          (per-Game,           (live rankings,         (React + Tailwind,
    usage logs)       per-Season           XP, badges)              seasonal theming)
                      weights)
```

- **Scoring**: A weighted formula across prompts, AI Hours, and XP, normalised by Department headcount so smaller Departments aren't disadvantaged. The formula is signed off and lives in the Planner backlog.
- **Telemetry**: Copilot usage data pulled into Power BI, with the scoring layer planned to move into Dataverse in V2.
- **Frontend**: React 18, Vite, Tailwind, Framer Motion, lucide-react. Single-page, deploys to GitHub Pages for now.
- **Theming**: All visuals are CSS-variable driven (`--season-primary`, `--season-glow`, etc.). Switching Seasons is a className swap, the whole UI re-skins.

## Repository layout

```
fvsd-faceoff/
├── public/
│   └── assets/
│       ├── backgrounds/      # 4K seasonal backdrops (Fall, Winter, Spring)
│       ├── rink/             # Canonical seasonal rinks + boards, markings, props
│       ├── overlays/         # Atmospheric overlays (bokeh, aurora, haze)
│       ├── scoreboard/       # Scoreboard frame, icons, glow, layouts, themes
│       ├── badges/           # Tiers, milestones, achievements, fx, indicators
│       └── ui/               # Buttons, inputs, charts, modals, nav, micro-interactions
├── src/
│   ├── components/
│   │   └── FaceoffPreview.jsx   # The component library, Winter scoreboard by default
│   ├── main.jsx
│   └── styles.css
├── docs/
│   ├── art-boards/           # Phase 1 to 5 art board references
│   └── assets-manifest.json  # Full concept → production asset mapping
└── package.json
```

189 concept assets are staged across 5 Phases. Phase 1 covers environment basics (backgrounds, overlays, base rinks), Phase 2 the rink detail layer, Phase 3 the scoreboard system, Phase 4 achievements and progression, Phase 5 the UI primitives.

## Running it

```bash
npm install
npm run dev
```

Visits `localhost:5173` and serves the Winter scoreboard against the staged Wave 1 assets.

The component library currently expects nine specific `.webp` paths (three seasonal backgrounds, three seasonal rinks, three atmospheric overlays). The staged files are still `.jpg`/`.png` pending a `cwebp -q 88` pass, the gap is documented in the asset manifest.

## Concept art

The five Phase Art Boards under `docs/art-boards/` are the design references the visual system was built against. They are not app screenshots, they are intentionally rendered concept frames that establish the seasonal palette, rink language, scoreboard geometry, and badge style.

| Phase | Scope |
|---|---|
| Phase 1 | Environment basics — seasonal backgrounds, base rinks, atmospheric overlays |
| Phase 2 | Rink detail layer — boards, markings, ice gradients, props, edge glows |
| Phase 3 | Scoreboard system — glass-panel frame, metric cards, layouts, theme variants |
| Phase 4 | Achievements and progression — badge tiers, milestones, level indicators, toasts |
| Phase 5 | UI primitives — buttons, inputs, charts, modals, navigation, micro-interactions |

Real captures replace these once the new Scoreboard component ships.

## Roadmap

**Wave 1 (now)**
- Asset library staged
- Winter scoreboard rendering
- Scoring formula signed off
- Planner backlog set

**Wave 2 (next)**
- Live Department standings
- Featured Game switcher with PIP layout
- Department Team roster cards (1G/2D/3F)
- Webp conversion pass across staged assets
- Real app screenshots replacing concept art in marketing material

**V2 (after Wave 2)**
- Dataverse-backed scoring layer
- Copilot Agent sync into the rink
- Multi-Season historical view
- Cross-Division benchmarking, if the model holds up

## Tech stack

- **React 18.3** + **Vite 5**
- **Tailwind CSS 3.4**
- **Framer Motion 11** for the scoreboard animations and aurora drift
- **lucide-react** icons
- **Power BI** for the scoring data, with **Dataverse** planned for V2

No backend in the V1 build, the scoreboard reads from a static stats object while the telemetry pipeline catches up.

## Why share this here

This repo is going out to a small group inside the Microsoft Advocates community, particularly folks working on Copilot adoption, for feedback. A few specific things I'd value a second pair of eyes on:

1. **The scoring model.** Does the prompts + AI Hours + XP weighting feel like it rewards the right behaviour, or does it over-index on volume at the expense of quality?
2. **The Game / Season cadence.** Monthly Games inside a school-year Season felt right for our context, however, I'm open to whether a shorter cycle would drive more engagement.
3. **The Copilot Agent path.** V2 wants a Copilot Agent that can read the rink and answer questions about standings, suggest prompts a Department is underusing, surface achievements. Anyone building similar adoption-coach Agents, I'd love to compare notes.
4. **Anything you'd steal.** Genuinely. If a pattern here would help another Division, take it.

Open an issue or reach out directly. Happy to walk through the design choices.

## Licence

MIT. See [LICENSE](LICENSE).

Built at **Fort Vermilion School Division**, Northern Alberta.
