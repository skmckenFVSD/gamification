import React from "react";
import { BarChart3 } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function Standings() {
  return (
    <PagePlaceholder
      kicker="Wave 2"
      title="Department Standings"
      description="Live Department rankings, normalised by headcount. Coming in Wave 2 — currently parked behind the scoring sign-off."
      icon={BarChart3}
    />
  );
}
