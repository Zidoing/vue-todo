const baseConfig = require("./webpack.config.base");
const {merge} = require("webpack-merge");
const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const ExtractPlugin = require("extract-text-webpack-plugin")


const isDev = process.env.NODE_ENV === 'development';


const default_plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, "template.html")
  })
]

let config;

const devServer = {
  port: '8000',
  host: '0.0.0.0',
  //编译出错显示在网页上
  overlay: {
    errors: true
  },
  historyApiFallback: {
    index: '/public/index.html'
  },
  hot: true
};

if (isDev) {
  config = merge(baseConfig, {
    devtool: "#cheap-module-eval-source-map",
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        },
      ]
    },
    devServer,
    plugins: default_plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })


} else {

  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]

          })
        }
      ]
    },
    plugins: [
      new ExtractPlugin("styles.[contentHash:8].css"),

    ]
  })

}

module.exports = config;
