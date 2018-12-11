const path = require('path');

module.exports = {
    entry: {
        index: './src/components/pages/IndexPage.js',
        search: './src/components/pages/SearchPage.js',
        stats: './src/components/pages/StatisticsPage.js',
        settings: './src/components/pages/SettingsPage.js'
    },
    output: {
        path: path.join(__dirname, 'public/scripts/bundles'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
};