import { useApp } from '../context/AppContext.jsx'
import Avatar from '../components/Avatar.jsx'

export default function HallOfFame() {
  const { arcadeScores, players, departments } = useApp()
  const playerById = Object.fromEntries(players.map((p) => [p.id, p]))
  const deptById = Object.fromEntries(departments.map((d) => [d.id, d]))

  const byPlayer = {}
  for (const a of arcadeScores) {
    if (!byPlayer[a.playerId] || a.score > byPlayer[a.playerId].score) byPlayer[a.playerId] = a
  }
  const topPlayers = Object.values(byPlayer).sort((a, b) => b.score - a.score)

  const byDept = {}
  for (const a of arcadeScores) {
    const dept = playerById[a.playerId]?.departmentId
    if (!dept) continue
    byDept[dept] = (byDept[dept] || 0) + a.score
  }
  const topDepts = Object.entries(byDept).sort((a, b) => b[1] - a[1])

  return (
    <div className="page">
      <h1>Arcade Hall of Fame 🏆</h1>
      <p className="muted">Top CopilotMan scores. Arcade points don't affect the rink — they're just for bragging rights.</p>

      <h2>Top players</h2>
      <ol className="hof-list">
        {topPlayers.map((a) => {
          const p = playerById[a.playerId]
          return (
            <li key={a.id}>
              <Avatar name={p?.name} size={32} />
              <span className="hof-name">{p?.name}</span>
              <span className="hof-dept">{deptById[p?.departmentId]?.name}</span>
              <strong>{a.score.toLocaleString()}</strong>
            </li>
          )
        })}
        {topPlayers.length === 0 && <li className="empty">No scores yet.</li>}
      </ol>

      <h2>Top departments (combined)</h2>
      <ol className="hof-list">
        {topDepts.map(([deptId, total]) => (
          <li key={deptId}>
            <span className="hof-name">{deptById[deptId]?.name}</span>
            <strong>{total.toLocaleString()}</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}
