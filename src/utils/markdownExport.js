/**
 * @param {{ clusters: object[]; workflow: { inputs: string[]; process: string[]; outputs: string[] }; toolIdeas: object[] }} data
 */
export function buildMarkdownExport(data) {
  const lines = [];
  lines.push('# Identity Core');
  lines.push('');
  lines.push(`_Exported ${new Date().toISOString()}_`);
  lines.push('');
  lines.push('## Identity map');
  lines.push('');
  for (const c of data.clusters) {
    lines.push(`### ${c.title}`);
    lines.push('');
    lines.push(c.meaning);
    lines.push('');
    lines.push('**Principles**');
    for (const p of c.principles) lines.push(`- ${p}`);
    lines.push('');
    lines.push('**Stress tests**');
    for (const s of c.stressTests) lines.push(`- ${s}`);
    lines.push('');
    lines.push('**Suggested tools**');
    for (const t of c.tools) lines.push(`- ${t}`);
    lines.push('');
  }

  lines.push('## Workflow');
  lines.push('');
  lines.push('### Inputs');
  for (const i of data.workflow.inputs) lines.push(`- ${i}`);
  lines.push('');
  lines.push('### Process');
  for (const p of data.workflow.process) lines.push(`- ${p}`);
  lines.push('');
  lines.push('### Outputs');
  for (const o of data.workflow.outputs) lines.push(`- ${o}`);
  lines.push('');

  lines.push('## Tool ideas');
  lines.push('');
  for (const ti of data.toolIdeas) {
    const cluster = data.clusters.find((x) => x.id === ti.clusterId);
    lines.push(`### ${ti.title}`);
    if (cluster) lines.push(`_Cluster: ${cluster.title}_`);
    lines.push('');
    lines.push(ti.description);
    lines.push('');
  }

  return lines.join('\n');
}
