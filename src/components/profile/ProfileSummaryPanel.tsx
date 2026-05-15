import React from "react";

type ProfileSummaryPanelProps = {
  selectedTeamName: string | null;
  traitCount: number;
  akaName: string | null;
  isLocked: boolean;
};

export default function ProfileSummaryPanel({
  selectedTeamName,
  traitCount,
  akaName,
  isLocked,
}: ProfileSummaryPanelProps) {
  return (
    <aside className="profile-summary faceoff-glass" aria-label="Profile status panel">
      <h3>Player Status</h3>
      <ul>
        <li>
          <span>Favourite Team</span>
          <strong>{selectedTeamName ?? "Not selected"}</strong>
        </li>
        <li>
          <span>Traits Equipped</span>
          <strong>{traitCount} / 5</strong>
        </li>
        <li>
          <span>AKA Identity</span>
          <strong>{akaName ?? "Not generated"}</strong>
        </li>
        <li>
          <span>Lock State</span>
          <strong>{isLocked ? "Locked" : "Draft"}</strong>
        </li>
      </ul>

      <div className="profile-summary__metrics">
        <article>
          <small>Featured Games</small>
          <strong>Pending</strong>
        </article>
        <article>
          <small>Roster Slot</small>
          <strong>Ready</strong>
        </article>
        <article>
          <small>Arcade Alias</small>
          <strong>{akaName ? "Synced" : "Missing"}</strong>
        </article>
      </div>
    </aside>
  );
}
