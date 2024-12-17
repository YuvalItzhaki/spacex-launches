module.exports = {
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/__mocks__/styleMock.js', // Mock CSS imports
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest', // Add this line to handle JS files
  },
  transformIgnorePatterns: [
    'node_modules/(?!your-es6-dependencies)', // If you need to transpile some node_modules
  ],
};
