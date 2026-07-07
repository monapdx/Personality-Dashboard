import { assetUrl } from '../utils/assetUrl';

function chart(file, alt) {
  return { src: assetUrl(`charts/${file}`), alt };
}

export const sectionCharts = {
  identityMap: {
    core: chart('identity-core.png', 'Identity Core value map — seven clusters branching from Identity Core: Ash'),
    kernel: chart('identity-kernel.png', 'Identity kernel — values, aspirations, mission, goals, beliefs, and standards'),
    framework: chart('moral-framework.png', "Ashly's moral framework — justice, autonomy, harm, truth, and loyalty"),
  },
  workflow: {
    primary: chart('feedback-loop.png', 'Workflow feedback loop — inputs, process, outputs, and return paths'),
    alternate: chart('meaning.png', 'Linear workflow — inputs through process to outputs with feedback'),
  },
  evaluator: {
    situations: chart('situations.png', 'Situation decision flow — autonomy, coercion, consent, and law'),
    unforgiveable: chart('unforgiveable.png', 'What makes something unforgivable — betrayal, vulnerability, and duty'),
  },
};

/** @type {Record<string, { primary?: { src: string; alt: string }; related?: { src: string; alt: string }[] }>} */
export const clusterCharts = {
  'honesty-truth': {
    related: [chart('worldview.png', 'Worldview — the world, the self, and the moral task')],
  },
  'autonomy-freedom': {
    primary: chart('autonomy.png', 'Core value autonomy — bodily, reproductive, sexual, and medical refusal'),
    related: [
      chart('society-defaults.png', 'Default society — rejected life scripts and conditional legal obedience'),
      chart('power-analysis.png', 'Power analysis — who has power and why to doubt authority'),
    ],
  },
  'memory-preservation': {},
  'constraint-aware': {
    primary: chart('reality-constraints.png', 'Reality constraints — adaptations and systems you build'),
  },
  'refusal-valid': {
    related: [
      chart('society-defaults.png', 'Default society — rejected as default, self-authored life'),
      chart('power-analysis.png', 'Power analysis — trust consent and harm over status'),
    ],
  },
  'clarity-performance': {},
  'care-action': {
    related: [
      chart('unforgiveable.png', 'Forgiveness framework — betrayal of duty and vulnerability'),
      chart('situations.png', 'Situation ethics flowchart'),
    ],
  },
};

export function chartsForCluster(clusterId) {
  return clusterCharts[clusterId] ?? {};
}
