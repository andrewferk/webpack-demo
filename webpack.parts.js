exports.devServer = (config, { host, port } = {}) =>
  config.devServer
    .historyApiFallback(true)
    .stats('errors-only')
    .host(host)
    .host(port);
