const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Config = require('webpack-chain');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const config = new Config();
const dev = new Config();

config
  .entry('app')
    .add(PATHS.app);

config
  .output
    .path(PATHS.build)
    .filename('[name].js');

config.plugin('index.html')
  .use(HtmlWebpackPlugin, [{ title: 'Webpack demo' }]);

dev.devServer
  .historyApiFallback(true)
  .stats('errors-only')
  .host(process.env.HOST)
  .host(process.env.PORT);

module.exports = (env) => {
  config.when(( env !== 'production' ),
    config => config.merge(dev.toConfig())
  );

  return config.toConfig();
};
