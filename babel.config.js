module.export = {
  presets: [['@babel/preset-env', { targets: { node: '12.10' } }]],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
