import { defineConfig } from 'cypress';
import path from 'path';

export default defineConfig({
  component: {
    retries: {
      runMode: 2,
      openMode:2,
    },
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: path.resolve('apps/client/vite.config.ts'),
    },
    specPattern: 'cypress/component/**/*.cy.{ts,tsx,js,jsx}',
  },
  e2e: {
    retries: {
      runMode: 2,
      openMode: 2,
    },
    baseUrl: 'http://localhost:5173',
  },
});
