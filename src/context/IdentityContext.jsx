import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  STORAGE_KEY,
  defaultClusters,
  defaultToolIdeas,
  defaultWorkflow,
} from '../data/initialData';

const IdentityContext = createContext(null);

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function IdentityProvider({ children }) {
  const [clusters, setClusters] = useState(() => {
    const saved = loadState();
    return saved?.clusters ?? defaultClusters;
  });
  const [workflow, setWorkflow] = useState(() => {
    const saved = loadState();
    return saved?.workflow ?? defaultWorkflow;
  });
  const [toolIdeas, setToolIdeas] = useState(() => {
    const saved = loadState();
    return Array.isArray(saved?.toolIdeas) ? saved.toolIdeas : defaultToolIdeas;
  });

  useEffect(() => {
    try {
      const payload = JSON.stringify({ clusters, workflow, toolIdeas });
      localStorage.setItem(STORAGE_KEY, payload);
    } catch (err) {
      console.error('Identity Core: could not save to localStorage', err);
    }
  }, [clusters, workflow, toolIdeas]);

  const resetToSample = useCallback(() => {
    setClusters(structuredClone(defaultClusters));
    setWorkflow(structuredClone(defaultWorkflow));
    setToolIdeas(structuredClone(defaultToolIdeas));
  }, []);

  const importPayload = useCallback((obj) => {
    if (!obj || typeof obj !== 'object') throw new Error('Invalid file');
    if (Array.isArray(obj.clusters)) setClusters(obj.clusters);
    if (obj.workflow && typeof obj.workflow === 'object') {
      setWorkflow({
        inputs: Array.isArray(obj.workflow.inputs) ? obj.workflow.inputs : defaultWorkflow.inputs,
        process: Array.isArray(obj.workflow.process) ? obj.workflow.process : defaultWorkflow.process,
        outputs: Array.isArray(obj.workflow.outputs) ? obj.workflow.outputs : defaultWorkflow.outputs,
      });
    }
    if (Array.isArray(obj.toolIdeas)) setToolIdeas(obj.toolIdeas);
  }, []);

  const value = useMemo(
    () => ({
      clusters,
      setClusters,
      workflow,
      setWorkflow,
      toolIdeas,
      setToolIdeas,
      resetToSample,
      importPayload,
    }),
    [clusters, workflow, toolIdeas, resetToSample, importPayload]
  );

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>;
}

export function useIdentity() {
  const ctx = useContext(IdentityContext);
  if (!ctx) throw new Error('useIdentity must be used within IdentityProvider');
  return ctx;
}
