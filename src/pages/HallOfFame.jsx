import React from "react";
import { Star } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function HallOfFame() {
  return (
    <PagePlaceholder
      kicker="Recognition"
      title="Hall of Fame"
      description="A premium recognition space for seasonal MVPs, challenge winners, and notable Copilot adoption stories. Real winners and values will be DOM-rendered later."
      icon={Star}
    >
      <div className="faceoff-layout-grid faceoff-layout-grid--three">
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Season MVP</p>
          <h2>Featured Honouree</h2>
          <p>Hero recognition panel with name, team, and achievement summary placeholder.</p>
        </section>
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Teams</p>
          <h2>Championship Wall</h2>
          <p>Season winners and department-level awards will be listed here.</p>
        </section>
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Stories</p>
          <h2>Impact Highlights</h2>
          <p>Selected Copilot adoption stories and educator wins will live in this zone.</p>
        </section>
      </div>
    </PagePlaceholder>
  );
}
