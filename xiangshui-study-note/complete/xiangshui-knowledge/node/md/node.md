# start
1. **cmd type** 
   node --version
2. ** read file**
   1.   ```var fs=require('fs')
        fs.readFile('./hello.txt',function(err,data){console.log(data.toString())})
        ```
#  require
      模块内外是访问不到方法、 变量；可以通过export.方法 export.变量来作接口  

## url
decodeURI  
decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。

# ip 端口号
ip 是具体的物理网址 端口是该ip下电脑的软件。 
utf8 国际通用编码
中文操作系统默认是gbk

res.setHeader('Content-Type','text/plain;charset=utf-8') plain 普通文本
res.setHeader('Content-Type','text/html;charset=utf-8')  html 浏览器自动识别标签，并识别汉字
Content-Type 查询
https://tool.oschina.net/commons


# exports moudle.exports
默认导出的是 moudle.exports
exports = moudle.exports =默认对象
exports="kkkk"  与默认对象脱离指针
```javascript

      moudle.exports={
            a:1
      }
      exports.foo="bar" //不起作用
      exports= moudle.exports //需要重新赋值，才可以使用exports



```

# express
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
## 路由
```javascript
app.get('/', (req, res) => {
  res.send('Hello momeny!')
})
```

## 静态资源
```javascript
app.use('/public/',express.static('./public/'))
```


# nodemon
```javascript
npm install --global nodemon
nodemon app.js

```

# mongo

## issue 
1. 安装MongoDB出现 service MongoDB failed to start，verify that you have sufficient privileges to start
   =>
   close 360
## steps

1.cmd 切换到mongodb 安装目录中\bin>

2.type 'mongod' 开启数据库
3.再开个cmd 切到安装目录\bin Mongo ,type 'mongo'
show dbs
use name  //name is db's name,type to switch to it

 show collections
 db.students.find()
 db.dropDatabase() // delete the db


db.cats.insertOne("name":"jay chou")  


mongoose实现数据增删改查
 https://www.jianshu.com/p/fe842fab1950

# path
path.parse()
path.join("c:/","b","c")
__dirname
__filename

```
var path = require("path")
console.log(path.resolve(__dirname, "../"))

```

**Push items into mongo array via mongoose**
https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose#


# nmp
1.lodash 功能大全


# npm



npm root -g

npm config get cache
npm config get prefix
npm config list
https://blog.csdn.net/niuba123456/article/details/81834889


## npm
  老师视频笔记：
  https://lurongtao.gitee.io/felixbooks-gp19-node.js/basics/01-Node.js%E5%9F%BA%E7%A1%80.html
### npm install xxx -S -D 讲解
  https://www.cnblogs.com/hukuangjie/p/11369179.html

### 上传
1. 注册账号
1.npm adduser //login in my id
2.切换到npmjs.org 这个源
    npm get registry

    npm config set registry http://registry.npm.taobao.org/
    npm config set registry https://registry.npmjs.org/
3.npm publish

卸载包：
npm unpublish --force

### npm 脚本

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

script1.js

var x = 0
console.log(x)
script2.js

var y = 0
console.log(y)
"scripts": {
  "script1": "node script1.js",
  "script2": "node script2.js"
}
如果是并行执行（即同时的平行执行），可以使用 & 符号。

$ npm run script1 & npm run script2
如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用 && 符号。

$ npm run script1 && npm run script2


npm view webpack versions

# web Cross-domain

1. Access-Control-Allow-Origin 
   res.writeHead(200, { "content-type": 'application/json', 'Access-Control-Allow-Origin': '*' })





        