/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  "moduleFileExtensions": [
    "ts",
    "js",
    "jsx",
    "tsx",
    "json",
    "node"
  ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['./node_modules/'],
  "transform": {
    ".*\\.(vue)$": "@vue/vue3-jest",
    // "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
//  "globalSetup": "/src/tests/setup.js",
};