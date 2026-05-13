// CopilotRink scoring engine
// Hockey-realistic: targets 6-4, 8-5 type scores over a 4-week game.
//
// Periods:
//   Regulation (W1-2): 1.0×  | 1 goal per 5h saved | 1 goal per 10 verified wins
//   Overtime   (W3):   1.5×  | 1 goal per 5h saved | 1 goal per 10 verified wins
//   Shootout   (W4):   2.0×  | 1 goal per 3h saved | 1 goal per 5  verified wins
//
// Weekly highlight reel = +1 bonus goal regardless of period (awarded by game admin).

export const PERIOD_CONFIG = {
  regulation: { label: 'Regulation', multiplier: 1.0, hoursPerGoal: 5, winsPerGoal: 10 },
  overtime:   { label: 'Overtime',   multiplier: 1.5, hoursPerGoal: 5, winsPerGoal: 10 },
  shootout:   { label: 'Shootout',   multiplier: 2.0, hoursPerGoal: 3, winsPerGoal: 5  },
}

export const VERIFY_BONUS_MINUTES = 5

export function getPeriodForDate(date, game) {
  const start = new Date(game.startDate).getTime()
  const end = new Date(game.endDate).getTime()
  const now = new Date(date).getTime()
  if (now < start) return 'regulation'
  if (now > end) return 'shootout'
  const totalMs = end - start
  const elapsed = now - start
  const pct = elapsed / totalMs
  if (pct < 0.5) return 'regulation'   // weeks 1-2
  if (pct < 0.75) return 'overtime'    // week 3
  return 'shootout'                    // week 4
}

export function effectiveMinutes(win) {
  return (win.minutesSaved || 0) + (win.verified ? VERIFY_BONUS_MINUTES : 0)
}

// Compute goals for a single team given their wins in this game.
export function teamScore(wins, game) {
  let totalMinutes = 0
  let verifiedCount = 0
  const byPeriod = { regulation: { mins: 0, verified: 0 }, overtime: { mins: 0, verified: 0 }, shootout: { mins: 0, verified: 0 } }

  for (const win of wins) {
    const period = getPeriodForDate(win.createdAt, game)
    const cfg = PERIOD_CONFIG[period]
    const mins = effectiveMinutes(win) * cfg.multiplier
    byPeriod[period].mins += mins
    totalMinutes += mins
    if (win.verified) {
      byPeriod[period].verified += 1
      verifiedCount += 1
    }
  }

  let goals = 0
  for (const period of Object.keys(byPeriod)) {
    const cfg = PERIOD_CONFIG[period]
    goals += Math.floor((byPeriod[period].mins / 60) / cfg.hoursPerGoal)
    goals += Math.floor(byPeriod[period].verified / cfg.winsPerGoal)
  }

  return {
    goals,
    shotsOnGoal: wins.length,
    totalMinutesSaved: Math.round(totalMinutes),
    verifiedCount,
    byPeriod,
  }
}

// Team splits + scoring is composed in AppContext.derived, which holds the
// playerId → departmentId mapping. teamScore is the unit-testable primitive.
