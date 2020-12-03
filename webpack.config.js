const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
module.exports = (env, agrv) => {
    const isDev = agrv.mode === 'development'
    return {
        entry: ['./src/index.js'],
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.min.css'
            }),
            new webpack.EnvironmentPlugin( { ...process.env } )
        ],
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-class-properties']
                  }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', "less-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[path][name].[ext]'
                    }
                  }
                ]
              }
        ]
        },
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                },
            },
        },
        devtool: isDev ? 'source-map' : false,
        devServer: {
            port: 3001,
            open: true,
            disableHostCheck: true,
            historyApiFallback: true,
            overlay: true,
            stats: 'minimal',
            inline: true,
            compress: true,
            headers: { 
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        },
    }
};