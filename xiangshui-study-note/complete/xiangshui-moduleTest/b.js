// var a = require('./a.js')
// console.log(a.a)
// a.a()

console.log("start")
var { a } = require('./a.js')
console.log("bbbbbbbbbbbbbbbbbbb")
console.log(a)


a()
console.log("aaaaaaagain")
var { a } = require('./a.js')
a()

var { c } = require('./c.js')
console.log(c)

console.log("bbbbbbbbbbbbbbbbbbb")