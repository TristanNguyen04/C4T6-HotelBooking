import { defineConfig } from 'cypress';
import path from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '1234567890';

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
    setupNodeEvents(on, config) {
      on('task', {
        generateToken({ uid }: { uid: string }) {
          return jwt.sign({ id: uid }, JWT_SECRET, { expiresIn: '1d' });
        }
      });
    },
    baseUrl: 'http://localhost:5173',
  },
})
