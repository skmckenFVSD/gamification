import React from "react";
import { UserCircle2 } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function Profile() {
  return (
    <PagePlaceholder
      kicker="You"
      title="Your Profile"
      description="Personal stats, badge wall, season-over-season trend. Pulls from the same telemetry feed as the Department standings."
      icon={UserCircle2}
    />
  );
}
