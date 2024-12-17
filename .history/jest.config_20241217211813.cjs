module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest', // Add this line to handle JS files
  },
  transformIgnorePatterns: [
    'node_modules/(?!your-es6-dependencies)', // If you need to transpile some node_modules
  ],
};
