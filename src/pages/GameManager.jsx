import React from "react";
import { CalendarRange } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function GameManager() {
  return (
    <PagePlaceholder
      kicker="Admin"
      title="Game Manager"
      description="Schedule the monthly Games inside a Season. Set start and end dates, lock rosters, and trigger the Game close-out that mints the standings snapshot."
      icon={CalendarRange}
    />
  );
}
