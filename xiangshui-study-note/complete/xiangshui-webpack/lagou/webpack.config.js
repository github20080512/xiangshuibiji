const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    //WARNING in configuration
    //The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
    mode: 'development',

    //DevTools 无法加载 SourceMap  ==> devtool: 'source-map'
    devtool: 'source-map',

    //set the entry
    // i don't know what is it meaning (see the md)
    entry: {
        "js/app": './src/app.js'
    },
    //set the output
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name]-[hash:6].js',

    },
    // set plugins
    plugins: [
        new HtmlWebpackPlugin({
            //Keep the content of the original page
            template: path.join(__dirname, './public/index.html'),
            //change the name 'index.html' to '{{filename}}'
            filename: 'index.html',
            // inject: "head" ==> put '<script src="app.js"></script>' into head
            inject: true
        }),
        //copy a file to another place
        new CopyPlugin([{
                from: './public/*.ico',
                //use abosulte path
                to: path.join(__dirname, './dist/favicon.ico'),

            },
            { //copy the whole libs
                from: './public/libs',

                to: path.join(__dirname, './dist/libs'),

            }


        ]),
        //clean the dist before npm run build
        new CleanWebpackPlugin()
    ],

    //art-template-loader
    module: {
        rules: [{
                test: /\.art$/,
                use: {
                    loader: "art-template-loader",
                    //将"<div>content</div>"渲染成html
                    options: {
                        escape: false
                    }
                }
            },
            {
                test: /\.css$/,

                //in the order,first 'css',then put it in 'style'
                loader: ['style-loader', "css-loader"]


            }
        ]
    },
    //webserver
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9000,
        //font-end proxy,another way is back-end cors
        proxy: {
            "/api": {
                target: 'http://localhost:3000'
            }
        }
    },
}