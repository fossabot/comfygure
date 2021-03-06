const path = require('path');
const slsw = require('serverless-webpack');
const ConfigWebpackPlugin = require('config-webpack');

module.exports = {
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    target: 'node',
    entry: slsw.lib.entries,
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, '.webpack'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
        noParse: [/pg\/lib\/native/],
    },
    externals: ['aws-sdk'],
    plugins: [
        new ConfigWebpackPlugin(),
    ],
    optimization: {
        minimize: false,
    },
    performance: {
        hints: false,
    },
};
