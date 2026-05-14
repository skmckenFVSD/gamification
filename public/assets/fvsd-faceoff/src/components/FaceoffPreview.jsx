import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  MessageSquareText,
  Clock3,
  Star,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const themes = {
  fall: {
    id: "fall",
    name: "Fall",
    label: "Fall Season",
    backgroundImage: "/assets/backgrounds/fall_background_4k.webp",
    rinkImage: "/assets/rink/rink_fall.webp",
    overlayImage: "/assets/overlays/light_bokeh_overlay.png",
    className: "season-fall",
    colors: {
      pageFrom: "#120A05",
      pageVia: "#1B2230",
      pageTo: "#071321",
      primary: "#FF8C00",
      secondary: "#F4B942",
      tertiary: "#8B4513",
      ice: "#BBDDF2",
      text: "#FFFFFF",
      muted: "#D9E6F2",
      panel: "rgba(7, 25, 64, 0.58)",
      panelStrong: "rgba(10, 18, 32, 0.78)",
      border: "rgba(255, 184, 72, 0.28)",
      glow: "rgba(255, 140, 0, 0.42)",
      glowSoft: "rgba(255, 140, 0, 0.18)",
    },
  },
  winter: {
    id: "winter",
    name: "Winter",
    label: "Winter Season",
    backgroundImage: "/assets/backgrounds/winter_background_4k.webp",
    rinkImage: "/assets/rink/rink_winter.webp",
    overlayImage: "/assets/overlays/aurora_glow_overlay.png",
    className: "season-winter",
    colors: {
      pageFrom: "#03101F",
      pageVia: "#071940",
      pageTo: "#020712",
      primary: "#23D5FF",
      secondary: "#6A00FF",
      tertiary: "#00E5FF",
      ice: "#E6F6FF",
      text: "#FFFFFF",
      muted: "#D9E6F2",
      panel: "rgba(7, 25, 64, 0.62)",
      panelStrong: "rgba(2, 7, 18, 0.82)",
      border: "rgba(35, 213, 255, 0.28)",
      glow: "rgba(35, 213, 255, 0.44)",
      glowSoft: "rgba(35, 213, 255, 0.18)",
    },
  },
  spring: {
    id: "spring",
    name: "Spring",
    label: "Spring Season",
    backgroundImage: "/assets/backgrounds/spring_background_4k.webp",
    rinkImage: "/assets/rink/rink_spring.webp",
    overlayImage: "/assets/overlays/horizon_haze.png",
    className: "season-spring",
    colors: {
      pageFrom: "#061F25",
      pageVia: "#092A35",
      pageTo: "#071321",
      primary: "#6EE7F2",
      secondary: "#00D4C8",
      tertiary: "#B9F6FF",
      ice: "#F2F7FA",
      text: "#FFFFFF",
      muted: "#E7F3F7",
      panel: "rgba(8, 40, 52, 0.58)",
      panelStrong: "rgba(5, 18, 28, 0.78)",
      border: "rgba(110, 231, 242, 0.28)",
      glow: "rgba(110, 231, 242, 0.38)",
      glowSoft: "rgba(110, 231, 242, 0.16)",
    },
  },
};

const seasonalCss = `
:root {
  --faceoff-font-display: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --faceoff-radius-sm: 0.75rem;
  --faceoff-radius-md: 1rem;
  --faceoff-radius-lg: 1.5rem;
  --faceoff-radius-xl: 2rem;
  --faceoff-blur: 22px;
  --faceoff-transition: 180ms ease;
}

.faceoff-app {
  --season-page-from: #03101F;
  --season-page-via: #071940;
  --season-page-to: #020712;
  --season-primary: #23D5FF;
  --season-secondary: #6A00FF;
  --season-tertiary: #00E5FF;
  --season-ice: #E6F6FF;
  --season-text: #FFFFFF;
  --season-muted: #D9E6F2;
  --season-panel: rgba(7, 25, 64, 0.62);
  --season-panel-strong: rgba(2, 7, 18, 0.82);
  --season-border: rgba(35, 213, 255, 0.28);
  --season-glow: rgba(35, 213, 255, 0.44);
  --season-glow-soft: rgba(35, 213, 255, 0.18);
  --season-danger: #FF4D4D;
  --season-success: #63FF91;
  --season-warning: #FFC857;
  color: var(--season-text);
  font-family: var(--faceoff-font-display);
}

.faceoff-app.season-fall {
  --season-page-from: #120A05;
  --season-page-via: #1B2230;
  --season-page-to: #071321;
  --season-primary: #FF8C00;
  --season-secondary: #F4B942;
  --season-tertiary: #8B4513;
  --season-ice: #BBDDF2;
  --season-muted: #D9E6F2;
  --season-panel: rgba(7, 25, 64, 0.58);
  --season-panel-strong: rgba(10, 18, 32, 0.78);
  --season-border: rgba(255, 184, 72, 0.28);
  --season-glow: rgba(255, 140, 0, 0.42);
  --season-glow-soft: rgba(255, 140, 0, 0.18);
}

.faceoff-app.season-winter {
  --season-page-from: #03101F;
  --season-page-via: #071940;
  --season-page-to: #020712;
  --season-primary: #23D5FF;
  --season-secondary: #6A00FF;
  --season-tertiary: #00E5FF;
  --season-ice: #E6F6FF;
  --season-muted: #D9E6F2;
  --season-panel: rgba(7, 25, 64, 0.62);
  --season-panel-strong: rgba(2, 7, 18, 0.82);
  --season-border: rgba(35, 213, 255, 0.28);
  --season-glow: rgba(35, 213, 255, 0.44);
  --season-glow-soft: rgba(35, 213, 255, 0.18);
}

.faceoff-app.season-spring {
  --season-page-from: #061F25;
  --season-page-via: #092A35;
  --season-page-to: #071321;
  --season-primary: #6EE7F2;
  --season-secondary: #00D4C8;
  --season-tertiary: #B9F6FF;
  --season-ice: #F2F7FA;
  --season-muted: #E7F3F7;
  --season-panel: rgba(8, 40, 52, 0.58);
  --season-panel-strong: rgba(5, 18, 28, 0.78);
  --season-border: rgba(110, 231, 242, 0.28);
  --season-glow: rgba(110, 231, 242, 0.38);
  --season-glow-soft: rgba(110, 231, 242, 0.16);
}

.faceoff-season-background {
  background:
    radial-gradient(circle at 20% 10%, var(--season-glow-soft), transparent 28%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 24%),
    linear-gradient(135deg, var(--season-page-from), var(--season-page-via), var(--season-page-to));
}

.faceoff-vignette {
  background:
    linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(7,25,64,0.66) 48%, rgba(0,0,0,0.92)),
    radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.54) 100%);
}

.faceoff-glass {
  background: var(--season-panel);
  border: 1px solid var(--season-border);
  border-radius: var(--faceoff-radius-lg);
  backdrop-filter: blur(var(--faceoff-blur));
  -webkit-backdrop-filter: blur(var(--faceoff-blur));
  box-shadow:
    0 0 42px var(--season-glow-soft),
    inset 0 1px 0 rgba(255,255,255,0.14),
    inset 0 -1px 0 rgba(255,255,255,0.06);
}

.faceoff-glass-strong {
  background: var(--season-panel-strong);
  border: 1px solid var(--season-border);
  border-radius: var(--faceoff-radius-xl);
  box-shadow:
    0 0 54px var(--season-glow-soft),
    inset 0 1px 0 rgba(255,255,255,0.16);
}

.faceoff-neon-border {
  position: relative;
}

.faceoff-neon-border::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, var(--season-primary), transparent 35%, var(--season-secondary));
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.faceoff-button-primary {
  background: linear-gradient(135deg, var(--season-primary), #2F6BFF);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: var(--faceoff-radius-md);
  box-shadow: 0 0 28px var(--season-glow-soft);
  color: white;
  transition: transform var(--faceoff-transition), box-shadow var(--faceoff-transition), filter var(--faceoff-transition);
}

.faceoff-button-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
  box-shadow: 0 0 38px var(--season-glow);
}

.faceoff-button-secondary {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--season-border);
  border-radius: var(--faceoff-radius-md);
  color: var(--season-text);
}

.faceoff-input {
  background: rgba(0,0,0,0.28);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: var(--faceoff-radius-sm);
  color: var(--season-text);
  outline: none;
}

.faceoff-input:focus {
  border-color: var(--season-primary);
  box-shadow: 0 0 0 3px var(--season-glow-soft);
}

.faceoff-scoreboard {
  background:
    linear-gradient(180deg, rgba(255,255,255,0.08), transparent 16%),
    var(--season-panel-strong);
  border: 1px solid var(--season-border);
  border-radius: 1.75rem;
  box-shadow:
    0 0 60px var(--season-glow-soft),
    inset 0 1px 0 rgba(255,255,255,0.16),
    inset 0 -20px 45px rgba(0,0,0,0.26);
}

.faceoff-scoreboard-topline {
  background: linear-gradient(90deg, transparent, var(--season-primary), transparent);
  box-shadow: 0 0 24px var(--season-glow);
}

.faceoff-metric-card {
  background: rgba(0,0,0,0.28);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--faceoff-radius-md);
}

.faceoff-metric-card:hover {
  border-color: var(--season-border);
  box-shadow: 0 0 24px var(--season-glow-soft);
}

.faceoff-progress-track {
  background: rgba(255,255,255,0.12);
  border-radius: 999px;
  overflow: hidden;
}

.faceoff-progress-fill {
  background: linear-gradient(90deg, var(--season-primary), var(--season-secondary));
  box-shadow: 0 0 18px var(--season-glow);
}

.faceoff-badge {
  background:
    radial-gradient(circle at 50% 20%, var(--season-glow-soft), transparent 50%),
    rgba(0,0,0,0.3);
  border: 1px solid var(--season-border);
  border-radius: 1.25rem;
}

.faceoff-toast-success { border-color: rgba(99,255,145,0.4); box-shadow: 0 0 26px rgba(99,255,145,0.18); }
.faceoff-toast-info { border-color: var(--season-border); box-shadow: 0 0 26px var(--season-glow-soft); }
.faceoff-toast-warning { border-color: rgba(255,200,87,0.45); box-shadow: 0 0 26px rgba(255,200,87,0.18); }
.faceoff-toast-error { border-color: rgba(255,77,77,0.45); box-shadow: 0 0 26px rgba(255,77,77,0.18); }

.faceoff-aurora-motion {
  animation: auroraDrift 12s ease-in-out infinite alternate;
}

.faceoff-snow-motion {
  animation: snowDrift 18s linear infinite;
}

.faceoff-pulse-glow {
  animation: pulseGlow 2.4s ease-in-out infinite;
}

@keyframes auroraDrift {
  from { transform: translate3d(-1.5%, -0.5%, 0) scale(1.02); opacity: 0.52; }
  to { transform: translate3d(1.5%, 0.5%, 0) scale(1.06); opacity: 0.82; }
}

@keyframes snowDrift {
  from { transform: translate3d(0, -4%, 0); }
  to { transform: translate3d(2%, 4%, 0); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 22px var(--season-glow-soft); }
  50% { box-shadow: 0 0 44px var(--season-glow); }
}

@media (max-width: 768px) {
  .faceoff-glass,
  .faceoff-glass-strong,
  .faceoff-scoreboard {
    border-radius: var(--faceoff-radius-md);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}
`;

function SeasonalStyleTag() {
  return <style>{seasonalCss}</style>;
}

const sampleStats = {
  divisionPoints: 12450,
  teamRank: "3rd",
  users: 342,
  prompts: 8721,
  aiHours: 1256,
  xpEarned: 24680,
  week: 15,
  seasonWeeks: 24,
};

const leaders = [
  { name: "Jordan M.", role: "AI Explorer", points: 125680, place: 1 },
  { name: "Taylor R.", role: "Prompt Master", points: 98430, place: 2 },
  { name: "Casey L.", role: "Collaborator", points: 76210, place: 3 },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-CA").format(value);
}

function GlassPanel({ children, className = "", theme = themes.winter }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/15 bg-slate-950/45 backdrop-blur-xl",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.12)]",
        className
      )}
      style={{ boxShadow: `0 0 40px ${theme.accentSoft}, inset 0 1px 0 rgba(255,255,255,.12)` }}
    >
      {children}
    </div>
  );
}

function FaceoffButton({ children, variant = "primary", theme = themes.winter }) {
  const variants = {
    primary: "text-white border-white/20",
    secondary: "text-cyan-100 border-cyan-300/25 bg-slate-950/30",
    ghost: "text-slate-200 border-white/10 bg-white/5",
  };

  return (
    <button
      className={cx(
        "inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition",
        "hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0",
        variants[variant]
      )}
      style={variant === "primary" ? { background: `linear-gradient(135deg, ${theme.accent}, #2F6BFF)` } : undefined}
    >
      {children}
    </button>
  );
}

function MetricCard({ icon: Icon, label, value, theme = themes.winter }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-300">
        <Icon size={16} style={{ color: theme.accent }} />
        {label}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function Scoreboard({ theme = themes.winter, stats = sampleStats }) {
  const progress = Math.round((stats.week / stats.seasonWeeks) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-5xl"
    >
      <GlassPanel theme={theme} className="overflow-hidden p-5 md:p-7">
        <div className="absolute inset-x-0 top-0 h-1" style={{ background: theme.accent }} />

        <div className="grid grid-cols-3 items-center gap-4">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-left">
            <div className="text-xs uppercase text-slate-300">Division Points</div>
            <div className="text-2xl font-black text-white md:text-3xl">{formatNumber(stats.divisionPoints)}</div>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Trophy size={42} style={{ color: theme.accent }} />
            </div>
            <div className="text-2xl font-black uppercase tracking-wide text-white md:text-4xl">FVSD Faceoff</div>
            <div className="text-xs uppercase tracking-[0.25em] text-slate-300">Copilot Adoption League</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-right">
            <div className="text-xs uppercase text-slate-300">Team Rank</div>
            <div className="text-2xl font-black text-white md:text-3xl">{stats.teamRank}</div>
          </div>
        </div>

        <div className="my-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-300">Total Copilot Points</div>
          <div className="text-6xl font-black text-white md:text-7xl">{formatNumber(stats.divisionPoints)}</div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <MetricCard theme={theme} icon={Users} label="Users" value={formatNumber(stats.users)} />
          <MetricCard theme={theme} icon={MessageSquareText} label="Prompts" value={formatNumber(stats.prompts)} />
          <MetricCard theme={theme} icon={Clock3} label="AI Hours" value={formatNumber(stats.aiHours)} />
          <MetricCard theme={theme} icon={Star} label="XP Earned" value={formatNumber(stats.xpEarned)} />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs uppercase tracking-wide text-slate-300">
            <span>Week {stats.week} of {stats.seasonWeeks}</span>
            <span>Regular Season</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: theme.accent }} />
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function AchievementBadge({ icon: Icon = Zap, title, subtitle, theme = themes.winter }) {
  return (
    <GlassPanel theme={theme} className="p-4 text-center">
      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
        <Icon size={32} style={{ color: theme.accent }} />
      </div>
      <div className="font-bold text-white">{title}</div>
      <div className="text-xs text-slate-300">{subtitle}</div>
    </GlassPanel>
  );
}

function Leaderboard({ theme = themes.winter }) {
  return (
    <GlassPanel theme={theme} className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Top Performers</h3>
        <button className="text-sm" style={{ color: theme.accent }}>View All</button>
      </div>
      <div className="space-y-3">
        {leaders.map((leader) => (
          <div key={leader.place} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full font-black text-white" style={{ background: theme.accentSoft }}>
              {leader.place}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-white">{leader.name}</div>
              <div className="text-xs text-slate-300">{leader.role}</div>
            </div>
            <div className="font-bold text-white">{formatNumber(leader.points)}</div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

function AppShell({ season = "winter" }) {
  const theme = themes[season];

  return (
    <main className={cx("min-h-screen overflow-hidden bg-gradient-to-br p-6 text-white", theme.bg)}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${theme.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#071940]/70 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <nav className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10">
              <ShieldCheck style={{ color: theme.accent }} />
            </div>
            <div>
              <div className="text-xl font-black uppercase tracking-wide">FVSD Faceoff</div>
              <div className="text-xs text-slate-300">Competing Together for the Future of AI in Education</div>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
            <span>Dashboard</span>
            <span>Leaderboard</span>
            <span>Challenges</span>
            <span>Achievements</span>
          </div>
        </nav>

        <section className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm" style={{ color: theme.accent }}>
              {theme.name} Season
            </div>
            <h1 className="mb-5 text-5xl font-black leading-tight md:text-7xl">
              Every Prompt. Every Point. Every Impact.
            </h1>
            <p className="mb-8 max-w-xl text-lg text-slate-200">
              Track Copilot adoption across the division through team challenges, achievements, XP, and seasonal league play.
            </p>
            <div className="flex flex-wrap gap-3">
              <FaceoffButton theme={theme}>View Dashboard <ChevronRight size={18} /></FaceoffButton>
              <FaceoffButton theme={theme} variant="secondary">See Leaderboard</FaceoffButton>
            </div>
          </div>

          <Scoreboard theme={theme} />
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr_1.2fr]">
          <AchievementBadge theme={theme} title="Prompt Master" subtitle="100 high-quality prompts" icon={MessageSquareText} />
          <AchievementBadge theme={theme} title="Data Defender" subtitle="Secure, responsible AI use" icon={ShieldCheck} />
          <Leaderboard theme={theme} />
        </section>
      </div>
    </main>
  );
}

export default function FVSDComponentLibraryPreview() {
  return <AppShell season="winter" />;
}
