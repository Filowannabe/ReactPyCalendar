import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react(), EnvironmentPlugin('all')],
  build: { manifest: true },
  base: process.env.mode === "production" ? "/static/" : "/",
  root: "./",
  server: {
    port: 3000,
  },

})
