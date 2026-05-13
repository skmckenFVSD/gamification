import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

const CATEGORIES = [
  { id: 'drafting',     label: 'Drafting (Word, email, docs)' },
  { id: 'email-triage', label: 'Email triage / inbox' },
  { id: 'meeting-prep', label: 'Meeting prep / recap' },
  { id: 'research',     label: 'Research / SharePoint search' },
  { id: 'analysis',     label: 'Analysis (Excel, data)' },
  { id: 'other',        label: 'Other' },
]

const PLACEHOLDERS = {
  drafting:     "e.g. 'Drafted parent newsletter — tightened tone in Word.'",
  'email-triage': "e.g. 'Summarized 40-message thread before standup.'",
  'meeting-prep':"e.g. 'Generated agenda + action items for ops sync.'",
  research:     "e.g. 'Pulled curriculum framework comparison from SharePoint.'",
  analysis:     "e.g. 'Built Q4 spending pivot in Excel with Copilot.'",
  other:        "Describe what Copilot did and what you would have done manually.",
}

export default function SubmitWin() {
  const { currentPlayer, addWin, gameWins } = useApp()
  const nav = useNavigate()
  const [category, setCategory] = useState('drafting')
  const [summary, setSummary] = useState('')
  const [minutesSaved, setMinutesSaved] = useState(30)

  const myWins = gameWins.filter((w) => w.playerId === currentPlayer.id)

  function submit(e) {
    e.preventDefault()
    if (!summary.trim()) return
    addWin({ playerId: currentPlayer.id, category, summary: summary.trim(), minutesSaved })
    setSummary('')
    setMinutesSaved(30)
    nav('/')
  }

  return (
    <div className="page">
      <h1>Log a Copilot win</h1>
      <p className="privacy-note">
        🔒 <strong>Privacy:</strong> Do not include student names or any personally identifying student information in your summary.
      </p>

      <form onSubmit={submit} className="win-form">
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </label>

        <label>
          What did Copilot help with?
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder={PLACEHOLDERS[category]}
            rows={3}
            required
          />
        </label>

        <label>
          Minutes saved (your estimate vs. doing it manually)
          <input
            type="number"
            min="1"
            max="600"
            value={minutesSaved}
            onChange={(e) => setMinutesSaved(Number(e.target.value))}
          />
        </label>

        <div className="formula-hint">
          <strong>How this scores:</strong> Logged wins become "shots on goal". Every 5 hours saved (or 10 verified wins) = 1 goal in Regulation. Multipliers ramp in Overtime (1.5×) and Shootout (2.0×).
        </div>

        <button type="submit" className="btn primary">Take the shot 🏒</button>
      </form>

      <h2>Your wins this game ({myWins.length})</h2>
      <ul className="my-wins">
        {myWins.length === 0 && <li className="empty">No wins logged yet.</li>}
        {myWins.map((w) => (
          <li key={w.id}>
            <strong>{w.category}</strong> · {w.minutesSaved} min
            {w.verified ? <span className="badge verified">✓ verified</span> : <span className="badge pending">pending</span>}
            <p>{w.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
