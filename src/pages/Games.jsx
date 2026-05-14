import React from "react";
import { CalendarDays } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function Games() {
  return (
    <PagePlaceholder
      kicker="Season Schedule"
      title="Games"
      description="Monthly faceoffs will live here once the league calendar is active. For this shell milestone, this page reserves the schedule, featured game, and game preview layout zones."
      icon={CalendarDays}
    >
      <div className="faceoff-layout-grid faceoff-layout-grid--three">
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Featured</p>
          <h2>Current Monthly Game</h2>
          <p>Featured matchup, dates, and season context placeholder.</p>
        </section>
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Upcoming</p>
          <h2>Next Games</h2>
          <p>Future monthly games and preview cards will render here.</p>
        </section>
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Archive</p>
          <h2>Completed Games</h2>
          <p>Closed games and standings snapshots will be listed later.</p>
        </section>
      </div>
    </PagePlaceholder>
  );
}
