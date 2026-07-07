export function ListEditor({ label, items, onChange, placeholder = 'New item…' }) {
  function updateAt(index, value) {
    const next = items.slice();
    next[index] = value;
    onChange(next);
  }

  function removeAt(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function addLine() {
    onChange([...items, '']);
  }

  return (
    <div className="list-block">
      <h4>{label}</h4>
      {items.length === 0 ? (
        <p style={{ color: 'var(--muted)', margin: '0 0 0.5rem' }}>Nothing here yet.</p>
      ) : null}
      {items.map((line, index) => (
        <div key={index} className="row-editor">
          <input
            className="input"
            value={line}
            placeholder={placeholder}
            onChange={(e) => updateAt(index, e.target.value)}
            aria-label={`${label} ${index + 1}`}
          />
          <button type="button" className="icon-btn" onClick={() => removeAt(index)} aria-label={`Remove ${label} ${index + 1}`}>
            ×
          </button>
        </div>
      ))}
      <button type="button" className="btn" onClick={addLine}>
        Add line
      </button>
    </div>
  );
}
