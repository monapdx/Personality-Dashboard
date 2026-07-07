import { useEffect, useState } from 'react';
import { ListEditor } from './ListEditor';
import { uid } from '../utils/ids';

const CORE_PROBES = [
  'Does this feel coercive?',
  'Does this feel fragile?',
  'Does this feel overwhelming?',
  'Does this feel unsafe?',
  'Does this feel like forced justification?',
];

function emptyCluster() {
  return {
    id: uid('cluster'),
    title: 'New value cluster',
    meaning: 'Describe what this cluster protects or orients you toward.',
    principles: [''],
    stressTests: [...CORE_PROBES],
    tools: [''],
  };
}

export function ClusterModal({ cluster, isNew, onClose, onSave, onDelete }) {
  const [draft, setDraft] = useState(cluster ?? emptyCluster());

  useEffect(() => {
    setDraft(cluster ?? emptyCluster());
  }, [cluster, isNew]);

  function save() {
    const cleaned = {
      ...draft,
      principles: draft.principles.map((s) => s.trim()).filter(Boolean),
      stressTests: draft.stressTests.map((s) => s.trim()).filter(Boolean),
      tools: draft.tools.map((s) => s.trim()).filter(Boolean),
      title: draft.title.trim() || 'Untitled cluster',
      meaning: draft.meaning.trim(),
    };
    onSave(cleaned);
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="cluster-modal-title">
      <div className="modal">
        <div className="modal-header">
          <h2 id="cluster-modal-title" className="modal-title">
            {isNew ? 'Add value cluster' : 'Edit value cluster'}
          </h2>
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="field">
          <label htmlFor="c-title">Title</label>
          <input
            id="c-title"
            className="input"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="c-meaning">Plain-language meaning</label>
          <textarea
            id="c-meaning"
            className="textarea"
            value={draft.meaning}
            onChange={(e) => setDraft({ ...draft, meaning: e.target.value })}
          />
        </div>

        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: 0 }}>
          Core probes you can reuse in any cluster:
        </p>
        <ul style={{ color: 'var(--muted)', margin: '0 0 1rem', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
          {CORE_PROBES.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>

        <ListEditor
          label="Related principles"
          items={draft.principles}
          onChange={(principles) => setDraft({ ...draft, principles })}
        />
        <ListEditor
          label="Stress test questions"
          items={draft.stressTests}
          onChange={(stressTests) => setDraft({ ...draft, stressTests })}
        />
        <ListEditor
          label="Suggested outputs / tools"
          items={draft.tools}
          onChange={(tools) => setDraft({ ...draft, tools })}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          <button type="button" className="btn btn-primary" onClick={save}>
            Save cluster
          </button>
          {!isNew && onDelete ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Delete this cluster permanently?')) onDelete(draft.id);
              }}
            >
              Delete cluster
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
