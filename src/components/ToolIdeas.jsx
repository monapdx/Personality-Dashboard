import { useEffect, useState } from 'react';
import { useIdentity } from '../context/IdentityContext';
import { uid } from '../utils/ids';

export function ToolIdeas() {
  const { clusters, toolIdeas, setToolIdeas } = useIdentity();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (!editingId) {
      setDraft(null);
      return;
    }
    const card = toolIdeas.find((t) => t.id === editingId);
    setDraft(card ? { ...card } : null);
  }, [editingId, toolIdeas]);

  function commitDraft() {
    if (!draft) {
      setEditingId(null);
      return;
    }

    const cleaned = {
      ...draft,
      title: draft.title.trim() || 'Untitled tool idea',
      description: draft.description.trim(),
      clusterId: draft.clusterId || null,
    };

    setToolIdeas((prev) => {
      const exists = prev.some((t) => t.id === cleaned.id);
      if (exists) return prev.map((t) => (t.id === cleaned.id ? cleaned : t));
      return [...prev, cleaned];
    });
    setEditingId(null);
  }

  function addCard() {
    const c = clusters[0];
    const card = {
      id: uid('tool'),
      title: 'New tool idea',
      description: 'What it does, who it is for, and how it reflects your values.',
      clusterId: c ? c.id : null,
    };
    setToolIdeas((prev) => [...prev, card]);
    setEditingId(card.id);
  }

  function removeCard(id) {
    if (!window.confirm('Remove this tool idea?')) return;
    setToolIdeas((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setDraft(null);
    }
  }

  function closeEditor() {
    commitDraft();
  }

  return (
    <section aria-labelledby="tools-heading">
      <h2 id="tools-heading" className="section-title">
        Tool ideas
      </h2>
      <p className="section-lede">
        Concrete build targets grounded in your clusters. Add, edit, or delete—changes save automatically to your browser.
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <button type="button" className="btn btn-primary" onClick={addCard}>
          Add tool idea
        </button>
      </div>

      <div className="tool-grid">
        {toolIdeas.map((t) => {
          const cluster = clusters.find((c) => c.id === t.clusterId);
          return (
            <article key={t.id} className="card tool-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'flex-start' }}>
                {cluster ? <span className="tag">{cluster.title}</span> : <span className="tag">Unassigned</span>}
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    type="button"
                    className="btn"
                    style={{ padding: '0.25rem 0.45rem', fontSize: '0.8rem' }}
                    onClick={() => setEditingId(t.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ padding: '0.25rem 0.45rem', fontSize: '0.8rem' }}
                    onClick={() => removeCard(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', margin: '0.65rem 0 0.35rem', fontSize: '1.1rem' }}>{t.title}</h3>
              <p style={{ margin: 0, color: 'var(--muted)' }}>{t.description}</p>
            </article>
          );
        })}
      </div>

      {draft && editingId ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="tool-edit-title">
          <div className="modal">
            <div className="modal-header">
              <h2 id="tool-edit-title" className="modal-title">
                Edit tool idea
              </h2>
              <button type="button" className="btn" onClick={closeEditor}>
                Close
              </button>
            </div>

            <div className="field">
              <label htmlFor="tool-title">Title</label>
              <input
                id="tool-title"
                className="input"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="tool-cluster">Related cluster</label>
              <select
                id="tool-cluster"
                className="input"
                value={draft.clusterId ?? ''}
                onChange={(e) => setDraft({ ...draft, clusterId: e.target.value || null })}
              >
                <option value="">Unassigned</option>
                {clusters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="tool-desc">Description</label>
              <textarea
                id="tool-desc"
                className="textarea"
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </div>

            <button type="button" className="btn btn-primary" onClick={commitDraft}>
              Save
            </button>
          </div>
        </div>
      ) : null}

      <style>{`
        .tool-grid {
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 720px) {
          .tool-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .tool-card:nth-child(3n + 1) {
          box-shadow: var(--shadow-pink);
          border-color: var(--pink);
        }
        .tool-card:nth-child(3n + 2) {
          box-shadow: var(--shadow-lime);
          border-color: var(--lime);
        }
        .tool-card:nth-child(3n) {
          box-shadow: var(--shadow-lav);
          border-color: var(--lavender);
        }
      `}</style>
    </section>
  );
}
