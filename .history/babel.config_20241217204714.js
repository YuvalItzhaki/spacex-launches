module.exports = {
    presets: [
      '@babel/preset-env', // For modern JavaScript
      '@babel/preset-react', // If you're using React
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs', // Transform ESM to CommonJS for Jest
    ],
  };
  
  