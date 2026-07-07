import { galleryGroups } from '../data/chartImages';
import { ChartFigure } from './ChartFigure';

export function ChartsGraphs() {
  return (
    <section aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="section-title">
        Charts & graphs
      </h2>
      <p className="section-lede">
        Visual library — identity diagrams, personality profiles, and saved assessment snapshots.
      </p>

      {galleryGroups.map((group) => (
        <div key={group.id} className="gallery-group card accent-lav" style={{ marginBottom: '1.25rem' }}>
          <h3 className="section-title" style={{ fontSize: '1.1rem', marginTop: 0 }}>
            {group.title}
          </h3>
          <p style={{ color: 'var(--muted)', margin: '0 0 1rem' }}>{group.description}</p>
          <div className="gallery-grid">
            {group.charts.map((item) => (
              <ChartFigure key={item.file} src={item.src} alt={item.alt} caption={item.alt} />
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .gallery-grid {
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 720px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
