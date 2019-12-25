const path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 导入清除插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        // webpack 如何输出结果的相关选项
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, "../dist"),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    //模块解析
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "../src")
        },
        extensions: [".js", ".json", ".vue"]
    },
    module: {
        rules: [
            //vue
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            //css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader']
                })
            },
            //less
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'less-loader']
                })
            },
            //img
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: "./images/",
                            outputPath: "images"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style/style.css"),
        // 调用清除打包目录插件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './plugin/index.html' }),
        new VueLoaderPlugin()
    ]
}