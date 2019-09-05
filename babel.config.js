module.export = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
  ],
};
