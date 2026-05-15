import React from "react";

type ConnectedUser = {
  fullName: string;
  email: string;
  department: string;
  jobTitle: string;
  profileImageUrl: string;
};

type PlayerIdentityCardProps = {
  user: ConnectedUser;
  akaName: string | null;
  teamName: string | null;
  traits: string[];
  isLocked: boolean;
};

export default function PlayerIdentityCard({ user, akaName, teamName, traits, isLocked }: PlayerIdentityCardProps) {
  return (
    <article className="profile-card faceoff-glass faceoff-neon-border" aria-label="Player identity card">
      <div className="profile-card__badge-row">
        <span className="profile-chip">Connected Account</span>
        <span className={`profile-chip ${isLocked ? "profile-chip--locked" : ""}`}>
          {isLocked ? "Identity Locked" : "Draft Identity"}
        </span>
      </div>

      <div className="profile-card__header">
        <img src={user.profileImageUrl} alt={`${user.fullName} profile`} className="profile-card__avatar" loading="lazy" />
        <div>
          <h2>{user.fullName}</h2>
          <p>{user.jobTitle}</p>
        </div>
      </div>

      <div className="profile-card__aka">
        <span>AKA NAME</span>
        <strong>{akaName || "Generate your hockey identity"}</strong>
      </div>

      <dl className="profile-card__meta">
        <div>
          <dt>Favourite Team</dt>
          <dd>{teamName || "Not selected"}</dd>
        </div>
        <div>
          <dt>Traits</dt>
          <dd>{traits.length ? traits.join(" • ") : "No traits selected"}</dd>
        </div>
      </dl>
    </article>
  );
}
