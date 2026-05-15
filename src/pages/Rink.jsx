import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  CircleGauge,
  MessageSquareText,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Scoreboard from "../components/faceoff/Scoreboard.tsx";
import MetricCard from "../components/faceoff/MetricCard.tsx";
import Leaderboard from "../components/faceoff/Leaderboard.tsx";
import SeasonalAtmosphere from "../components/faceoff/SeasonalAtmosphere.tsx";
import { useSeason } from "../context/SeasonContext.jsx";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function Rink() {
  const { theme, season } = useSeason();

  return (
    <div className="faceoff-dashboard">
      <section className="faceoff-hero-stage">
        <div className="faceoff-dashboard-hero__copy">
          <div className="faceoff-season-chip" style={{ color: theme.colors.primary }}>
            {theme.name} Season
          </div>
          <h1>
            Every Prompt.<br />
            Every Point.<br />
            Every Impact.
          </h1>
          <p>
            Track. Compete. Collaborate. FVSD Faceoff turns Microsoft 365 Copilot
            adoption into a visible hockey season for the whole Division.
          </p>
          <div className="faceoff-dashboard-actions">
            <Link className="faceoff-button-primary" to="/games">
              <CircleGauge size={18} /> View Games
            </Link>
            <Link className="faceoff-button-secondary" to="/games">
              <PlayCircle size={18} /> How It Works
            </Link>
          </div>
        </div>

        <div className="faceoff-hero-visual-scene" aria-label="FVSD Faceoff rink scene">
          <SeasonalAtmosphere season={season} />
          <div className="faceoff-hero-scoreboard">
            <Scoreboard theme={theme} />
          </div>
          <img
            className="faceoff-hero-player faceoff-hero-player--left"
            src={assetPath("assets/fvsd-faceoff/characters/skater-white.png")}
            alt=""
            aria-hidden="true"
          />
          <img
            className="faceoff-hero-player faceoff-hero-player--right"
            src={assetPath("assets/fvsd-faceoff/characters/skater-cyan.png")}
            alt=""
            aria-hidden="true"
          />
          <div className="faceoff-hero-ice-reflection" aria-hidden="true" />
        </div>
      </section>

      <section className="faceoff-dashboard-strip" aria-label="Dashboard preview">
        <div className="faceoff-dashboard-panel">
          <article className="faceoff-progress-card">
            <div className="faceoff-progress-ring" aria-label="Level 12, 2450 of 3000 XP">
              <Star size={25} aria-hidden="true" />
              <span>Level</span>
              <strong>12</strong>
              <small>2,450 / 3,000 XP</small>
            </div>
            <div className="faceoff-progress-stat">
              <span>Points This Month</span>
              <strong>2,450</strong>
            </div>
            <div className="faceoff-progress-stat">
              <span>Rank</span>
              <strong>2</strong>
            </div>
          </article>

          <div className="faceoff-impact-panel">
            <div className="faceoff-panel__header">
              <p className="faceoff-kicker">Division Impact</p>
              <h2>Copilot Adoption Pulse</h2>
            </div>
            <div className="faceoff-impact-grid">
              <MetricCard icon={Users} label="Total Users" value="342" detail="+18%" />
              <MetricCard icon={Zap} label="Total Actions" value="12,458" detail="Preview" />
              <MetricCard icon={Sparkles} label="Avg. Actions / User" value="50.8" detail="+15%" />
              <MetricCard icon={Trophy} label="Points Earned" value="78,900" detail="DOM rendered" />
            </div>
            <section className="faceoff-activity-feed" aria-labelledby="activity-feed-heading">
              <div className="faceoff-activity-feed__header">
                <h3 id="activity-feed-heading">Activity Feed</h3>
                <Link to="/leaderboard">
                  View All <ChevronRight size={14} />
                </Link>
              </div>
              <ul>
                <li>
                  <MessageSquareText size={17} /> Prompt Master badge preview <span>2h ago</span>
                </li>
                <li>
                  <ShieldCheck size={17} /> Responsible AI challenge completed <span>4h ago</span>
                </li>
                <li>
                  <Sparkles size={17} /> Classroom Champion milestone reached <span>6h ago</span>
                </li>
              </ul>
            </section>
          </div>

          <Leaderboard title="Top Performers" />
        </div>

        <section className="faceoff-challenge-strip" aria-label="Challenge of the month">
          <Trophy size={44} aria-hidden="true" />
          <div>
            <p className="faceoff-kicker">Challenge of the Month</p>
            <h2>Copilot Innovator</h2>
            <p>Discover new ways to use Copilot in your daily work.</p>
          </div>
          <div className="faceoff-challenge-progress" aria-label="75 percent complete">
            <span />
          </div>
          <strong>75%</strong>
          <Link className="faceoff-button-primary" to="/challenges">
            View Challenge <ChevronRight size={18} />
          </Link>
        </section>
      </section>
    </div>
  );
}
