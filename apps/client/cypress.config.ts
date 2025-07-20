import { defineConfig } from 'cypress'
import path from 'path'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: path.resolve('apps/client/vite.config.ts'), // <-- point to your vite config
    },
    specPattern: 'cypress/component/**/*.cy.{ts,tsx,js,jsx}',
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx,js,jsx}',
  },
})
