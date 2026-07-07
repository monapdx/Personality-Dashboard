export const sectionCharts = {
  identityMap: {
    core: { src: '/charts/identity-core.png', alt: 'Identity Core value map — seven clusters branching from Identity Core: Ash' },
    kernel: { src: '/charts/identity-kernel.png', alt: 'Identity kernel — values, aspirations, mission, goals, beliefs, and standards' },
    framework: { src: '/charts/moral-framework.png', alt: "Ashly's moral framework — justice, autonomy, harm, truth, and loyalty" },
  },
  workflow: {
    primary: { src: '/charts/feedback-loop.png', alt: 'Workflow feedback loop — inputs, process, outputs, and return paths' },
    alternate: { src: '/charts/meaning.png', alt: 'Linear workflow — inputs through process to outputs with feedback' },
  },
  evaluator: {
    situations: { src: '/charts/situations.png', alt: 'Situation decision flow — autonomy, coercion, consent, and law' },
    unforgiveable: { src: '/charts/unforgiveable.png', alt: 'What makes something unforgivable — betrayal, vulnerability, and duty' },
  },
};

/** @type {Record<string, { primary?: { src: string; alt: string }; related?: { src: string; alt: string }[] }>} */
export const clusterCharts = {
  'honesty-truth': {
    related: [{ src: '/charts/worldview.png', alt: 'Worldview — the world, the self, and the moral task' }],
  },
  'autonomy-freedom': {
    primary: { src: '/charts/autonomy.png', alt: 'Core value autonomy — bodily, reproductive, sexual, and medical refusal' },
    related: [
      { src: '/charts/society-defaults.png', alt: 'Default society — rejected life scripts and conditional legal obedience' },
      { src: '/charts/power-analysis.png', alt: 'Power analysis — who has power and why to doubt authority' },
    ],
  },
  'memory-preservation': {},
  'constraint-aware': {
    primary: { src: '/charts/reality-constraints.png', alt: 'Reality constraints — adaptations and systems you build' },
  },
  'refusal-valid': {
    related: [
      { src: '/charts/society-defaults.png', alt: 'Default society — rejected as default, self-authored life' },
      { src: '/charts/power-analysis.png', alt: 'Power analysis — trust consent and harm over status' },
    ],
  },
  'clarity-performance': {},
  'care-action': {
    related: [
      { src: '/charts/unforgiveable.png', alt: 'Forgiveness framework — betrayal of duty and vulnerability' },
      { src: '/charts/situations.png', alt: 'Situation ethics flowchart' },
    ],
  },
};

export function chartsForCluster(clusterId) {
  return clusterCharts[clusterId] ?? {};
}
