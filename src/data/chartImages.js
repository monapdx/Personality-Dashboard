import { assetUrl } from '../utils/assetUrl';

const CHART_ROOT = 'charts-graphs';

/** @param {string} file Filename inside /charts-graphs */
export function chart(file, alt) {
  return { src: assetUrl(`${CHART_ROOT}/${file}`), alt, file };
}

export const sectionCharts = {
  identityMap: {
    core: chart('Identity Core.png', 'Identity Core value map — seven clusters branching from Identity Core: Ash'),
    kernel: chart('Identity Kernel.png', 'Identity kernel — values, aspirations, mission, goals, beliefs, and standards'),
    framework: chart('moral-framework.png', "Ashly's moral framework — justice, autonomy, harm, truth, and loyalty"),
  },
  workflow: {
    primary: chart('Feedback Loop.png', 'Workflow feedback loop — inputs, process, outputs, and return paths'),
    alternate: chart('meaning.png', 'Linear workflow — inputs through process to outputs with feedback'),
  },
  evaluator: {
    situations: chart('situations.png', 'Situation decision flow — autonomy, coercion, consent, and law'),
    unforgiveable: chart('unforgiveable.png', 'What makes something unforgivable — betrayal, vulnerability, and duty'),
  },
};

/** @type {Record<string, { primary?: { src: string; alt: string; file: string }; related?: { src: string; alt: string; file: string }[] }>} */
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
    primary: chart('Reality Constraints.png', 'Reality constraints — adaptations and systems you build'),
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

/** Browseable gallery groups — filenames match /charts-graphs on disk. */
export const galleryGroups = [
  {
    id: 'identity-system',
    title: 'Identity system diagrams',
    description: 'Philosophy maps, moral frameworks, and value-cluster detail charts.',
    charts: [
      chart('Identity Core.png', 'Identity Core — full value map'),
      chart('Identity Kernel.png', 'Identity kernel structure'),
      chart('moral-framework.png', 'Moral framework pillars'),
      chart('worldview.png', 'Worldview — the world, the self, the moral task'),
      chart('autonomy.png', 'Autonomy value cluster'),
      chart('Reality Constraints.png', 'Reality constraints and adaptations'),
      chart('Feedback Loop.png', 'Creative workflow feedback loop'),
      chart('meaning.png', 'Linear meaning-making workflow'),
      chart('situations.png', 'Situation ethics flowchart'),
      chart('unforgiveable.png', 'Forgiveness and moral failure'),
      chart('society-defaults.png', 'Default society and self-authored life'),
      chart('power-analysis.png', 'Power analysis'),
    ],
  },
  {
    id: 'personality',
    title: 'Personality & working style',
    description: 'Trait profiles and how you think, engage, and apply yourself.',
    charts: [
      chart('big-5-traits.png', 'Big Five (OCEAN) trait percentiles'),
      chart('top-traits.png', 'Highest-ranked traits'),
      chart('mid-traits.png', 'Mid-ranked traits'),
      chart('bottom-traits.png', 'Lowest-ranked traits'),
      chart('fears.png', 'Core fears profile'),
      chart('how-you-think.png', 'How you prefer to think'),
      chart('how-you-engage.png', 'How you prefer to engage'),
      chart('how-you-apply-yourself.png', 'How you prefer to apply yourself'),
    ],
  },
  {
    id: 'assessments',
    title: 'Assessment snapshots',
    description: 'Saved results from quizzes and political / aesthetic inventories.',
    charts: [
      chart('8-values-political-test.png', '8 Values political test'),
      chart('politiscales.png', 'PolitiScales results'),
      chart('isms-survey.png', 'Dictionary-based isms survey'),
      chart('feminism-test.png', 'Feminism test (5-scale)'),
      chart('vibe-shift-test.png', 'Vibe shift test'),
      chart('talent-compass.png', 'Talent compass results'),
      chart('aesthetic-quiz.png', 'Aesthetic quiz results'),
      chart('red-flag-test.png', 'Red flag test results'),
      chart('profile-visual.png', 'Additional profile visual'),
    ],
  },
];

export function chartsForCluster(clusterId) {
  return clusterCharts[clusterId] ?? {};
}
