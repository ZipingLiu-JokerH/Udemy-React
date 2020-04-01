module.exports = function override(config, env) {
    if (env !== 'production') {
      config = { ...config, ...{ devtool: 'eval-source-map' } };
    }
    return config;
  }