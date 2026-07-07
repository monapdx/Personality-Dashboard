import { useMemo, useState } from 'react';
import { evaluatorCriteria } from '../data/initialData';
import { ChartFigure } from './ChartFigure';
import { sectionCharts } from '../data/chartImages';

const SCALE = [
  { v: 1, l: 'Rarely' },
  { v: 2, l: 'Sometimes' },
  { v: 3, l: 'Often' },
  { v: 4, l: 'Usually' },
  { v: 5, l: 'Strongly' },
];

function suggestForCriterion(id, score) {
  if (score >= 4) return null;
  const tips = {
    autonomy: 'Add explicit opt-outs, smaller asks, or clearer pause controls.',
    lowEnergy: 'Reduce steps, add templates, or ship a “minimum viable” slice first.',
    portable: 'Prefer open formats, document exports, and fewer single-vendor dependencies.',
    refusal: 'Make “no” paths obvious: decline flows, async responses, or tiered commitment.',
    clarity: 'Rewrite the pitch in plain language; add a one-page outline before features.',
    safety: 'Run a quick harm scan: data handling, emotional load, and who bears the risk.',
    memory: 'Add logging, provenance, or archival hooks so the work leaves durable traces.',
  };
  return tips[id] ?? 'Tighten alignment with this criterion before scaling the idea.';
}

export function ProjectEvaluator() {
  const [idea, setIdea] = useState('');
  const [scores, setScores] = useState(() =>
    Object.fromEntries(evaluatorCriteria.map((c) => [c.id, 3]))
  );
  const [submitted, setSubmitted] = useState(false);

  const summary = useMemo(() => {
    const entries = evaluatorCriteria.map((c) => ({ ...c, score: scores[c.id] }));
    const total = entries.reduce((s, e) => s + e.score, 0);
    const max = entries.length * 5;
    const pct = Math.round((total / max) * 100);
    const weak = entries.filter((e) => e.score <= 2);
    const suggestions = entries
      .map((e) => ({ id: e.id, text: suggestForCriterion(e.id, e.score) }))
      .filter((x) => x.text);
    return { entries, total, max, pct, weak, suggestions };
  }, [scores]);

  function resetForm() {
    setIdea('');
    setScores(Object.fromEntries(evaluatorCriteria.map((c) => [c.id, 3])));
    setSubmitted(false);
  }

  return (
    <section aria-labelledby="eval-heading">
      <h2 id="eval-heading" className="section-title">
        Project evaluator
      </h2>
      <p className="section-lede">
        Score a project idea against your core values. Use the reference charts when a score feels ambiguous—they mirror the situation and forgiveness flows from your mermaid diagrams.
      </p>

      <details className="card accent-lav" style={{ marginBottom: '1.25rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Reference charts</summary>
        <div className="chart-stack" style={{ marginTop: '0.75rem' }}>
          <ChartFigure
            src={sectionCharts.evaluator.situations.src}
            alt={sectionCharts.evaluator.situations.alt}
            caption="Situation flow — autonomy, coercion, consent, and when law may be illegitimate"
          />
          <ChartFigure
            src={sectionCharts.evaluator.unforgiveable.src}
            alt={sectionCharts.evaluator.unforgiveable.alt}
            caption="Forgiveness framework — betrayal of duty and vulnerability"
          />
        </div>
      </details>

      <form
        className="card"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="field">
          <label htmlFor="project-idea">Project idea</label>
          <textarea
            id="project-idea"
            className="textarea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="One paragraph is enough: audience, promise, and how you would ship it."
            required
          />
        </div>

        <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
          <legend className="section-title" style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
            Value fit (1–5)
          </legend>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {evaluatorCriteria.map((c) => (
              <div key={c.id} className="eval-row card" style={{ boxShadow: '4px 4px 0 #2a2a32', margin: 0 }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 700 }}>{c.label}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{c.hint}</div>
                </div>
                <div className="scale" role="group" aria-label={c.label}>
                  {SCALE.map((s) => (
                    <label key={s.v} className="scale-option">
                      <input
                        type="radio"
                        name={c.id}
                        value={s.v}
                        checked={scores[c.id] === s.v}
                        onChange={() => setScores((prev) => ({ ...prev, [c.id]: s.v }))}
                      />
                      <span>{s.l}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button type="submit" className="btn btn-primary">
            Generate scorecard
          </button>
          <button type="button" className="btn" onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>

      {submitted ? (
        <div className="card accent-lime" style={{ marginTop: '1.25rem' }}>
          <h3 className="modal-title" style={{ marginTop: 0 }}>
            Scorecard
          </h3>
          <p style={{ marginTop: 0, color: 'var(--muted)' }}>
            Composite: <strong style={{ color: 'var(--text)' }}>{summary.total}</strong> / {summary.max} ({summary.pct}%)
          </p>

          {idea.trim() ? (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 0.35rem' }}>Your idea</h4>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{idea.trim()}</p>
            </div>
          ) : null}

          <ul style={{ margin: '0 0 1rem', paddingLeft: '1.2rem', color: 'var(--muted)' }}>
            {summary.entries.map((e) => (
              <li key={e.id}>
                <strong style={{ color: 'var(--text)' }}>{e.label.replace(/\?$/, '')}</strong>: {e.score} / 5
              </li>
            ))}
          </ul>

          {summary.weak.length ? (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ margin: '0 0 0.35rem' }}>Watch points</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                {summary.weak.map((e) => (
                  <li key={e.id} style={{ marginBottom: '0.35rem' }}>
                    {e.label} scored low—treat this as a design constraint, not a personal judgment.
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <h4 style={{ margin: '0 0 0.35rem' }}>Suggestions</h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {summary.suggestions.map((s) => (
              <li key={s.id} style={{ marginBottom: '0.35rem' }}>
                {s.text}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <style>{`
        .scale {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.35rem;
        }
        .scale-option {
          border: 2px solid var(--border);
          background: var(--bg);
          padding: 0.35rem 0.45rem;
          font-size: 0.82rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
        }
        .scale-option:has(input:checked) {
          border-color: var(--lime);
          box-shadow: 2px 2px 0 var(--lime);
        }
        .scale-option input {
          accent-color: var(--lime);
        }
      `}</style>
    </section>
  );
}
