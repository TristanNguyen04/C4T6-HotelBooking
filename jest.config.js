const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

// monorepo global jest config file delegating to each test file for client and servert
/** @type {import("jest").Config} **/
module.exports = {
  projects: [
    '<rootDir>/apps/client',
    '<rootDir>/apps/server'
  ],
  coverageProvider: 'babel'
};