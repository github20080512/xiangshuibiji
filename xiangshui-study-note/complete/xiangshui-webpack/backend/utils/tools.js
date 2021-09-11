const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require('path')
var jwt = require('jsonwebtoken');
//将注册密码转成 bcrypt hash
exports.hash = (myPlaintextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                // Store hash in your password DB.
                // console.log(9999999999999999999999)
                // console.log(salt)
                // console.log(hash)
                if (err) {
                    reject(err)
                } else {
                    resolve(hash)
                }
            });
        })

    })

}
//将登录密码 与hash 比较
exports.compare = (myPlaintextPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            resolve(result)
        })
    })
}
//登录成功后，将用户名制成token
//http://web.chacuo.net/netrsakeypair/ 在线生成非对称加密公钥私钥对、在线生成公私钥对、RSA Ke...
//https://blog.csdn.net/xunileida/article/details/82961714 解释jwt用法
//https://jwt.io/#decoded-jwt 在线验证token

exports.sign = (username) => {
    // console.log(1)
    // console.log(__dirname)
    // console.log(path.resolve(__dirname, './keys/public.pem'))


    // const text = fs.readFileSync('./utils/1.text')
    // console.log(text.toString())
    const privateKey = fs.readFileSync('./keys/private.pem')



 
    var token = jwt.sign({ username }, privateKey, { algorithm: 'RS256' });
    return token





}
exports.verify = (token) => {
    console.log("+++++++++++++++++++++++2 token")
    console.log(token)
    console.log("+++++++++++++++++++++++2 token")

    const publicKey = fs.readFileSync('./keys/public.pem')
    var result = jwt.verify(token, publicKey)
    console.log(result)
    return result

}