exports.devServer = (config, { host, port } = {}) =>
  config.devServer
    .historyApiFallback(true)
    .stats('errors-only')
    .host(host)
    .host(port);

exports.loadCSS = (config, { include = [], exclude = [] } = {}) =>
  config.module
    .rule('loadCSS')
      .test(/\.css$/)
      .merge({ include, exclude })
      .use('style')
        .loader('style-loader').end()
      .use('css')
        .loader('css-loader')
        .options({ modules: true });
