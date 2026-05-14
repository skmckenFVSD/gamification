import React from "react";
import { CalendarRange, Flag, ListChecks, ShieldCheck, UsersRound } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

const managerZones = [
  {
    title: "Monthly Game Setup",
    label: "Create",
    icon: CalendarRange,
    text: "Reserve space for season, month, start date, end date, and game title controls.",
  },
  {
    title: "Team Selection",
    label: "Teams",
    icon: UsersRound,
    text: "Placeholder zone for selecting participating Teams and roster visibility.",
  },
  {
    title: "Featured Game",
    label: "Spotlight",
    icon: Flag,
    text: "Layout slot for assigning the matchup shown on the Dashboard scoreboard.",
  },
  {
    title: "Submission Review",
    label: "Review",
    icon: ListChecks,
    text: "Future queue for reviewing submitted wins before standings are updated.",
  },
];

export default function GameManager() {
  return (
    <PagePlaceholder
      kicker="Management Mode"
      title="Game Manager"
      description="Admin shell only. This mode reserves the panels needed to create monthly games, manage rosters, set featured games, and review submissions later."
      icon={ShieldCheck}
    >
      <section className="faceoff-manager-layout" aria-label="Game Manager layout zones">
        {managerZones.map(({ title, label, icon: Icon, text }) => (
          <article className="faceoff-manager-card" key={title}>
            <div className="faceoff-manager-card__icon" aria-hidden="true">
              <Icon size={22} />
            </div>
            <div>
              <p className="faceoff-kicker">{label}</p>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>
    </PagePlaceholder>
  );
}
