import { useApp } from '../context/AppContext.jsx'
import Avatar from '../components/Avatar.jsx'

export default function Profile() {
  const { currentPlayer, currentPlayerId, setCurrentPlayerId, players, gameWins, arcadeScores, departments } = useApp()
  const dept = departments.find((d) => d.id === currentPlayer.departmentId)
  const myWins = gameWins.filter((w) => w.playerId === currentPlayerId)
  const myMinutes = myWins.reduce((sum, w) => sum + (w.minutesSaved || 0), 0)
  const myVerified = myWins.filter((w) => w.verified).length
  const myArcadeBest = Math.max(0, ...arcadeScores.filter((a) => a.playerId === currentPlayerId).map((a) => a.score))

  return (
    <div className="page profile">
      <div className="profile-head">
        <Avatar name={currentPlayer.name} size={84} />
        <div>
          <h1>{currentPlayer.name}</h1>
          <p>{dept?.name} {currentPlayer.isLead && <span className="badge lead">Dept lead</span>}</p>
        </div>
      </div>

      <div className="stat-grid">
        <Stat label="Wins logged" value={myWins.length} />
        <Stat label="Verified wins" value={myVerified} />
        <Stat label="Minutes saved" value={myMinutes} />
        <Stat label="Arcade best" value={myArcadeBest.toLocaleString()} />
      </div>

      <h2>Switch player (PoC)</h2>
      <p className="muted">V2 will use Entra SSO. For now, demo as anyone:</p>
      <select value={currentPlayerId} onChange={(e) => setCurrentPlayerId(e.target.value)}>
        {players.map((p) => <option key={p.id} value={p.id}>{p.name} — {departments.find(d=>d.id===p.departmentId)?.name}</option>)}
      </select>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
