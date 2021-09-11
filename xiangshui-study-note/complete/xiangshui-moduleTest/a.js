var aa = 11111
const aa2 = 22222
console.log("aaaaaaa")
console.log("aa2=" + aa2)


const a = function() {
    //this 'aa' will be used by "b.js"
    console.log(aa)
    aa++
    console.log(aa)
}
a()
console.log("aaaaaaaaa-end")
module.exports.a = a