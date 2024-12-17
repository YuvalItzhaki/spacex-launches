module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest', // Handle JS files if necessary
  },
  transformIgnorePatterns: [
    'node_modules/(?!your-es6-dependencies)', // if you need to transpile some node_modules
  ],
};
