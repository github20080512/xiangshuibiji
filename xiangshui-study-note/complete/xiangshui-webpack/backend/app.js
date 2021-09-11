//404 handle err
var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//后端控制台打印日志
var logger = require('morgan');
//处理跨域
var cors = require("cors")
//业务
const userRouter = require('./routes/users')
const positionRouter = require('./routes/positions')



var cookieSession = require('cookie-session')

var app = express();

//服务器 cors
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With,if-none-match,x-access-token");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });



// fetch("http://localhost:3000/api/users", {
//     "headers": {
//       "accept": "application/json, text/javascript, */*; q=0.01",
//       "accept-language": "zh-CN,zh;q=0.9",
//       //If-None-Match 是一个条件式请求首部。对于 GETGET 和 HEAD 请求方法来说，当且仅当服务器上没有任何资源的 ETag 属性值与这个首部中列出的相匹配的时候，服务器端会才返回所请求的资源，响应码为  200  。对于其他方法来说，当且仅当最终确认没有已存在的资源的  ETag 属性值与这个首部中所列出的相匹配的时候，才会对请求进行相应的处理。
//       "if-none-match": "W/\"cf-aUHOuueUVtEYZDYIJ2w5J8TlbU8\"",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "x-access-token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIyIiwiaWF0IjoxNjI5NTYyMTcwfQ.hbPVhbm7PVwlBmYl8CvxCa-1VSrwTRlFkXjIl3Fm9ANkGvzl5C-hQa6iam9yYoSQBjwdrPYUZ8CPTaoCAOpnYM1Js02N_uQTyFI25MKG4SDN8GrKZOh_KMrV8w9UTOft3J6tgXaajn2ng3KxampZyitrX6zxvMzv_Wz9FANzDXmT3eIG9cF9odt-triPI7bI8ATzjnr19mOT0P7zay7SakeeEZuXnEQW1oCQZe7syUZi4GWsgsCMAe2yPeqe7w_8ZIaNlWDBrul_ltaoHDkrkGOmiQM36EkFoD4727eCuREcImYr0ykPhkYqvkbMAIQq9QO2xdbDqR18iBnLgCLPzA",
//       "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "http://localhost:9000/",
//     "referrerPolicy": "no-referrer-when-downgrade",
//     "body": null,
//     "method": "GET",
//     "mode": "cors",
//     "credentials": "omit"
//   }).then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       console.log(myJson);
//     });

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Solve front-end cross-domain 
// app.use(cors())

app.use('/api/users', userRouter)
//positions 没有auth鉴权
app.use('/api/positions', positionRouter)
const mobileRouter = require('./routes/mobile')


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

