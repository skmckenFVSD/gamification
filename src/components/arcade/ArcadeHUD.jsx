import React from "react";

function formatTime(seconds) {
  const safe = Math.max(0, Math.ceil(seconds));
  const mins = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const secs = (safe % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function ArcadeHUD({ hud }) {
  const comboLabel = hud.combo > 1 ? `x${hud.combo}` : "x1";
  const accuracy = Number.isFinite(hud.accuracy) ? `${hud.accuracy}%` : "0%";

  return (
    <>
      <div className="arcade-hud arcade-hud--top" aria-label="Arcade game status">
        <div className="arcade-hud-chip">
          <span>Score</span>
          <strong>{hud.score.toLocaleString()}</strong>
        </div>
        <div className="arcade-hud-chip">
          <span>Shots Left</span>
          <strong>{hud.shotsRemaining}</strong>
        </div>
        <div className="arcade-hud-chip">
          <span>Combo</span>
          <strong>{comboLabel}</strong>
        </div>
        <div className="arcade-hud-chip">
          <span>Timer</span>
          <strong>{formatTime(hud.timeRemaining)}</strong>
        </div>
      </div>

      <div className="arcade-hud arcade-hud--bottom" aria-label="Shot controls">
        <div className="arcade-power-meter">
          <span>Slapshot Power</span>
          <div className="arcade-power-meter__bar">
            <i style={{ width: `${Math.round(hud.charge * 100)}%` }} />
          </div>
        </div>
        <div className="arcade-shot-indicator">
          <span>Aim</span>
          <strong>{hud.aimLabel}</strong>
          <small>Accuracy {accuracy}</small>
        </div>
      </div>
    </>
  );
}
