const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Config = require('webpack-chain');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const { host, port } = process.env;

const config = new Config();

config
  .entry('app')
    .add(PATHS.app);

config
  .output
    .path(PATHS.build)
    .filename('[name].js');

config.plugin('index.html')
  .use(HtmlWebpackPlugin, [{ title: 'Webpack demo' }]);

module.exports = (env) => {
  config.when(( env === 'production'),
    config => {
      parts.extractCSS(config);
    })
  .when(( env !== 'production' ),
    config => {
      parts.loadCSS(config);
      parts.devServer(config, { host, port });
    });

  return config.toConfig();
};
