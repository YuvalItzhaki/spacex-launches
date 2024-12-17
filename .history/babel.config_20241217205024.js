module.exports = {
    presets: [
      '@babel/preset-env', // Handles modern JavaScript features
      '@babel/preset-react', // React support
      '@babel/preset-typescript', // TypeScript support
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs', // Convert ESM to CommonJS for Jest
    ],
  };
  