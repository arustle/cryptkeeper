const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './app/App.entry',
    coinigy: './coinigyApp/Coinigy.entry',
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'devServerBuild/public/webpack-builds'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:8092/public/webpack-builds',
  },
  // externals: {
  //   sequelize: 'require(\'sequelize\')',
  // },
  devServer: {
    // --port 8090 --hot --inline --history-api-fallback --content-base devServerBuild/
    port: 8092,
    hot: true,
    historyApiFallback: true,
    contentBase: 'devServerBuild/',
  },
  module: {
    rules: [
      // { enforce: 'pre', test: /\.jsx$/, loader: 'eslint-loader', exclude: /node_modules/ },

      { test: /\.jsx$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      // { test: /\.jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.(png|jpg)$/, loader: 'file-loader' },
      {
        test: /\.global.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      // { test: /\.css$/, loader: 'style!css' },
      // {
      //   test: /\.css$/,
      //   loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      // },
      {
        test: /\.styles.css|cssmodules.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'],
        }),
      },

    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        browser: true,
        NODE_ENV: JSON.stringify('development'),
        COIN_API_KEY: JSON.stringify('[get API KEY from https://www.coinapi.io/]'),
        COINIGY_API_KEY: JSON.stringify('[requires Coinigy account]'),
        COINIGY_API_SECRET: JSON.stringify('[requires Coinigy account]'),
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
    }),
  ],
};
