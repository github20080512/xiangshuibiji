//https://github.com/lurongtao/gp-145-lagou-admin/blob/master/front-end/package.json
    # issue
1. webpack 5 can't  excute  change es6  to es5 completely,should use webpack4（npm i webpack@4.44.2;webpack-cli@3.3.12）
2. WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.(set mode in webpack.config.js )
3. html-webpack-plugin => Cannot read property 'tap' of undefined
    ## solution:
    set "html-webpack-plugin": "^4.0.0-alpha" => "4.0.0-alpha"
    remove node_modules
    remove package-lock.json
    npm install
4. because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checkin
    1 前言

    浏览器报错误（chrome和firefox都会）：because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checkin...

    2 解决方案


    <link rel="stylesheet" href="../../../Static/css/common/common.css" media="all">
    
    //删除rel属性或者删除rel和media属性都可以,改为如下：
    <link href="../../../Static/css/common/common.css" media="all">
    <link href="../../../Static/css/common/common.css">
    3 小结

    同时也会伴随JS不支持等，解决了CSS问题，JS警告也就会消失。如果资源找不到，又在Linux系统上，主要路径大小写问题。

# order
1. npm i -y
2. npm install webpack@4.44.2 -D
3. npm installwebpack-cli@3.3.12 -D
4. npm view webpack versions


5. npm i html-webpack-plugin -D
6. npm i webpack-dev-server -D
7. 

# detail
new HtmlWebpackPlugin({template:path.join(__dirname,'./public/index.html')})

# i don't know what is it meaning (see the md)
1. in the dist,there is a js file 'app.js',let it in in the path 'dist/js/app.js'  =>
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'app.js'
    },
    ==>
    entry: {
        'js/app': './src/app.js'
    },
      output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },

# sourse
http://adminlte.xueyao.org/pages/login.html

some usefull npms:
randomstring

code:
https://gitee.com/lurongtao/felixlu-course-gp21/blob/master/Node.js/lagou-admin/frontend/src/controllers/signin.js


# module
module.exports
exports.fn

export {
    remove
}