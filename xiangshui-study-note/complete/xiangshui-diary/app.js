const express = require("express")
const app = express()
const port = 56565
let router = require("./router")



app.engine('html', require('express-art-template'))

app.use(express.static('public'))
app.use(express.static('node_modules'))

var bodyParser = require("body-parser")
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

var session = require('express-session')
app.use(session({
    secret: 'mysecret', //psd 配置加密字符串
    resave: false,
    saveUninitialized: false
}))


app.use(router)





app.listen(port, () => {
    console.log("start...");
})