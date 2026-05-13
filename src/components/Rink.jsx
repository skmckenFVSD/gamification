// Aurora rink hero — replaces the SVG rink with the FVSD outdoor arena image.
import { useApp } from '../context/AppContext.jsx'

const PERIOD_LABEL = {
  regulation: 'P1 / P2 — Regulation',
  overtime:   'P3 — Overtime',
  shootout:   'P4 — Shootout',
}

export default function Rink() {
  const { activeGame, teamA, teamB, period } = useApp()

  return (
    <div className="rink-hero">
      <img
        src={`${import.meta.env.BASE_URL}rink-arena.jpg`}
        alt="FVSD CopilotRink — aurora-lit outdoor arena at Central Office"
        className="rink-hero__img"
      />
      <div className="rink-hero__overlay">
        <span className="period-badge" data-period={period}>{PERIOD_LABEL[period]}</span>
      </div>
      <div className="rink-hero__teams">
        <div className="rink-hero__team rink-hero__team--home">
          <span className="rink-hero__teamname">{activeGame.teamA.name}</span>
        </div>
        <div className="rink-hero__team rink-hero__team--away">
          <span className="rink-hero__teamname">{activeGame.teamB.name}</span>
        </div>
      </div>
    </div>
  )
}
