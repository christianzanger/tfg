const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = [
    {
        name: "minified-js",
        mode: "production",
        entry: {
            'bundles/index-bundle': './src/components/pages/IndexPage.js',
            'bundles/search-bundle': './src/components/pages/SearchPage.js',
            'bundles/stats-bundle': './src/components/pages/StatisticsPage.js',
            'bundles/settings-bundle': './src/components/pages/SettingsPage.js',
            'cookies/Cookie': './public/scripts/cookies/Cookie.js',
            'cookies/SettingsCookie': './public/scripts/cookies/SettingsCookie.js',
            'cookies/StatsCookie': './public/scripts/cookies/StatsCookie.js',
            classicApp: './public/scripts/classicApp.js',
            search: './public/scripts/search.js',
            stats: './public/scripts/stats.js',
        },
        output: {
            path: path.join(__dirname, 'public/minified/scripts/'),
            filename: '[name].min.js'
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
        }
    },
];