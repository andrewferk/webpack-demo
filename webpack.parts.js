
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = (config, { host, port } = {}) =>
  config.devServer
    .historyApiFallback(true)
    .stats('errors-only')
    .host(host)
    .host(port);

exports.lintJS = config =>
  config.module
    .rule('lintJS')
      .test(/\.js$/)
      .enforce('pre')
      .use('eslint')
        .loader('eslint-loader?emitWarning');

exports.loadCSS = (config, { include = [], exclude = [] } = {}) =>
  config.module
    .rule('loadCSS')
      .test(/\.css$/)
      .merge({ include, exclude })
      .use('style')
        .loader('style-loader').end()
      .use('css')
        .loader('css-loader?modules');

exports.extractCSS = (config, { include = [], exclude = [] } = {}) => {
  config.plugin('extract-text')
    .use(ExtractTextPlugin, [{ filename: '[name].css' }]);

  return config.module
    .rule('extractCSS')
      .test(/\.css$/)
      .merge({ include, exclude,
        // ExtractTextPlugin doesn't work nice with webpack-chain,
        // so using merge is possible the best solution right now.
        // https://github.com/mozilla-neutrino/webpack-chain/issues/20
        use: ExtractTextPlugin.extract({
          use: 'css-loader?modules',
          fallback: 'style-loader',
        }),
      });
};
