const webpack = require('webpack');
const path = require('path');
const envFile = require('node-env-file');

const autoprefixer = require('autoprefixer');
const cssVars = require('postcss-simple-vars');
const easyImport = require('postcss-easy-import');
const hexRgba = require('postcss-hexrgba');
const mixins = require('postcss-mixins');
const nested = require('postcss-nested');
const sugarss = require('sugarss');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body',
});
const ExtractSugarss = new ExtractTextPlugin({
  filename: 'style.css',
});

const easyImportConfig = {
  extensions: ['.sss'],
  prefix: '_',
};
const postcssPlugins = [
  easyImport(easyImportConfig),
  mixins,
  cssVars,
  nested,
  hexRgba,
  autoprefixer,
];

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, `config/${process.env.NODE_ENV}.env`));
} catch (e) {
  //
}

const babelSettings = {
  presets: ['react', 'es2015', 'stage-2'],
};

module.exports = {
  entry: [
    './app/app.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
      },
    }),
    HtmlWebpackPluginConfig,
    ExtractSugarss,
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, './app/api'),
      path.resolve(__dirname, './app/components'),
      'node_modules',
    ],
    alias: {
      app: path.resolve(__dirname, 'app'),
      actions: path.resolve(__dirname, 'app/actions/actions.js'),
      styles: path.resolve(__dirname, 'app/styles/app.sss'),
      configureStore: path.resolve(__dirname, 'app/store/configureStore.js'),
      reducers: path.resolve(__dirname, 'app/reducers/reducers.js'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        `babel-loader?${JSON.stringify(babelSettings)}`,
        'eslint-loader',
      ],
      exclude: /node_modules/,
    }, {
      test: /\.sss$/,
      use: ExtractSugarss.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: {
            parser: sugarss,
            plugins: () => postcssPlugins,
            sourceMap: true,
          },
        }],
      }),
      exclude: /node_modules/,
    }],
  },
  externals: {
    // these lines are required for Enzyme
    'react/addons': true,
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
  },
  devtool: 'cheap-module-eval-source-map',
};
