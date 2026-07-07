export function ChartFigure({ src, alt, caption }) {
  if (!src) return null;

  return (
    <figure className="chart-figure">
      <img src={src} alt={alt} className="chart-figure-img" loading="lazy" />
      {caption ? <figcaption className="chart-figure-caption">{caption}</figcaption> : null}
    </figure>
  );
}
