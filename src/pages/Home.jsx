import { Link } from 'react-router-dom'
import Rink from '../components/Rink.jsx'
import { useApp } from '../context/AppContext.jsx'

function daysLeft(endDate) {
  const ms = new Date(endDate).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

export default function Home() {
  const { activeGame, gameWins, players, departments, teamA, teamB } = useApp()
  const playerById = Object.fromEntries(players.map((p) => [p.id, p]))
  const deptById = Object.fromEntries(departments.map((d) => [d.id, d]))
  const yesterday = [...gameWins]
    .filter((w) => w.verified)
    .sort((a, b) => (b.minutesSaved || 0) - (a.minutesSaved || 0))[0]

  return (
    <div className="home">
      <section className="matchup-hero">
        <h1>{activeGame.name}</h1>
        <p className="prize">🏆 {activeGame.prizeNote}</p>
        <p className="countdown">{daysLeft(activeGame.endDate)} days remaining</p>
      </section>

      <Rink />

      <section className="callouts">
        <div className="callout">
          <h3>Top win so far</h3>
          {yesterday ? (
            <p>
              <strong>{playerById[yesterday.playerId]?.name}</strong> ({deptById[playerById[yesterday.playerId]?.departmentId]?.name})
              <br />
              <em>"{yesterday.summary}"</em> — {yesterday.minutesSaved} min saved
            </p>
          ) : (
            <p>No verified wins yet. <Link to="/submit">Be the first.</Link></p>
          )}
        </div>

        <div className="callout">
          <h3>Live standings</h3>
          <table>
            <thead><tr><th>Team</th><th>Goals</th><th>Shots</th><th>Hours saved</th></tr></thead>
            <tbody>
              <tr><td>{activeGame.teamA.name}</td><td>{teamA.goals}</td><td>{teamA.shotsOnGoal}</td><td>{Math.round(teamA.totalMinutesSaved/60)}</td></tr>
              <tr><td>{activeGame.teamB.name}</td><td>{teamB.goals}</td><td>{teamB.shotsOnGoal}</td><td>{Math.round(teamB.totalMinutesSaved/60)}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="cta-row">
        <Link to="/submit" className="btn primary">Log a Copilot win →</Link>
      </div>
    </div>
  )
}
