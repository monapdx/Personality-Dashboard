import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IdentityProvider } from './context/IdentityContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IdentityProvider>
      <App />
    </IdentityProvider>
  </StrictMode>
);
