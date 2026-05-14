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
import { themes, getTheme } from "../lib/themes.js";

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

export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-CA").format(value);
}

export function GlassPanel({ children, className = "", theme = themes.winter }) {
  return (
    <div
      className={cx("faceoff-glass", className)}
      style={{
        boxShadow: `0 0 40px ${theme.colors.glowSoft}, inset 0 1px 0 rgba(255,255,255,.12)`,
      }}
    >
      {children}
    </div>
  );
}

export function FaceoffButton({
  children,
  variant = "primary",
  theme = themes.winter,
  onClick,
  type = "button",
}) {
  const isPrimary = variant === "primary";
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition",
        isPrimary ? "faceoff-button-primary" : "faceoff-button-secondary"
      )}
      style={
        isPrimary
          ? { background: `linear-gradient(135deg, ${theme.colors.primary}, #2F6BFF)` }
          : undefined
      }
    >
      {children}
    </button>
  );
}

export function MetricCard({ icon: Icon, label, value, theme = themes.winter }) {
  return (
    <div className="faceoff-metric-card p-4">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-300">
        {Icon ? <Icon size={16} style={{ color: theme.colors.primary }} /> : null}
        {label}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

export function Scoreboard({ theme = themes.winter, stats = sampleStats }) {
  const progress = Math.round((stats.week / stats.seasonWeeks) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-5xl"
    >
      <div className="faceoff-scoreboard relative overflow-hidden p-5 md:p-7">
        <div
          className="faceoff-scoreboard-topline absolute inset-x-0 top-0 h-1"
          style={{ background: theme.colors.primary }}
        />

        <div className="grid grid-cols-3 items-center gap-4">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-left">
            <div className="text-xs uppercase text-slate-300">Division Points</div>
            <div className="text-2xl font-black text-white md:text-3xl">
              {formatNumber(stats.divisionPoints)}
            </div>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Trophy size={42} style={{ color: theme.colors.primary }} />
            </div>
            <div className="text-2xl font-black uppercase tracking-wide text-white md:text-4xl">
              FVSD Faceoff
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-slate-300">
              Copilot Adoption League
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-right">
            <div className="text-xs uppercase text-slate-300">Team Rank</div>
            <div className="text-2xl font-black text-white md:text-3xl">{stats.teamRank}</div>
          </div>
        </div>

        <div className="my-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-300">
            Total Copilot Points
          </div>
          <div className="text-6xl font-black text-white md:text-7xl">
            {formatNumber(stats.divisionPoints)}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <MetricCard theme={theme} icon={Users} label="Users" value={formatNumber(stats.users)} />
          <MetricCard
            theme={theme}
            icon={MessageSquareText}
            label="Prompts"
            value={formatNumber(stats.prompts)}
          />
          <MetricCard
            theme={theme}
            icon={Clock3}
            label="AI Hours"
            value={formatNumber(stats.aiHours)}
          />
          <MetricCard
            theme={theme}
            icon={Star}
            label="XP Earned"
            value={formatNumber(stats.xpEarned)}
          />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs uppercase tracking-wide text-slate-300">
            <span>
              Week {stats.week} of {stats.seasonWeeks}
            </span>
            <span>Regular Season</span>
          </div>
          <div className="faceoff-progress-track h-3">
            <div
              className="faceoff-progress-fill h-full rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AchievementBadge({
  icon: Icon = Zap,
  title,
  subtitle,
  theme = themes.winter,
}) {
  return (
    <GlassPanel theme={theme} className="p-4 text-center">
      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
        <Icon size={32} style={{ color: theme.colors.primary }} />
      </div>
      <div className="font-bold text-white">{title}</div>
      <div className="text-xs text-slate-300">{subtitle}</div>
    </GlassPanel>
  );
}

export function Leaderboard({ theme = themes.winter, rows = leaders }) {
  return (
    <GlassPanel theme={theme} className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Top Performers</h3>
        <button className="text-sm" style={{ color: theme.colors.primary }}>
          View All
        </button>
      </div>
      <div className="space-y-3">
        {rows.map((leader) => (
          <div
            key={leader.place}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full font-black text-white"
              style={{ background: theme.colors.glowSoft }}
            >
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

export { sampleStats, leaders };

function PreviewShell({ season = "winter" }) {
  const theme = getTheme(season);

  return (
    <main className="relative min-h-screen overflow-hidden p-6 text-white">
      <div className="faceoff-season-background" />
      <div
        className="faceoff-season-background-image"
        style={{ backgroundImage: `url(${theme.backgroundImage})` }}
      />
      <div className="faceoff-vignette" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <nav className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10">
              <ShieldCheck style={{ color: theme.colors.primary }} />
            </div>
            <div>
              <div className="text-xl font-black uppercase tracking-wide">FVSD Faceoff</div>
              <div className="text-xs text-slate-300">
                Competing Together for the Future of AI in Education
              </div>
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
            <div
              className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm"
              style={{ color: theme.colors.primary }}
            >
              {theme.name} Season
            </div>
            <h1 className="mb-5 text-5xl font-black leading-tight md:text-7xl">
              Every Prompt. Every Point. Every Impact.
            </h1>
            <p className="mb-8 max-w-xl text-lg text-slate-200">
              Track Copilot adoption across the division through team challenges,
              achievements, XP, and seasonal league play.
            </p>
            <div className="flex flex-wrap gap-3">
              <FaceoffButton theme={theme}>
                View Dashboard <ChevronRight size={18} />
              </FaceoffButton>
              <FaceoffButton theme={theme} variant="secondary">
                See Leaderboard
              </FaceoffButton>
            </div>
          </div>

          <Scoreboard theme={theme} />
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr_1.2fr]">
          <AchievementBadge
            theme={theme}
            title="Prompt Master"
            subtitle="100 high-quality prompts"
            icon={MessageSquareText}
          />
          <AchievementBadge
            theme={theme}
            title="Data Defender"
            subtitle="Secure, responsible AI use"
            icon={ShieldCheck}
          />
          <Leaderboard theme={theme} />
        </section>
      </div>
    </main>
  );
}

export default function FVSDComponentLibraryPreview() {
  return <PreviewShell season="winter" />;
}
