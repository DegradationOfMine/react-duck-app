const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
//
const {getIfUtils, removeEmpty} = require('webpack-config-utils');
const dotenv = require('dotenv').config({path: __dirname + '/.env', systemvars: true});
const {ifProduction, ifNotProduction, ifDevelopment} = getIfUtils(process.env);
const server = `http://${dotenv.parsed.APP_WEBPACK_HOST}:${dotenv.parsed.APP_WEBPACK_PORT}`;

module.exports = {
    mode: ifProduction('production', 'development'),
    entry: {
        app: removeEmpty([
            "@babel/polyfill",
            // fix HMR in IE
            ifNotProduction('eventsource-polyfill'),
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint
            // it enable HMR from external devices
            ifNotProduction(`webpack-dev-server/client?${server}`),
            "./src/index.js"
        ]),
    },
    devServer: {
        disableHostCheck: true,
        host: dotenv.parsed.APP_WEBPACK_HOST,
        port: dotenv.parsed.APP_WEBPACK_PORT,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: true,
        overlay: true,
        compress: true,
        hot: ifDevelopment(true, false),
        publicPath: '/',
        contentBase: path.resolve(__dirname, 'src/public'),
        watchContentBase: true,
        stats: 'normal'

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            automaticNameDelimiter: '.',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    priority: 1,
                    minChunks: 2,
                    enforce: true,
                    reuseExistingChunk: true
                },
                app: {
                    test: /[\\/]src[\\/]/,
                    chunks: "initial",
                    priority: 2,
                    minChunks: 2,
                    minSize:0,
                },
                default: false
            }
        },
        minimize: ifProduction(true, false),
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                exclude: /\/node_modules/,
                uglifyOptions: {
                    mangle: true,
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true,
                        drop_debugger: true,
                    },
                    output: {
                        comments: false,
                        beautify: false
                    }
                },
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { cacheDirectory: ifNotProduction() }
                    }
                ],
            },
            {
                test: /\.(sc|c)ss$/,
                exclude: /node_modules/,
                use: removeEmpty([
                    ifProduction(MiniCssExtractPlugin.loader),
                    ifNotProduction("style-loader"),
                    "css-loader",
                    "sass-loader",
                ]),
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: ifProduction('assets/images/[name].[hash:8].[ext]', '[name].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "image/svg+xml",
                            name: ifProduction('assets/svg/[name].[hash:8].[ext]', '[name].[ext]')
                        }
                    }
                ],
            },
            {
                test: /\.eot(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/vnd.ms-fontobject',
                            name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
                        }
                    }
                ],
            },
            {
                test: /\.otf(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'font/opentype',
                            name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream',
                            name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
                        }
                    }
                ],
            },
            {
                test: /\.woff(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff',
                            name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
                        }
                    }
                ],
            },
            {
                test: /\.woff2(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff2',
                            name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
                        }
                    }
                ],
            }
        ],
    },
    plugins: removeEmpty([
        // share some system and env vars with the build
        new webpack.DefinePlugin({'process.env': {
                NODE_ENV: ifProduction('production', 'development'),
                ...dotenv.parsed
            }}),
        new webpack.LoaderOptionsPlugin({
            minimize: ifProduction(),
            debug: ifNotProduction(),
        }),
        // allow hot module replacement
        ifDevelopment(new webpack.HashedModuleIdsPlugin()),
        // show some statistic
        ifDevelopment(new Visualizer({ filename: path.resolve(__dirname, 'src/public/statistics.html') })),
        // html optimization and minification
        new HtmlWebpackPlugin({
            chunksSortMode: 'dependency',
            inject: true,
            template: path.resolve(__dirname, 'src/public/index.html'),
            favicon: path.resolve(__dirname, 'src/public/favicon.ico'),
            minify: ifProduction({
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            })
        }),
        // css optimization and minification
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/public/assets'),
                to: path.resolve(__dirname, 'dist/assets'),
            },
        ]),
        new InlineManifestWebpackPlugin()
    ])
};