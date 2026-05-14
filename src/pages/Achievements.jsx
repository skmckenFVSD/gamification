import React from "react";
import { Award } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function Achievements() {
  return (
    <PagePlaceholder
      kicker="Wave 2"
      title="Achievements"
      description="Badge tiers, milestones, and event achievements. Phase 4 assets are staged, the surfaces that read them are still on the board."
      icon={Award}
    />
  );
}
