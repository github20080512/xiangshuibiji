var express = require('express')
var morgan = require('morgan')
 
var app = express()
 
app.use(morgan('dev'))
 
app.get('/', function (req, res) {
  res.send('hello, world!')
})

 
app.listen( 3000,()=>{
    console.log(`serve running at http://localhost:3000`)
})