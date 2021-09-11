const express = require('express')
const app = express()
const port = 5000
let fs = require('fs')
app.engine('html', require('express-art-template'))
app.get("/", function(req, res) {




    res.render('index.html', { title: 'i hate you ' })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})