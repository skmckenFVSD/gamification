import React from "react";

const defaultRows = [
  { place: 1, name: "Team North Star", descriptor: "Collaboration pace", points: "12,450" },
  { place: 2, name: "River Runners", descriptor: "Prompt quality", points: "11,980" },
  { place: 3, name: "Prairie Pilots", descriptor: "Weekly momentum", points: "10,735" },
];

export default function Leaderboard({ title = "League Pulse", rows = defaultRows }) {
  return (
    <section className="faceoff-glass faceoff-panel" aria-labelledby="leaderboard-heading">
      <div className="faceoff-panel__header">
        <p className="faceoff-kicker">Placeholder</p>
        <h2 id="leaderboard-heading">{title}</h2>
      </div>
      <ol className="faceoff-leaderboard">
        {rows.map((row) => (
          <li className="faceoff-leaderboard__row" key={row.place}>
            <span className="faceoff-leaderboard__place">{row.place}</span>
            <span className="faceoff-leaderboard__team">
              <strong>{row.name}</strong>
              <small>{row.descriptor}</small>
            </span>
            <span className="faceoff-leaderboard__points">{row.points}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
