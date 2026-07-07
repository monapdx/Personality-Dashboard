import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://monapdx.github.io/Personality-Dashboard/
export default defineConfig({
  base: '/Personality-Dashboard/',
  plugins: [react()],
});
