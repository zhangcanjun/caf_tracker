const webpack = require('webpack');
const join = require('path').join;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FlyingAssetsPlugin = require('flying-assets-webpack-plugin');

const PUBLIC_PATH = `${(process.env.ASSETS_CDN || '/assets')}/`;

module.exports = {

  entry: {
    main: [
      'whatwg-fetch',
      'normalize.css',
      './src/client.js',
    ],
  },

  devtool: 'source-map',

  output: {
    path: join(__dirname, 'dist'),
    publicPath: PUBLIC_PATH,
    filename: '[name]-[hash].js',
  },

  resolve: {
    extensions: [ '.js', '.css', '.scss' ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ],
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].css',
      allChunks: true,
    }),
    new FlyingAssetsPlugin({ json: true }),
  ],

}
