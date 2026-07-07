import { useState } from 'react';
import './App.css';
import { DataToolbar } from './components/DataToolbar';
import { IdentityMap } from './components/IdentityMap';
import { PrinciplesLibrary } from './components/PrinciplesLibrary';
import { WorkflowBuilder } from './components/WorkflowBuilder';
import { ToolIdeas } from './components/ToolIdeas';
import { ProjectEvaluator } from './components/ProjectEvaluator';

const SECTIONS = [
  { id: 'map', label: 'Identity map' },
  { id: 'principles', label: 'Principles library' },
  { id: 'workflow', label: 'Workflow builder' },
  { id: 'tools', label: 'Tool ideas' },
  { id: 'evaluator', label: 'Project evaluator' },
];

export default function App() {
  const [section, setSection] = useState('map');

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1 className="app-title">Identity Core</h1>
          <p className="app-sub">A local-first dashboard for your values, principles, and build ideas.</p>
        </div>
        <DataToolbar />
      </header>

      <nav className="nav-pills" aria-label="Primary">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`nav-pill${section === s.id ? ' active' : ''}`}
            onClick={() => setSection(s.id)}
            aria-current={section === s.id ? 'page' : undefined}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <main>
        {section === 'map' ? <IdentityMap /> : null}
        {section === 'principles' ? <PrinciplesLibrary /> : null}
        {section === 'workflow' ? <WorkflowBuilder /> : null}
        {section === 'tools' ? <ToolIdeas /> : null}
        {section === 'evaluator' ? <ProjectEvaluator /> : null}
      </main>

      <footer style={{ marginTop: '3rem', paddingTop: '1.25rem', borderTop: '3px solid var(--border)', color: 'var(--muted)', fontSize: '0.9rem' }}>
        Identity Core stores data in your browser (localStorage). Export JSON often if you switch devices or clear site data.
      </footer>
    </div>
  );
}
