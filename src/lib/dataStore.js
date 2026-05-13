// Tiny JSON-backed store. V1: load from /public/data on boot, mutations cached in localStorage.
// V2: swap this module for a Dataverse client.

const BASE = import.meta.env.BASE_URL
const LS_KEY = 'copilotrink:v1'

async function fetchJson(name) {
  const res = await fetch(`${BASE}data/${name}.json`)
  if (!res.ok) throw new Error(`Failed to load ${name}.json`)
  return res.json()
}

export async function loadInitialState() {
  const cached = localStorage.getItem(LS_KEY)
  if (cached) {
    try { return JSON.parse(cached) } catch { /* fall through */ }
  }
  const [departments, players, games, wins, arcadeScores] = await Promise.all([
    fetchJson('departments'),
    fetchJson('players'),
    fetchJson('games'),
    fetchJson('wins'),
    fetchJson('arcadeScores'),
  ])
  const state = { departments, players, games, wins, arcadeScores }
  localStorage.setItem(LS_KEY, JSON.stringify(state))
  return state
}

export function persist(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state))
}

export function resetToSeed() {
  localStorage.removeItem(LS_KEY)
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}
