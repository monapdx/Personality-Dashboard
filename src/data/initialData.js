/** @typedef {{ id: string; title: string; meaning: string; principles: string[]; stressTests: string[]; tools: string[] }} ValueCluster */

/** @typedef {{ id: string; title: string; description: string; clusterId: string | null }} ToolIdeaCard */

/** @type {ValueCluster[]} */
export const defaultClusters = [
  {
    id: 'honesty-truth',
    title: 'Honesty & Truth',
    meaning:
      'Reality-first language without moral framing imposed on edge cases. Name what is true before what is comforting.',
    principles: [
      'Reality-first language',
      'No moral framing',
      'No forced justification',
      'Tell the truth; expose false universals',
      'Memoir & testimony writing',
    ],
    stressTests: [
      'Does this feel evasive?',
      'Does this feel like forced justification?',
      'Does this feel coercive?',
    ],
    tools: [
      'Memoir & testimony writing',
      'Plain-language spec template',
      'Decision journal: what I know vs assume',
    ],
  },
  {
    id: 'autonomy-freedom',
    title: 'Autonomy / Freedom',
    meaning:
      'User sovereignty and local, durable artifacts. You control data, accounts are optional, and portability is non-negotiable.',
    principles: [
      'No required accounts',
      'User controls data',
      'Offline-first formats (PDF / ZIP)',
      'Portable PDFs & downloadable tools',
      'Law cannot override personhood',
      'Bodily sovereignty and right to refuse',
    ],
    stressTests: [
      'Does this feel fragile?',
      'Does this feel coercive?',
      'Is refusal allowed?',
    ],
    tools: [
      'Portable PDFs & downloadable tools',
      'Personal data portability kit',
      'Exit criteria checklist',
    ],
  },
  {
    id: 'memory-preservation',
    title: 'Memory Preservation',
    meaning:
      'Structured containers and navigable archives—systems over sentiment, with explainable structure you can search and reuse.',
    principles: [
      'Tables, grids, schemas',
      'Structured templates & worksheets',
      'Systems over sentiment',
      'Visible structure',
      'Explainable systems — explain how it works',
      'Search, tags, summaries',
    ],
    stressTests: [
      'Does this feel bloated?',
      'Does this feel overwhelming?',
      'Does it help preserve memory?',
    ],
    tools: [
      'Personal archives & dashboards',
      'Memoir theme mapper',
      'Checksum + folder manifest script',
    ],
  },
  {
    id: 'constraint-aware',
    title: 'Constraint-Aware Living',
    meaning:
      'Low-energy usability and resume-safe workflows. Design for real limits—physical, medical, social—and compress effort where you can.',
    principles: [
      'Minimal steps, no urgency',
      'Can pause & resume anytime',
      'Async-friendly workflows',
      'Prefer asynchronous / solo work',
      'Digitize + automate + template',
      'Tooling that compresses effort',
    ],
    stressTests: [
      'Too draining?',
      'Does this feel overwhelming?',
      'Is this honest about real limits?',
    ],
    tools: [
      'Low-energy workflow planner',
      'Repeatable templates',
      'Dashboards + scripts',
      'Systems for self-tracking + archive exploration',
    ],
  },
  {
    id: 'refusal-valid',
    title: 'Refusal is Valid',
    meaning:
      'Optionality and exit paths are first-class. Skip answers, reject default life scripts, and doubt authority that overrides consent.',
    principles: [
      'Optionality & exit paths',
      'Skip / blank answers allowed',
      'Non-extractive forms',
      'Rejected as default — self-authored life',
      'Trust consent, honesty, and actual harm over status',
    ],
    stressTests: [
      'Does this feel coercive?',
      'Is refusal allowed?',
      'Does this feel like forced justification?',
    ],
    tools: [
      'Non-extractive form builder',
      'Boundary phrase bank',
      'Values-based decline templates',
    ],
  },
  {
    id: 'clarity-performance',
    title: 'Clarity over Performance',
    meaning:
      'Cognitive load reduction over ornament. Plain typography, contrast, and structures you can parse when tired.',
    principles: [
      'Cognitive load reduction',
      'Plain typography & contrast',
      'Prefer plain structure to ornate dashboards',
      'Document the “why” once',
    ],
    stressTests: [
      'Is it clear?',
      'Does this feel like forced justification?',
      'Am I performing competence?',
    ],
    tools: [
      'README-first project rule',
      'One-page architecture sketches',
      '“Explain to future tired me” notes',
    ],
  },
  {
    id: 'care-action',
    title: 'Care as Action',
    meaning:
      'Built-in safety before content. Protect the vulnerable, filter trauma-aware defaults, and judge harm by power and consent.',
    principles: [
      'Built-in safety',
      'Safety before content',
      'Dog-safe & trauma-aware filters',
      'Protect the vulnerable',
      'Judge by consequences, honesty, and power dynamics',
    ],
    stressTests: [
      'Does this feel unsafe?',
      'Does this feel coercive?',
      'Who does this protect or exclude?',
    ],
    tools: [
      'Trauma-aware content filter',
      'Accessibility pass checklist',
      'Situation ethics reference flow',
    ],
  },
];

/** @type {{ inputs: string[]; process: string[]; outputs: string[] }} */
export const defaultWorkflow = {
  inputs: [
    'Personal archives (Gmail / Takeout / chats)',
    'Life themes + essays',
    'UI inspiration screenshots / templates',
    'Problem: make meaning + make tools',
  ],
  process: [
    'Extract data',
    'Structure: tags, taxonomies, schemas',
    'Build: Python / Streamlit + front-end widgets',
    'Design polish: typography, grids, gradients',
    'Package: README, naming conventions, distribution',
  ],
  outputs: [
    'Dashboards + analyzers',
    'Templates + ebooks',
    'Repos + product drops',
    'Identity maps (like this)',
  ],
};

/** @type {ToolIdeaCard[]} */
export const defaultToolIdeas = [
  {
    id: 'ti-archive-dash',
    title: 'Personal archive dashboard',
    description:
      'Local-first viewer for notes and media with faceted tags, integrity checks, and export bundles.',
    clusterId: 'memory-preservation',
  },
  {
    id: 'ti-memoir-map',
    title: 'Memoir theme mapper',
    description:
      'Graph recurring life themes across journals; link excerpts to values for long-form writing.',
    clusterId: 'memory-preservation',
  },
  {
    id: 'ti-low-energy',
    title: 'Low-energy workflow planner',
    description:
      'Plans tasks by spoon levels; surfaces tiny next steps and refusal-friendly deferrals.',
    clusterId: 'constraint-aware',
  },
  {
    id: 'ti-non-extractive',
    title: 'Non-extractive form builder',
    description:
      'Collect only necessary fields; explicit retention; easy delete/export for respondents.',
    clusterId: 'refusal-valid',
  },
  {
    id: 'ti-trauma-filter',
    title: 'Trauma-aware content filter',
    description:
      'Keyword / tone filters for feeds with pause rituals and “safe mode” reading layouts.',
    clusterId: 'care-action',
  },
  {
    id: 'ti-portable-export',
    title: 'Portable PDF / ZIP generator',
    description:
      'One-click packs of essays, assets, and manifests for offline sharing or archival.',
    clusterId: 'autonomy-freedom',
  },
  {
    id: 'ti-values-eval',
    title: 'Values-based project evaluator',
    description:
      'Score ideas against autonomy, clarity, safety, and refusal—like this app’s evaluator, but exportable.',
    clusterId: 'clarity-performance',
  },
];

export const STORAGE_KEY = 'identity-core-v2';

export const evaluatorCriteria = [
  { id: 'autonomy', label: 'Does it preserve autonomy?', hint: 'Exit paths, consent, low manipulation' },
  { id: 'lowEnergy', label: 'Is it low-energy usable?', hint: 'Defaults, small steps, forgiving UX' },
  { id: 'portable', label: 'Is it portable?', hint: 'Open formats, exports, minimal vendor lock-in' },
  { id: 'refusal', label: 'Is refusal allowed?', hint: 'Boundaries respected without penalty' },
  { id: 'clarity', label: 'Is it clear?', hint: 'Plain language, obvious next actions' },
  { id: 'safety', label: 'Is it safe?', hint: 'Harm reduction, privacy, emotional risk' },
  { id: 'memory', label: 'Does it help preserve memory?', hint: 'Archives, provenance, durable records' },
];
