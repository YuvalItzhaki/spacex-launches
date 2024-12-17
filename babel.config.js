module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs' // Ensure modules are transpiled to CommonJS
    ]
  };
  