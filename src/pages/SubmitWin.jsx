import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

const CATEGORIES = [
  { id: 'drafting',     label: 'Drafting',       icon: '✍️', color: '#3A6EE0' },
  { id: 'email-triage', label: 'Email triage',   icon: '📥', color: '#FF8A3D' },
  { id: 'meeting-prep', label: 'Meeting prep',   icon: '📅', color: '#7B5BFF' },
  { id: 'research',     label: 'Research',       icon: '🔎', color: '#3FB984' },
  { id: 'analysis',     label: 'Analysis',       icon: '📊', color: '#D94343' },
  { id: 'other',        label: 'Other',          icon: '✨', color: '#6B7280' },
]

const PLACEHOLDERS = {
  drafting:       "e.g. 'Drafted parent newsletter — tightened tone in Word.'",
  'email-triage': "e.g. 'Summarized 40-message thread before standup.'",
  'meeting-prep': "e.g. 'Generated agenda + action items for ops sync.'",
  research:       "e.g. 'Pulled curriculum framework comparison from SharePoint.'",
  analysis:       "e.g. 'Built Q4 spending pivot in Excel with Copilot.'",
  other:          "Describe what Copilot did and what you would have done manually.",
}

const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  return `${days}d ago`
}

export default function SubmitWin() {
  const { currentPlayer, addWin, gameWins } = useApp()
  const nav = useNavigate()

  const [category, setCategory] = useState('drafting')
  const [summary, setSummary] = useState('')
  const [minutesSaved, setMinutesSaved] = useState(30)
  const [rating, setRating] = useState(0)
  const [recommendation, setRecommendation] = useState('')

  const myWins = [...gameWins].filter((w) => w.playerId === currentPlayer.id).reverse()

  function submit(e) {
    e.preventDefault()
    if (!summary.trim()) return
    addWin({
      playerId: currentPlayer.id,
      category,
      summary: summary.trim(),
      minutesSaved,
      rating,
      recommendation: recommendation.trim(),
    })
    setSummary('')
    setMinutesSaved(30)
    setRating(0)
    setRecommendation('')
  }

  function reset() {
    setSummary('')
    setMinutesSaved(30)
    setRating(0)
    setRecommendation('')
  }

  return (
    <div className="log-win">
      {/* Banner */}
      <header className="log-banner">
        <div className="log-banner__crumbs">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/submit">My Log</Link>
          <span>›</span>
          <strong>Log a Win</strong>
        </div>
        <div className="log-banner__row">
          <div className="log-banner__title">
            <div className="log-banner__icon">
              <img src={`${import.meta.env.BASE_URL}copilot-rink-logo.png`} alt="CopilotRink" />
            </div>
            <div>
              <h1>Log a Copilot Win</h1>
              <p>Every win counts toward your team's shots on goal.</p>
            </div>
          </div>
          <div className="log-banner__actions">
            <button type="button" className="btn ghost" onClick={() => nav('/')}>Cancel</button>
            <button type="submit" form="winForm" className="btn primary teal">Take the Shot 🏒</button>
          </div>
        </div>
      </header>

      {/* Privacy reminder */}
      <div className="privacy-note">
        🔒 <strong>Privacy:</strong> Do not include student names or any personally identifying student information.
      </div>

      {/* Body: form + side panel */}
      <div className="log-grid">
        <form id="winForm" onSubmit={submit} className="log-card">
          <div className="log-card__header">
            <h2>Win details</h2>
            <span className="log-card__sub">Filling for <strong>{currentPlayer.name}</strong></span>
          </div>

          {/* Category chips */}
          <div className="field">
            <label className="field-label">Category</label>
            <div className="chip-row">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={'chip' + (category === c.id ? ' chip--active' : '')}
                  style={category === c.id ? { background: c.color, borderColor: c.color, color: '#fff' } : { borderColor: c.color, color: c.color }}
                  onClick={() => setCategory(c.id)}
                >
                  <span aria-hidden>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="field">
            <label className="field-label" htmlFor="summary">What did Copilot help with?</label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={PLACEHOLDERS[category]}
              rows={3}
              required
            />
          </div>

          {/* Minutes + Rating row */}
          <div className="field-row">
            <div className="field">
              <label className="field-label" htmlFor="minutes">Minutes saved</label>
              <input
                id="minutes"
                type="number"
                min="1"
                max="600"
                value={minutesSaved}
                onChange={(e) => setMinutesSaved(Number(e.target.value))}
              />
              <span className="field-hint">Your estimate vs. doing it manually.</span>
            </div>

            <div className="field">
              <label className="field-label">Rating</label>
              <div className="stars" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    className={'star' + (rating >= n ? ' star--on' : '')}
                    onClick={() => setRating(rating === n ? 0 : n)}
                  >
                    ★
                  </button>
                ))}
                <span className="stars-hint">{rating > 0 ? `${rating} / 5` : 'How proud are you?'}</span>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="field">
            <label className="field-label" htmlFor="rec">Recommendation / notes <span className="optional">(optional)</span></label>
            <textarea
              id="rec"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Got a prompt or pattern worth sharing? Drop it here so teammates can copy it."
              rows={2}
            />
          </div>

          <div className="formula-hint">
            <strong>How this scores:</strong> Wins become "shots on goal". Every 5h saved (or 10 verified wins) = 1 goal in Regulation. Multipliers ramp in Overtime (1.5×) and Shootout (2.0×).
          </div>

          <div className="form-actions">
            <button type="button" className="btn ghost" onClick={reset}>Clear</button>
            <button type="submit" className="btn primary">Take the Shot 🏒</button>
          </div>
        </form>

        {/* Side panel */}
        <aside className="log-side">
          <div className="side-card">
            <div className="side-card__header">
              <h3>My recent wins</h3>
              <span className="counter">{myWins.length}</span>
            </div>
            {myWins.length === 0 && (
              <p className="empty">No wins yet for this game. Be the first on your team to put one on the board.</p>
            )}
            <ul className="recent-list">
              {myWins.slice(0, 6).map((w) => {
                const c = CATEGORY_BY_ID[w.category] || CATEGORY_BY_ID.other
                return (
                  <li key={w.id} className="recent-item" style={{ borderLeftColor: c.color }}>
                    <div className="recent-item__top">
                      <span className="recent-item__cat" style={{ color: c.color }}>{c.icon} {c.label}</span>
                      <span className="recent-item__time">{timeAgo(w.createdAt)}</span>
                    </div>
                    <p className="recent-item__summary">{w.summary}</p>
                    <div className="recent-item__meta">
                      <span>{w.minutesSaved} min</span>
                      {w.rating ? <span className="recent-item__rating">{'★'.repeat(w.rating)}</span> : null}
                      {w.verified
                        ? <span className="badge verified">✓ verified</span>
                        : <span className="badge pending">pending</span>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="side-card side-card--learn">
            <div className="side-card__header">
              <h3>Sharpen your game</h3>
            </div>
            <p className="side-card__intro">Five-minute reads to level up your Copilot skill.</p>
            <ul className="learn-list">
              <li><a href="https://learn.microsoft.com/en-us/copilot/" target="_blank" rel="noreferrer">Learn how to use Microsoft Copilot →</a></li>
              <li><a href="https://learn.microsoft.com/en-us/training/paths/get-started-with-microsoft-365-copilot/" target="_blank" rel="noreferrer">Get started with M365 Copilot (training path) →</a></li>
              <li><a href="https://learn.microsoft.com/en-us/viva/learning/academy-copilot" target="_blank" rel="noreferrer">Microsoft Copilot Academy →</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
