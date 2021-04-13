const baseConfig = require('./webpack.config.base')
const { merge } = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const default_plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

let config

const devServer = {
  port: '8001',
  host: '0.0.0.0',
  //编译出错显示在网页上
  overlay: {
    errors: true
  },

  hot: true
}

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
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
  resolve: {
    alias: {
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: default_plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
