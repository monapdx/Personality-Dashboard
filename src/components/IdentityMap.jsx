import { useIdentity } from '../context/IdentityContext';
import { useState } from 'react';
import { ClusterModal } from './ClusterModal';
import { ClusterDetail } from './ClusterDetail';
import { ChartFigure } from './ChartFigure';
import { sectionCharts } from '../data/chartImages';

const ACCENTS = ['var(--pink)', 'var(--lime)', 'var(--lavender)'];

export function IdentityMap() {
  const { clusters, setClusters } = useIdentity();
  const [viewId, setViewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [mapView, setMapView] = useState('core');

  const viewing = clusters.find((c) => c.id === viewId) ?? null;
  const editing = clusters.find((c) => c.id === editId) ?? null;

  const activeMap =
    mapView === 'kernel' ? sectionCharts.identityMap.kernel : sectionCharts.identityMap.core;

  function persist(updated) {
    setClusters((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  function addCluster(cluster) {
    setClusters((prev) => [...prev, cluster]);
    setCreating(false);
  }

  function removeCluster(id) {
    setClusters((prev) => prev.filter((c) => c.id !== id));
    setEditId(null);
    setViewId(null);
  }

  return (
    <section aria-labelledby="map-heading">
      <h2 id="map-heading" className="section-title">
        Identity map
      </h2>
      <p className="section-lede">
        Your philosophy as a constellation—from the full value map to the moral framework underneath. Tap a cluster below for details and linked charts.
      </p>

      <div className="map-view-toggle" role="tablist" aria-label="Map view">
        <button
          type="button"
          role="tab"
          aria-selected={mapView === 'core'}
          className={`btn${mapView === 'core' ? ' btn-primary' : ''}`}
          onClick={() => setMapView('core')}
        >
          Full value map
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mapView === 'kernel'}
          className={`btn${mapView === 'kernel' ? ' btn-primary' : ''}`}
          onClick={() => setMapView('kernel')}
        >
          Identity kernel
        </button>
      </div>

      <div className="card accent-lime" style={{ marginBottom: '1.25rem' }}>
        <ChartFigure
          src={activeMap.src}
          alt={activeMap.alt}
          caption={mapView === 'core' ? 'Identity Core: Ash — seven value clusters and stress-test probes' : 'Structural kernel — values through behavioral standards'}
        />
      </div>

      <div className="card accent-lav" style={{ marginBottom: '1.25rem' }}>
        <h3 className="section-title" style={{ fontSize: '1.05rem', marginTop: 0 }}>
          Moral framework
        </h3>
        <ChartFigure
          src={sectionCharts.identityMap.framework.src}
          alt={sectionCharts.identityMap.framework.alt}
          caption="Justice, autonomy, harm, truth, and loyalty — the five pillars"
        />
      </div>

      <h3 className="section-title" style={{ fontSize: '1.05rem' }}>
        Value clusters
      </h3>
      <p className="section-lede" style={{ marginBottom: '0.75rem' }}>
        Select a cluster to read principles, stress tests, tools, and any linked detail charts.
      </p>

      <div className="cluster-grid">
        {clusters.map((c, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <button
              key={c.id}
              type="button"
              className="cluster-chip"
              style={{
                borderColor: accent,
                boxShadow: `4px 4px 0 ${accent}`,
              }}
              onClick={() => {
                setEditId(null);
                setCreating(false);
                setViewId(c.id);
              }}
            >
              {c.title}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setViewId(null);
            setEditId(null);
            setCreating(true);
          }}
        >
          Add value cluster
        </button>
      </div>

      {viewing && !creating && !editId ? (
        <ClusterDetail
          cluster={viewing}
          onClose={() => setViewId(null)}
          onEdit={() => {
            setEditId(viewing.id);
            setViewId(null);
          }}
        />
      ) : null}

      {(creating || editId) && (creating || editing) ? (
        <ClusterModal
          cluster={creating ? null : editing}
          isNew={creating}
          onClose={() => {
            setCreating(false);
            setEditId(null);
          }}
          onSave={(c) => {
            if (creating) addCluster(c);
            else persist(c);
            setCreating(false);
            setEditId(null);
          }}
          onDelete={creating ? null : removeCluster}
        />
      ) : null}

      <style>{`
        .map-view-toggle {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .cluster-grid {
          display: grid;
          gap: 0.65rem;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        .cluster-chip {
          border: 3px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.25;
          padding: 0.75rem 0.85rem;
          text-align: left;
          min-height: 3.25rem;
        }
        .cluster-chip:hover {
          filter: brightness(1.08);
        }
      `}</style>
    </section>
  );
}
