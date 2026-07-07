import { ChartFigure } from './ChartFigure';
import { chartsForCluster } from '../data/chartImages';

export function ClusterDetail({ cluster, onClose, onEdit }) {
  if (!cluster) return null;

  const { primary, related = [] } = chartsForCluster(cluster.id);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <div className="modal modal-wide">
        <div className="modal-header">
          <h2 id="detail-title" className="modal-title">
            {cluster.title}
          </h2>
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>

        {primary ? (
          <ChartFigure src={primary.src} alt={primary.alt} caption="Detail chart for this cluster" />
        ) : null}

        <p style={{ fontSize: '1.05rem', marginTop: primary ? '1rem' : 0 }}>{cluster.meaning}</p>

        <div className="list-block">
          <h4>Principles</h4>
          <ul>
            {cluster.principles.map((p, i) => (
              <li key={`${cluster.id}-p-${i}`}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="list-block">
          <h4>Stress tests</h4>
          <ul>
            {cluster.stressTests.map((s, i) => (
              <li key={`${cluster.id}-s-${i}`}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="list-block">
          <h4>Suggested outputs / tools</h4>
          <ul>
            {cluster.tools.map((t, i) => (
              <li key={`${cluster.id}-t-${i}`}>{t}</li>
            ))}
          </ul>
        </div>

        {related.length > 0 ? (
          <div className="list-block">
            <h4>Related charts</h4>
            <div className="chart-stack">
              {related.map((chart) => (
                <ChartFigure key={chart.src} src={chart.src} alt={chart.alt} />
              ))}
            </div>
          </div>
        ) : null}

        <button type="button" className="btn btn-primary" onClick={onEdit}>
          Edit cluster
        </button>
      </div>
    </div>
  );
}
