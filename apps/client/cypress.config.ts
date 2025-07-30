import { defineConfig } from 'cypress';
import path from 'path';
import jwt from 'jsonwebtoken';
import viteConfig from './vite.config'; // import your vite config here

const JWT_SECRET = process.env.JWT_SECRET || '1234567890';

export default defineConfig({
  component: {
    retries: {
      runMode: 2,
      openMode:2,
    },
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,  // <-- pass imported vite config directly
    },
    specPattern: 'cypress/component/**/*.cy.{ts,tsx,js,jsx}',
  },
  port: 5173,
  e2e: {
    retries: {
      runMode: 2,
      openMode: 2,
    },
    setupNodeEvents(on, config) {
      on('task', {
        generateToken({ uid }: { uid: string }) {
          return jwt.sign({ id: uid }, JWT_SECRET, { expiresIn: '1d' });
        }
      });
    },
    baseUrl: 'http://localhost:5173',
  },
});
