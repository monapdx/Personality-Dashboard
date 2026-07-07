# Identity Core

**Identity Core** is a browser-based personal identity dashboard. It turns a philosophy map—values at the center, clusters around it—into a structured workspace you can search, edit, and stress-test without a server.

## What you get

- **Identity map** — Interactive layout with **Identity Core** at the center and value clusters branching out. Tap a cluster for a readable summary; open the editor when you want to change copy, principles, stress tests, or suggested tools.
- **Principles library** — All principles in one searchable list, filterable by cluster.
- **Workflow builder** — Inputs → process → outputs, plus a described feedback loop. Lists are editable so the pipeline matches how you actually work.
- **Tool ideas** — Cards for possible products or utilities tied to clusters (add, edit, delete).
- **Project evaluator** — Describe a project and rate it on autonomy, low-energy use, portability, refusal, clarity, safety, and memory preservation. You receive a scorecard and concrete suggestion prompts.

Data is **local-first**: it persists in `localStorage` under the key `identity-core-v1`. Use **Export JSON** for backups, **Import JSON** to restore or merge (import replaces clusters, workflow, and tool ideas with the file’s contents), and **Export Markdown** for a human-readable snapshot suitable for notes or repos.

## Tech stack

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 5
- No backend; no accounts

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build   # production bundle in dist/
npm run preview # serve dist locally
```

## Editing the model

Starter content lives in `src/data/initialData.js`, aligned with the mermaid charts in `mermaid-charts/`. Those PNGs sync into `public/mermaid-charts/` on `dev`/`build` and are mapped in `src/data/chartImages.js`. In the app you can:

- Add or delete **value clusters** from the Identity map section.
- Edit titles, meanings, **principles**, **stress test questions**, and **suggested tools** per cluster.
- Edit **workflow** steps in the Workflow builder.
- Manage **tool idea** cards in Tool ideas.

The five “core probes” (coercive, fragile, overwhelming, unsafe, forced justification) are listed in the cluster editor as reusable prompts; individual clusters can include them or tailor their own list.

## Project layout

```
src/
  App.jsx                 # Shell, navigation, footer
  App.css                 # Shared layout + utilities
  index.css               # Theme tokens + base styles
  main.jsx
  context/IdentityContext.jsx   # State + localStorage sync
  data/initialData.js     # Sample clusters, workflow, tool ideas, evaluator labels
  data/chartImages.js     # Maps mermaid chart PNGs to sections and clusters
  components/             # Feature sections + modals
  utils/ids.js
  utils/markdownExport.js
```

## Design intent

The UI uses a **dark**, high-contrast base with **neo-brutalist** cues: thick borders, hard shadows, no soft gradients. Accents (**hot pink**, **electric lime**, **lavender**) are used sparingly for hierarchy and energy. Typography is large and readable; layouts are **card-based** and **responsive** (the map collapses to a grid on small screens).

## License

MIT — use and adapt for personal systems freely.
