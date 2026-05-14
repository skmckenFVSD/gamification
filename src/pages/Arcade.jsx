import React from "react";
import { Gamepad2 } from "lucide-react";
import ArcadeGame from "../components/arcade/ArcadeGame.jsx";
import "../styles/arcade.css";

export default function Arcade() {
  return (
    <section className="faceoff-slot arcade-page-shell">
      <div className="arcade-page-head arcade-panel">
        <div>
          <p className="faceoff-kicker">Arcade Mode</p>
          <h1>Beat the Goalie</h1>
          <p>
            A premium hockey skills challenge where work-item pucks become Copilot impact goals.
            Shoot past a reactive goalie, build assist streaks, and push your score before time runs out.
          </p>
        </div>
        <div className="arcade-page-head__icon" aria-hidden="true">
          <Gamepad2 size={26} />
        </div>
      </div>

      <div className="arcade-page">
        <div className="arcade-page__intro">
          <section className="arcade-panel">
            <p className="faceoff-kicker">Challenge Loop</p>
            <h2>Playable Prototype</h2>
            <p>
              Move laterally, charge a slapshot, aim your lane, and release toward the net.
              Goalie reactions escalate through the round, while combo streaks reward consistency.
            </p>
          </section>
          <section className="arcade-panel">
            <p className="faceoff-kicker">Copilot Metaphor</p>
            <h3>Productivity Signals</h3>
            <ul className="arcade-meta-list">
              <li>Goals represent work cleared with Copilot support.</li>
              <li>Assist streaks highlight sustained quality output.</li>
              <li>Shot lanes and accuracy emulate decision precision.</li>
            </ul>
          </section>
        </div>

        <ArcadeGame />

        <section className="arcade-panel">
          <p className="faceoff-kicker">Prototype Scope</p>
          <h3>V1 Gameplay Systems</h3>
          <ul className="arcade-meta-list">
            <li>Player movement, aiming, shot charging, and release.</li>
            <li>Puck flight with speed variance and curve influence.</li>
            <li>Reactive goalie AI with gradual difficulty scaling.</li>
            <li>Score, timer, combo, streak, and accuracy tracking.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
