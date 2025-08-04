import { defineConfig } from 'cypress';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
    component: {
        retries: {
            runMode: 2,
            openMode: 2,
        },
        devServer: {
            framework: 'react',
            bundler: 'vite',
            viteConfig: {
                configFile: fileURLToPath(new URL('./vite.config.ts', import.meta.url)),
            },
        },
        specPattern: 'cypress/component/**/*.cy.{ts,tsx,js,jsx}',
    },
    e2e: {
        // retries: {
        //   runMode: 2,
        //   openMode: 2,
        // },
        baseUrl: 'http://localhost:5173',
    },
});
//# sourceMappingURL=cypress.config.js.map