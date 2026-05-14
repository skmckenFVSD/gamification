import React from "react";
import { motion } from "framer-motion";

const defaultGame = {
  title: "Featured Game",
  homeTeam: "FVSD Innovators",
  awayTeam: "Copilot Champions",
  homeScore: 3,
  awayScore: 2,
  period: "3rd",
  timeRemaining: "08:42",
  homeShots: 28,
  awayShots: 24,
  homePenalties: 1,
  awayPenalties: 2,
};

function TeamPanel({ align = "left", name, score, shots, penalties }) {
  return (
    <div className={`faceoff-team-panel faceoff-team-panel--${align}`}>
      <p className="faceoff-team-panel__name">{name}</p>
      <p className="faceoff-team-panel__score">{score}</p>
      <div className="faceoff-team-panel__stats">
        <span>Shots {shots}</span>
        <span>Penalties {penalties}</span>
      </div>
    </div>
  );
}

export default function Scoreboard({ game = defaultGame }) {
  return (
    <motion.section
      className="faceoff-scoreboard"
      aria-labelledby="featured-game-heading"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="faceoff-scoreboard-topline" />
      <div className="faceoff-scoreboard__header">
        <p className="faceoff-kicker">{game.title}</p>
        <h2 id="featured-game-heading">Copilot Adoption Faceoff</h2>
      </div>
      <div className="faceoff-scoreboard__matchup">
        <TeamPanel
          name={game.awayTeam}
          score={game.awayScore}
          shots={game.awayShots}
          penalties={game.awayPenalties}
        />
        <div className="faceoff-game-clock" aria-label={`${game.period} period, ${game.timeRemaining} remaining`}>
          <span>{game.period}</span>
          <strong>{game.timeRemaining}</strong>
          <small>Remaining</small>
        </div>
        <TeamPanel
          align="right"
          name={game.homeTeam}
          score={game.homeScore}
          shots={game.homeShots}
          penalties={game.homePenalties}
        />
      </div>
    </motion.section>
  );
}
