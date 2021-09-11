let express = require("express");
let router = express.Router();
var fs=require("fs")
var path=require("path")

function readMusic(val) {
  let arrFiles = [];
  const files = fs.readdirSync(val);
  for (let i = 0; i < files.length; i++) {
    const item = files[i];
  
    arrFiles.push(item)
  }
  return arrFiles;
}


const { json } = require("express");
let getHttpResult = require("./http");

// var Promise = require('es6-promise').Promise;

router.get("/server", function (req, res) {
  res.render("server.html");
});
router.get("/", function (req, res) {
  res.render("../public/index.html");
});
router.post("/serve", async function (req, res) {
  let arr;

  try {
    arr = await getHttpResult(req.body);
  } catch (e) {
    arr = e;
  }

  res.send(JSON.stringify(arr));
});

router.post("/read",function(req, res){

  let str = fs.readFileSync(
    path.resolve(__dirname, "../../person/express/public/note.js")
  );

 res.send(str.toString())
})

router.post("/write",function(req, res){
  var str=req.body["str"]
  fs.writeFile(
    path.resolve(__dirname, "../../person/express/public/note.js"),
   str,
    function (err, data) {
      if (err) {
      }
      res.send("success")
    }
  );

})


router.post("/check",function(req, res){
var arr=  readMusic("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs")
res.send(arr)
})
readMusic("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs")

module.exports = router;
