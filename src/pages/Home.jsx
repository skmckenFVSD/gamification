import { Link } from 'react-router-dom'
import Rink from '../components/Rink.jsx'
import Scoreboard from '../components/Scoreboard.jsx'
import { useApp } from '../context/AppContext.jsx'

function daysLeft(endDate) {
  const ms = new Date(endDate).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

export default function Home() {
  const { activeGame, gameWins, players, departments } = useApp()
  const playerById = Object.fromEntries(players.map((p) => [p.id, p]))
  const deptById = Object.fromEntries(departments.map((d) => [d.id, d]))
  const topWin = [...gameWins]
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

      <Scoreboard />

      <section className="callouts">
        <div className="callout">
          <h3>Top win so far</h3>
          {topWin ? (
            <p>
              <strong>{playerById[topWin.playerId]?.name}</strong> ({deptById[playerById[topWin.playerId]?.departmentId]?.name})
              <br />
              <em>"{topWin.summary}"</em> — {topWin.minutesSaved} min saved
            </p>
          ) : (
            <p>No verified wins yet. <Link to="/submit">Be the first.</Link></p>
          )}
        </div>

        <div className="callout">
          <h3>Quick links</h3>
          <ul className="quick-links">
            <li><Link to="/submit">Log a Copilot Win →</Link></li>
            <li><Link to="/hall-of-fame">Hall of Fame →</Link></li>
            <li><Link to="/arcade">Arcade →</Link></li>
          </ul>
        </div>
      </section>

      <div className="cta-row">
        <Link to="/submit" className="btn primary">Log a Copilot win →</Link>
      </div>
    </div>
  )
}
