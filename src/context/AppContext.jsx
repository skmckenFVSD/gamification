import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { loadInitialState, persist, uid } from '../lib/dataStore'
import { teamScore, getPeriodForDate } from '../lib/scoring'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const [state, setState] = useState(null)
  const [currentPlayerId, setCurrentPlayerId] = useState('p1') // V1: hardcoded; V2: Entra SSO

  useEffect(() => {
    loadInitialState().then(setState)
  }, [])

  function update(mutator) {
    setState((prev) => {
      const next = mutator(prev)
      persist(next)
      return next
    })
  }

  function addWin({ playerId, category, summary, minutesSaved, rating = 0, recommendation = '' }) {
    update((s) => ({
      ...s,
      wins: [
        ...s.wins,
        {
          id: uid('w'),
          gameId: s.games.find((g) => g.status === 'active')?.id || s.games[0].id,
          playerId,
          category,
          summary,
          minutesSaved: Number(minutesSaved) || 0,
          rating: Number(rating) || 0,
          recommendation: recommendation || '',
          verified: false,
          createdAt: new Date().toISOString(),
        },
      ],
    }))
  }

  function verifyWin(winId) {
    update((s) => ({ ...s, wins: s.wins.map((w) => (w.id === winId ? { ...w, verified: true } : w)) }))
  }

  function deleteWin(winId) {
    update((s) => ({ ...s, wins: s.wins.filter((w) => w.id !== winId) }))
  }

  function addArcadeScore(playerId, score) {
    update((s) => ({
      ...s,
      arcadeScores: [...s.arcadeScores, { id: uid('a'), playerId, score, createdAt: new Date().toISOString() }],
    }))
  }

  const derived = useMemo(() => {
    if (!state) return null
    const activeGame = state.games.find((g) => g.status === 'active') || state.games[0]
    const gameWins = state.wins.filter((w) => w.gameId === activeGame.id)
    const playerDept = Object.fromEntries(state.players.map((p) => [p.id, p.departmentId]))

    const teamAWins = gameWins.filter((w) => activeGame.teamA.departmentIds.includes(playerDept[w.playerId]))
    const teamBWins = gameWins.filter((w) => activeGame.teamB.departmentIds.includes(playerDept[w.playerId]))

    const teamA = teamScore(teamAWins, activeGame)
    const teamB = teamScore(teamBWins, activeGame)
    const period = getPeriodForDate(new Date(), activeGame)

    return { activeGame, gameWins, teamA, teamB, period, playerDept }
  }, [state])

  if (!state || !derived) return <div className="loading">Loading the rink…</div>

  const currentPlayer = state.players.find((p) => p.id === currentPlayerId)

  return (
    <AppCtx.Provider
      value={{
        ...state,
        ...derived,
        currentPlayer,
        currentPlayerId,
        setCurrentPlayerId,
        addWin,
        verifyWin,
        deleteWin,
        addArcadeScore,
      }}
    >
      {children}
    </AppCtx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be inside <AppProvider>')
  return ctx
}
