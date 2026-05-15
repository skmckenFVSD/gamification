import React from "react";
import type { HockeyTeam } from "../../data/hockeyTeams";

type FavouriteTeamSelectProps = {
  teams: HockeyTeam[];
  value: string | null;
  onChange: (teamId: string) => void;
  disabled?: boolean;
};

export default function FavouriteTeamSelect({ teams, value, onChange, disabled = false }: FavouriteTeamSelectProps) {
  const nhlTeams = teams.filter((team) => team.league === "NHL");
  const pwhlTeams = teams.filter((team) => team.league === "PWHL");

  return (
    <label className="profile-form-field">
      <span>Favourite Team</span>
      <select
        className="faceoff-input profile-select"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>
          Select your team
        </option>
        <optgroup label="NHL">
          {nhlTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.displayName}
            </option>
          ))}
        </optgroup>
        <optgroup label="PWHL">
          {pwhlTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.displayName}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  );
}
