import React, { useMemo, useState } from "react";
import { CheckCircle2, FileText, Sparkles, Timer } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

const TEAM_OPTIONS = [
  "Superintendents",
  "School Leaders",
  "Teachers",
  "Student Services",
  "Division Services",
];

const CATEGORY_OPTIONS = [
  "Lesson Planning",
  "Communication",
  "Data Insights",
  "Meeting Preparation",
  "Content Creation",
  "Other",
];

const INITIAL_FORM = {
  team: TEAM_OPTIONS[0],
  staffName: "",
  category: CATEGORY_OPTIONS[0],
  minutesSaved: 30,
  summary: "",
  impact: "",
  verified: false,
};

export default function PostAWin() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const totalPoints = useMemo(() => {
    const minutes = Number(form.minutesSaved) || 0;
    const base = Math.max(5, Math.round(minutes / 5));
    const impactBoost = form.impact.trim().length >= 20 ? 3 : 0;
    return base + impactBoost;
  }, [form.minutesSaved, form.impact]);

  function setField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setSubmitted(false);
  }

  return (
    <PagePlaceholder
      kicker="Game Day Form"
      title="Post a Win"
      description="Capture a Copilot success, estimate time saved, and submit a clean win card for team scoring."
      icon={FileText}
    >
      <div className="faceoff-win-layout">
        <form className="faceoff-form-shell" onSubmit={handleSubmit}>
          <div className="faceoff-form-grid">
            <label className="faceoff-form-field">
              <span>Team</span>
              <select
                value={form.team}
                onChange={(event) => setField("team", event.target.value)}
              >
                {TEAM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="faceoff-form-field">
              <span>Staff Member</span>
              <input
                type="text"
                value={form.staffName}
                onChange={(event) => setField("staffName", event.target.value)}
                placeholder="e.g. Alex McKenzie"
                maxLength={48}
                required
              />
            </label>

            <label className="faceoff-form-field">
              <span>Win Category</span>
              <select
                value={form.category}
                onChange={(event) => setField("category", event.target.value)}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="faceoff-form-field">
              <span>Minutes Saved</span>
              <input
                type="number"
                min={1}
                max={240}
                value={form.minutesSaved}
                onChange={(event) => setField("minutesSaved", event.target.value)}
                required
              />
            </label>
          </div>

          <label className="faceoff-form-field faceoff-form-field--full">
            <span>What did Copilot help accomplish?</span>
            <textarea
              value={form.summary}
              onChange={(event) => setField("summary", event.target.value)}
              placeholder="Describe the task and what changed after using Copilot."
              rows={4}
              maxLength={420}
              required
            />
          </label>

          <label className="faceoff-form-field faceoff-form-field--full">
            <span>Evidence or Impact Notes</span>
            <textarea
              value={form.impact}
              onChange={(event) => setField("impact", event.target.value)}
              placeholder="Share measurable impact, reuse value, or implementation notes."
              rows={3}
              maxLength={320}
            />
          </label>

          <label className="faceoff-form-check">
            <input
              type="checkbox"
              checked={form.verified}
              onChange={(event) => setField("verified", event.target.checked)}
            />
            <span>
              I confirm this win excludes student-identifying information and is safe to share division-wide.
            </span>
          </label>

          <div className="faceoff-form-actions">
            <button type="button" className="faceoff-button-secondary" onClick={handleReset}>
              Reset Form
            </button>
            <button type="submit" className="faceoff-button-primary">
              Submit Win
            </button>
          </div>

          {submitted ? (
            <div className="faceoff-form-banner" role="status">
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>Win drafted successfully. Connect this to backend submission when ready.</span>
            </div>
          ) : null}
        </form>

        <aside className="faceoff-win-side">
          <section className="faceoff-win-card">
            <div className="faceoff-win-card__title">
              <Sparkles size={16} aria-hidden="true" />
              <h3>Scoring Preview</h3>
            </div>
            <dl>
              <div>
                <dt>Projected Points</dt>
                <dd>{totalPoints}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{form.category}</dd>
              </div>
              <div>
                <dt>Team Pool</dt>
                <dd>{form.team}</dd>
              </div>
            </dl>
          </section>

          <section className="faceoff-win-card">
            <div className="faceoff-win-card__title">
              <Timer size={16} aria-hidden="true" />
              <h3>Submission Rules</h3>
            </div>
            <ul>
              <li>Keep team names to 24 characters.</li>
              <li>Use clear, measurable language.</li>
              <li>Avoid student-identifying details.</li>
              <li>Include reusable prompt patterns when possible.</li>
            </ul>
          </section>
        </aside>
      </div>
    </PagePlaceholder>
  );
}
