const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// see more options on https://www.npmjs.com/package/webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: '8000',
  },
  // plugins: [
  //   new BundleAnalyzerPlugin({
  //     analyzerMode: 'server',
  //     analyzerHost: '127.0.0.1',
  //     analyzerPort: '9527',
  //   }),
  // ],
});
