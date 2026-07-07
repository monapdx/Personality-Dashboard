/** @type {Record<string, { border: string; tint: string; label: string }>} */
export const clusterColors = {
  'honesty-truth': {
    border: '#ff2d92',
    tint: 'rgba(255, 45, 146, 0.14)',
    label: 'Honesty & Truth',
  },
  'autonomy-freedom': {
    border: '#c8ff4a',
    tint: 'rgba(200, 255, 74, 0.12)',
    label: 'Autonomy / Freedom',
  },
  'memory-preservation': {
    border: '#c4a7e7',
    tint: 'rgba(196, 167, 231, 0.14)',
    label: 'Memory Preservation',
  },
  'constraint-aware': {
    border: '#5ec8ff',
    tint: 'rgba(94, 200, 255, 0.12)',
    label: 'Constraint-Aware Living',
  },
  'refusal-valid': {
    border: '#ffb347',
    tint: 'rgba(255, 179, 71, 0.12)',
    label: 'Refusal is Valid',
  },
  'clarity-performance': {
    border: '#fff44f',
    tint: 'rgba(255, 244, 79, 0.1)',
    label: 'Clarity over Performance',
  },
  'care-action': {
    border: '#7cf7b8',
    tint: 'rgba(124, 247, 184, 0.12)',
    label: 'Care as Action',
  },
};

const fallback = {
  border: '#f4f4f5',
  tint: 'rgba(244, 244, 245, 0.08)',
  label: 'Other',
};

export function getClusterColor(clusterId) {
  return clusterColors[clusterId] ?? fallback;
}

export function clusterCardStyle(clusterId) {
  const { border, tint } = getClusterColor(clusterId);
  return {
    borderColor: border,
    boxShadow: `6px 6px 0 ${border}`,
    background: `linear-gradient(135deg, var(--surface) 70%, ${tint} 100%)`,
  };
}

export function clusterTagStyle(clusterId) {
  const { border, tint } = getClusterColor(clusterId);
  return {
    borderColor: border,
    background: tint,
    color: border,
  };
}
