import React from "react";
import { TrendingUp } from "lucide-react";

export default function MetricCard({
  icon: Icon = TrendingUp,
  label,
  value,
  detail,
}) {
  return (
    <article className="faceoff-metric-card">
      <div className="faceoff-metric-card__icon" aria-hidden="true">
        <Icon size={18} />
      </div>
      <div className="faceoff-metric-card__body">
        <p className="faceoff-metric-card__label">{label}</p>
        <p className="faceoff-metric-card__value">{value}</p>
        {detail ? <p className="faceoff-metric-card__detail">{detail}</p> : null}
      </div>
    </article>
  );
}
