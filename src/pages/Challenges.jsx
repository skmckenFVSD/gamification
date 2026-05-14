import React from "react";
import { Target } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function Challenges() {
  return (
    <PagePlaceholder
      kicker="Wave 2"
      title="Challenges"
      description="Monthly Game challenges, set per Department. The first cycle drops at the start of the next Game, currently scoped against prompts + AI Hours."
      icon={Target}
    />
  );
}
