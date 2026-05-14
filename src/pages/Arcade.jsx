import React from "react";
import { Gamepad2 } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function Arcade() {
  return (
    <PagePlaceholder
      kicker="Future Feature"
      title="Beat the Goalie"
      description="Copilot takes the shot, work items become puck objects, and successful shots represent clearing work with Copilot. Gameplay remains parked until the shell is stable."
      icon={Gamepad2}
    >
      <div className="faceoff-layout-grid faceoff-layout-grid--two">
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Concept</p>
          <h2>Game Canvas</h2>
          <p>Player controls, shot timing, goalie response, and feedback animation will land here later.</p>
        </section>
        <section className="faceoff-zone">
          <p className="faceoff-kicker">Reserved</p>
          <h2>Event Rules</h2>
          <p>Attempt limits, seasonal event settings, and rewards remain placeholder-only for this milestone.</p>
        </section>
      </div>
    </PagePlaceholder>
  );
}
