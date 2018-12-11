const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = [
    {
        name: "general",
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
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }]
        },
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public')
        }
    },
    {
        name: "minified",
        entry: {
            index: './src/components/pages/IndexPage.js',
            search: './src/components/pages/SearchPage.js',
            stats: './src/components/pages/StatisticsPage.js',
            settings: './src/components/pages/SettingsPage.js'
        },
        output: {
            path: path.join(__dirname, 'public/scripts/minified'),
            filename: '[name]-bundle.min.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }]
        },
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public')
        },
        plugins: [
            new MinifyPlugin(),
        ]
    }
];