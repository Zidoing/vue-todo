const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const ExtractPlugin = require("extract-text-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.join(__dirname, 'client/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [    // 规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,  // 文件小于1024字节，转换成base64编码，写入文件里面
                            name: '[name]-output.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]

}

if (isDev) {

    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    });

    config.devtool = "#cheap-module-eval-source-map";
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',
        //编译出错显示在网页上
        overlay: {
            errors: true
        },

        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
} else {
    config.entry = {
        app: path.join(__dirname, 'client/index.js'),
        vendor: ['vue']
    }

    config.output.filename = '[name].[chunkhash:8].js'


    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
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
    });
    config.plugins.push(
        new ExtractPlugin("styles.[contentHash:8].css"),


    );


}

module.exports = config;
