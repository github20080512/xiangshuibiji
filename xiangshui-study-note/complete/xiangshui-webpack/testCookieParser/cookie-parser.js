 // 导入express
 const express=require('express')
 // 导入cookie中间件
 const cookieParser = require('cookie-parser');
 
 const app = express();
 // 使用cookie-parser解析客户端传入的cookie  加密解密

   
 app.use(cookieParser('qweasd'));   //secret
 // 向客户端发送cookie
 app.get('/send',(req,res)=>{
      // cookieParser初始化时，传入secret（参数）作为签名的秘钥。
    // 设置cookie时，将signed设置为true，表示对cookie进行签名。
    // 获取cookie时，可以同时通过req.cookies，也可以通过req.signedCookies获取。
     res.cookie('name','wangsan',{maxAge:60*1000,signed:true})
     res.send('向客户端发送cookie')
 })
 // 接收服务器端传入的cookie
 app.get('/receive',(req,res)=>{
     // cookies 是保存前面所有的cookie
     res.send('接收到的cookie-->'+req.signedCookies.name)
     
 })
 
 
 app.listen( 3110,()=>{
     console.log(`serve running at http://localhost:3000`)
 })