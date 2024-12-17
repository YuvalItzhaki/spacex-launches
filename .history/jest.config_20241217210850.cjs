module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    setupFiles: ['<rootDir>/jest.setup.cjs'],
  };
  