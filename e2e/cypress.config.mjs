// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress'
// eslint-disable-next-line import/no-extraneous-dependencies
import terminalReport from 'cypress-terminal-report/src/installLogsPrinter'

export default defineConfig({
  defaultCommandTimeout: 16000,

  e2e: {
    baseUrl: 'http://localhost:1234',
    specPattern: 'cypress/integration/*.spec.ts',

    // eslint-disable-next-line no-unused-vars
    setupNodeEvents (on, config) {
      // implement node event listeners here
      terminalReport(on)
    },
  },
})
