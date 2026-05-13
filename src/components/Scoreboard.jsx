// Scoreboard — overlays live game values on top of the FVSD scoreboard image.
// Boxes mapped to game state (Scott to refine placeholder mappings later):
//   CLOCK   → days remaining in the game
//   HOME    → teamA goals
//   VISITOR → teamB goals
//   PENALTY → teamA shots on goal (placeholder)
//   PERIOD  → current period number
//   SHOTS   → teamB shots on goal (placeholder)
import { useApp } from '../context/AppContext.jsx'

const PERIOD_NUM = { regulation: '1', overtime: '2', shootout: '3' }

function daysLeft(endDate) {
  const ms = new Date(endDate).getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

function pad(n, width) {
  return String(n).padStart(width, '0')
}

export default function Scoreboard() {
  const { activeGame, teamA, teamB, period } = useApp()

  const clock = pad(daysLeft(activeGame.endDate), 4)
  const homeGoals = pad(teamA.goals, 2)
  const visitorGoals = pad(teamB.goals, 2)
  const penalty = String(teamA.shotsOnGoal % 10)
  const periodNum = PERIOD_NUM[period] || '1'
  const shots = String(teamB.shotsOnGoal % 10)

  return (
    <div className="scoreboard">
      <img
        src={`${import.meta.env.BASE_URL}scoreboard.jpg`}
        alt="Hockey scoreboard"
        className="scoreboard__img"
      />
      <div className="scoreboard__digits">
        <span className="sb-digit sb-digit--clock">{clock}</span>
        <span className="sb-digit sb-digit--home">{homeGoals}</span>
        <span className="sb-digit sb-digit--visitor">{visitorGoals}</span>
        <span className="sb-digit sb-digit--penalty">{penalty}</span>
        <span className="sb-digit sb-digit--period">{periodNum}</span>
        <span className="sb-digit sb-digit--shots">{shots}</span>
      </div>
      <div className="scoreboard__legend">
        <span><strong>{activeGame.teamA.name}</strong> = Home</span>
        <span><strong>{activeGame.teamB.name}</strong> = Visitor</span>
      </div>
    </div>
  )
}
