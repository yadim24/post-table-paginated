/* eslint-disable import/no-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/post-table-paginated/',
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3050,
    watch: {
      usePolling: true,
    },
  },
});
