import { useMemo, useState } from 'react';
import { useIdentity } from '../context/IdentityContext';
import { clusterCardStyle, clusterTagStyle, getClusterColor } from '../data/clusterColors';

export function PrinciplesLibrary() {
  const { clusters } = useIdentity();
  const [q, setQ] = useState('');
  const [clusterFilter, setClusterFilter] = useState('all');

  const rows = useMemo(() => {
    return clusters.flatMap((c) =>
      c.principles
        .map((text, i) => ({ key: `${c.id}-${i}`, clusterId: c.id, clusterTitle: c.title, text: text.trim() }))
        .filter((r) => r.text.length > 0)
    );
  }, [clusters]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (clusterFilter !== 'all' && r.clusterId !== clusterFilter) return false;
      if (!needle) return true;
      return r.text.toLowerCase().includes(needle) || r.clusterTitle.toLowerCase().includes(needle);
    });
  }, [rows, q, clusterFilter]);

  return (
    <section aria-labelledby="lib-heading">
      <h2 id="lib-heading" className="section-title">
        Principles library
      </h2>
      <p className="section-lede">
        Every principle in one place. Each card is color-coded by its value cluster—search or filter when you are planning or writing.
      </p>

      <div className="principles-legend card" style={{ marginBottom: '1rem' }}>
        <span className="principles-legend-label">Categories</span>
        <ul className="principles-legend-list">
          {clusters.map((c) => {
            const color = getClusterColor(c.id);
            return (
              <li key={c.id}>
                <span className="principles-legend-swatch" style={{ background: color.border }} aria-hidden="true" />
                <span>{c.title}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="grid-2">
          <div className="field" style={{ marginBottom: 0 }}>
            <label htmlFor="lib-search">Search</label>
            <input
              id="lib-search"
              className="input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Keyword in principle or cluster…"
              autoComplete="off"
            />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label htmlFor="lib-filter">Cluster</label>
            <select
              id="lib-filter"
              className="input"
              value={clusterFilter}
              onChange={(e) => setClusterFilter(e.target.value)}
            >
              <option value="all">All clusters</option>
              {clusters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {filtered.length === 0 ? (
          <p className="card" style={{ color: 'var(--muted)', margin: 0 }}>
            No principles match that filter.
          </p>
        ) : (
          filtered.map((r) => (
            <article key={r.key} className="card principle-card" style={clusterCardStyle(r.clusterId)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="tag" style={clusterTagStyle(r.clusterId)}>
                  {r.clusterTitle}
                </span>
              </div>
              <p style={{ margin: '0.65rem 0 0', fontSize: '1.05rem' }}>{r.text}</p>
            </article>
          ))
        )}
      </div>

      <style>{`
        .principles-legend-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
          margin-bottom: 0.65rem;
        }
        .principles-legend-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
        }
        .principles-legend-list li {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.88rem;
          font-weight: 600;
        }
        .principles-legend-swatch {
          width: 0.85rem;
          height: 0.85rem;
          border: 2px solid var(--border);
          flex-shrink: 0;
        }
        .principle-card {
          transition: filter 0.1s ease;
        }
        .principle-card:hover {
          filter: brightness(1.04);
        }
      `}</style>
    </section>
  );
}
