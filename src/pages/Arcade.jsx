import React from "react";
import { Gamepad2 } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";
import { GlassPanel } from "../components/FaceoffPreview.jsx";
import { useSeason } from "../context/SeasonContext.jsx";

export default function Arcade() {
  const { theme } = useSeason();

  return (
    <PagePlaceholder
      kicker="Concept"
      title="Beat the Goalie"
      description="Replacing the old PacMan stub. Copilot takes the shot, the puck is an email, the goalie is the worker who hasn't tried it yet. Score on adoption, miss on inbox-zero theatre."
      icon={Gamepad2}
    >
      <GlassPanel theme={theme} className="p-5">
        <h2 className="mb-3 text-lg font-bold text-white">Rules, first pass</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-slate-200">
          <li>One shot per real Copilot prompt logged that week.</li>
          <li>Goalie reaction time scales with the player's recent AI Hours.</li>
          <li>Rebound goals come from prompts that produced a downstream artifact.</li>
          <li>Hat tricks unlock the Phase 4 achievement card on the Rink.</li>
        </ul>
        <p className="mt-4 text-xs text-slate-300">
          Mechanics draft. Final scoring sits behind the Wave 2 scoring sign-off.
        </p>
      </GlassPanel>
    </PagePlaceholder>
  );
}
