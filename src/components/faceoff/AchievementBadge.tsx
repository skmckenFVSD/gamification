import React from "react";
import { Award } from "lucide-react";

export default function AchievementBadge({
  icon: Icon = Award,
  title,
  description,
  status = "Preview",
}) {
  return (
    <article className="faceoff-badge">
      <div className="faceoff-badge__icon" aria-hidden="true">
        <Icon size={28} />
      </div>
      <div>
        <p className="faceoff-badge__status">{status}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
