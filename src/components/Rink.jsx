// SVG hockey rink — two-team puck view.
import { useApp } from '../context/AppContext.jsx'

export default function Rink() {
  const { activeGame, teamA, teamB, period } = useApp()
  const periodTint = { regulation: '#FFFFFF', overtime: '#FFF6D6', shootout: '#FFE3E3' }[period]

  return (
    <div className="rink-wrap">
      <div className="period-badge" data-period={period}>
        {{ regulation: 'P1 / P2 — Regulation', overtime: 'P3 — Overtime', shootout: 'P4 — Shootout' }[period]}
      </div>

      <svg viewBox="0 0 800 360" className="rink" role="img" aria-label="Hockey rink scoreboard">
        <defs>
          <linearGradient id="ice" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={periodTint} />
            <stop offset="100%" stopColor="#EAF4FF" />
          </linearGradient>
        </defs>

        <rect x="20" y="20" width="760" height="320" rx="160" fill="url(#ice)" stroke="#1F2A44" strokeWidth="4" />
        <line x1="400" y1="20" x2="400" y2="340" stroke="#D94343" strokeWidth="3" />
        <line x1="280" y1="20" x2="280" y2="340" stroke="#3A6EE0" strokeWidth="3" />
        <line x1="520" y1="20" x2="520" y2="340" stroke="#3A6EE0" strokeWidth="3" />
        <circle cx="400" cy="180" r="40" fill="none" stroke="#D94343" strokeWidth="2" />
        <circle cx="160" cy="100" r="22" fill="none" stroke="#D94343" strokeWidth="1.5" />
        <circle cx="160" cy="260" r="22" fill="none" stroke="#D94343" strokeWidth="1.5" />
        <circle cx="640" cy="100" r="22" fill="none" stroke="#D94343" strokeWidth="1.5" />
        <circle cx="640" cy="260" r="22" fill="none" stroke="#D94343" strokeWidth="1.5" />

        <rect x="20" y="140" width="14" height="80" fill={teamA.goals > teamB.goals ? '#3FB984' : '#7B5BFF'} />
        <rect x="766" y="140" width="14" height="80" fill={teamB.goals > teamA.goals ? '#3FB984' : '#FF6B6B'} />

        <text x="200" y="200" fontSize="120" fontWeight="800" textAnchor="middle" fill="#1F2A44">
          {teamA.goals}
        </text>
        <text x="200" y="240" fontSize="20" fontWeight="600" textAnchor="middle" fill="#1F2A44">
          {activeGame.teamA.name}
        </text>

        <text x="600" y="200" fontSize="120" fontWeight="800" textAnchor="middle" fill="#1F2A44">
          {teamB.goals}
        </text>
        <text x="600" y="240" fontSize="20" fontWeight="600" textAnchor="middle" fill="#1F2A44">
          {activeGame.teamB.name}
        </text>
      </svg>

      <div className="shots-row">
        <ShotsTicker label={activeGame.teamA.name} shots={teamA.shotsOnGoal} mins={teamA.totalMinutesSaved} />
        <ShotsTicker label={activeGame.teamB.name} shots={teamB.shotsOnGoal} mins={teamB.totalMinutesSaved} />
      </div>
    </div>
  )
}

function ShotsTicker({ label, shots, mins }) {
  return (
    <div className="shots-ticker">
      <strong>{label}</strong>
      <span>{shots} shots on goal</span>
      <span>{Math.round(mins / 60)}h saved</span>
    </div>
  )
}
