const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vue-view-lazy.min.js',
        library: `vViewLazy`,
        // libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()//代码压缩
    ],
    devtool: 'source-map',
};