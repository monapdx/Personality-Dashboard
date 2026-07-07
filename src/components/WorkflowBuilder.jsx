import { useIdentity } from '../context/IdentityContext';
import { ListEditor } from './ListEditor';
import { ChartFigure } from './ChartFigure';
import { sectionCharts } from '../data/chartImages';

export function WorkflowBuilder() {
  const { workflow, setWorkflow } = useIdentity();

  return (
    <section aria-labelledby="wf-heading">
      <h2 id="wf-heading" className="section-title">
        Workflow builder
      </h2>
      <p className="section-lede">
        Inputs → process → outputs, with a feedback loop back into archives, themes, and inspiration. The diagram matches your mermaid workflow chart; lists below stay editable.
      </p>

      <div className="card accent-lime" style={{ marginBottom: '1.25rem' }}>
        <ChartFigure
          src={sectionCharts.workflow.primary.src}
          alt={sectionCharts.workflow.primary.alt}
          caption="Feedback loop — outputs return to inputs through archives, themes, and UI notes"
        />
      </div>

      <details className="card" style={{ marginBottom: '1.25rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Alternate linear view</summary>
        <div style={{ marginTop: '0.75rem' }}>
          <ChartFigure
            src={sectionCharts.workflow.alternate.src}
            alt={sectionCharts.workflow.alternate.alt}
            caption="Same pipeline in left-to-right layout"
          />
        </div>
      </details>

      <div className="grid-2">
        <div className="card">
          <ListEditor
            label="Inputs"
            items={workflow.inputs}
            onChange={(inputs) => setWorkflow({ ...workflow, inputs })}
          />
        </div>
        <div className="card">
          <ListEditor
            label="Process"
            items={workflow.process}
            onChange={(process) => setWorkflow({ ...workflow, process })}
          />
        </div>
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <ListEditor
            label="Outputs"
            items={workflow.outputs}
            onChange={(outputs) => setWorkflow({ ...workflow, outputs })}
          />
        </div>
      </div>
    </section>
  );
}
