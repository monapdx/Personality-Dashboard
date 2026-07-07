import { useRef } from 'react';
import { STORAGE_KEY } from '../data/initialData';
import { buildMarkdownExport } from '../utils/markdownExport';
import { useIdentity } from '../context/IdentityContext';

export function DataToolbar() {
  const { clusters, workflow, toolIdeas, resetToSample, importPayload } = useIdentity();
  const fileRef = useRef(null);

  function downloadJson() {
    const blob = new Blob(
      [JSON.stringify({ clusters, workflow, toolIdeas }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identity-core-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadMarkdown() {
    const md = buildMarkdownExport({ clusters, workflow, toolIdeas });
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identity-core-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function onPickFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        importPayload(data);
      } catch {
        alert('Could not parse JSON. Check the file format.');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  function clearStorage() {
    if (!window.confirm('Reset all data to the built-in sample? This clears local edits.')) return;
    localStorage.removeItem(STORAGE_KEY);
    resetToSample();
  }

  return (
    <div className="toolbar">
      <button type="button" className="btn btn-primary" onClick={downloadJson}>
        Export JSON
      </button>
      <button type="button" className="btn" onClick={downloadMarkdown}>
        Export Markdown
      </button>
      <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
        Import JSON
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        aria-hidden
        onChange={onPickFile}
      />
      <button type="button" className="btn btn-danger" onClick={clearStorage}>
        Reset sample
      </button>
    </div>
  );
}
