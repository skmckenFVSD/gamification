import React from "react";
import { Award, BellRing, CheckCircle2, Goal, ShieldCheck, Sparkles } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const badgeCards = [
  {
    name: "Prompt Master",
    category: "Core Badge",
    status: "Unlocked",
    icon: assetPath("assets/fvsd-faceoff/badges/badges/badge_prompt_master.png"),
  },
  {
    name: "Classroom Champion",
    category: "Core Badge",
    status: "Unlocked",
    icon: assetPath("assets/fvsd-faceoff/badges/badges/badge_classroom_champion.png"),
  },
  {
    name: "AI Explorer",
    category: "Core Badge",
    status: "In Progress",
    icon: assetPath("assets/fvsd-faceoff/badges/badges/badge_ai_explorer.png"),
  },
  {
    name: "Winter Challenge",
    category: "Season Event",
    status: "Unlocked",
    icon: assetPath("assets/fvsd-faceoff/badges/events/event_badge_winter_challenge.png"),
  },
  {
    name: "Spring Challenge",
    category: "Season Event",
    status: "In Progress",
    icon: assetPath("assets/fvsd-faceoff/badges/events/event_badge_spring_challenge.png"),
  },
  {
    name: "Impact Leader",
    category: "Achievement Card",
    status: "Locked",
    icon: assetPath("assets/fvsd-faceoff/badges/achievements/achievement_card_impact_leader.png"),
  },
];

const recentSubmissions = [
  {
    title: "Newsletter rewrite with Copilot",
    category: "Communication",
    submittedBy: "A. McKenzie",
    submittedAt: "Today, 10:42",
    status: "Pending Verification",
  },
  {
    title: "IEP prep summary prompts",
    category: "Student Services",
    submittedBy: "R. Thomas",
    submittedAt: "Yesterday, 3:18",
    status: "Verified",
  },
  {
    title: "Division budget pivot analysis",
    category: "Data Insights",
    submittedBy: "S. Patel",
    submittedAt: "Yesterday, 11:06",
    status: "Verified",
  },
];

const notifications = [
  "Your win \"IEP prep summary prompts\" was verified (+8 team points).",
  "Superintendents scored 1 goal from verified wins this week.",
  "Prompt Master tier progress updated: 4 of 5 wins complete.",
  "Winter Challenge badge is now available for claim.",
];

export default function Achievements() {
  return (
    <PagePlaceholder
      kicker="Recognition Hub"
      title="Achievements"
      description="Track earned badges, submission activity, verification updates, and how achievements convert into team game goals."
      icon={Award}
    >
      <div className="faceoff-achievements-layout">
        <section className="faceoff-achievements-main">
          <article className="faceoff-achievements-card">
            <div className="faceoff-achievements-card__title">
              <Sparkles size={16} aria-hidden="true" />
              <h3>Badge Collection</h3>
            </div>
            <div className="faceoff-badge-grid">
              {badgeCards.map((badge) => (
                <article
                  key={badge.name}
                  className={`faceoff-badge-tile faceoff-badge-tile--${badge.status.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <img src={badge.icon} alt={badge.name} loading="lazy" />
                  <div>
                    <h4>{badge.name}</h4>
                    <p>{badge.category}</p>
                  </div>
                  <span>{badge.status}</span>
                </article>
              ))}
            </div>
          </article>

          <article className="faceoff-achievements-card">
            <div className="faceoff-achievements-card__title">
              <ShieldCheck size={16} aria-hidden="true" />
              <h3>Recent Submissions</h3>
            </div>
            <ul className="faceoff-achievements-list">
              {recentSubmissions.map((item) => (
                <li key={`${item.title}-${item.submittedAt}`}>
                  <div>
                    <strong>{item.title}</strong>
                    <small>
                      {item.category} • {item.submittedBy} • {item.submittedAt}
                    </small>
                  </div>
                  <span className={`faceoff-status-chip faceoff-status-chip--${item.status === "Verified" ? "verified" : "pending"}`}>
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <aside className="faceoff-achievements-side">
          <article className="faceoff-achievements-card">
            <div className="faceoff-achievements-card__title">
              <BellRing size={16} aria-hidden="true" />
              <h3>Notifications</h3>
            </div>
            <ul className="faceoff-notification-list">
              {notifications.map((note) => (
                <li key={note}>
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="faceoff-achievements-card">
            <div className="faceoff-achievements-card__title">
              <Goal size={16} aria-hidden="true" />
              <h3>Team Goal Tracker</h3>
            </div>
            <div className="faceoff-goal-grid">
              <div>
                <span>Superintendents</span>
                <strong>3 Goals</strong>
              </div>
              <div>
                <span>School Leaders</span>
                <strong>2 Goals</strong>
              </div>
              <div>
                <span>Teachers</span>
                <strong>5 Goals</strong>
              </div>
              <div>
                <span>Division Services</span>
                <strong>1 Goal</strong>
              </div>
            </div>
            <div className="faceoff-goal-meter" aria-label="Teachers 5 of 8 goal target">
              <span style={{ width: "62.5%" }} />
            </div>
          </article>
        </aside>
      </div>
    </PagePlaceholder>
  );
}
