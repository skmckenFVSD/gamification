import React from "react";
import { Trophy } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";
import LeaderboardPanel from "../components/faceoff/Leaderboard.tsx";

export default function Leaderboard() {
  return (
    <PagePlaceholder
      kicker="League Table"
      title="Leaderboard"
      description="Team and player rankings remain placeholder-only in this milestone. The layout is ready for DOM-rendered standings when scoring is approved."
      icon={Trophy}
    >
      <div className="faceoff-layout-grid faceoff-layout-grid--two">
        <LeaderboardPanel title="Team Standings Preview" />
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Filters</p>
          <h2>Season and Team Controls</h2>
          <p>Season, month, department, and metric selectors will sit here.</p>
        </section>
      </div>
    </PagePlaceholder>
  );
}
