const path = require("path");
const vueLoaderOptions = require("./vue-loader.config")
const isDev = process.env.NODE_ENV === "development";

const config = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:8000/public/'
  },
  module: {
    rules: [    // 规则
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderOptions(isDev)
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,  // 文件小于1024字节，转换成base64编码，写入文件里面
              name: 'resources/[path][name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }

}


module.exports = config;
