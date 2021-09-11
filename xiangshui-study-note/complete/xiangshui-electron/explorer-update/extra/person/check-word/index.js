var fs=require("fs")
var path=require("path")

var targetPath=""
var checkReg=/(test)/
var extandReg = /^.*\.(mp3|et|xls|xlsx|xlsm|xlt|csv|jpeg|png|jpg|ttf|woff|woff2)$/;

function readMusic(val) {
    let arrFiles = [];
    const files = fs.readdirSync(val);
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      const stat = fs.lstatSync(val + "\\" + item);
      if (stat.isDirectory() === true) {
        arrFiles = arrFiles.concat(readMusic(val + "\\" + item));
      } else {
        if (extandReg.test(item) ) {
          console.log(val + "\\" + item)
        }else{
          arrFiles.push(val + "\\" + item);
        }
      }
    }
    return arrFiles;
  }
  console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start")
  var res=readMusic(targetPath)
  console.log("\n-----------------------------------------------------apart--------------------------------------------------------------------------------\n\n")

  res.forEach(element => {
      // console.log(element)
     
      var str=fs.readFileSync(element,function(err,data){
      }).toString()
    
      if(checkReg.test(str)){
        console.log(element + " ====== TRUE :")
        console.log("\n")
        let strarr=str.split("\n")
        strarr.forEach(ele=>{
          if(checkReg.test(ele)){
            console.log(ele)
          }
        })
        console.log("\n")
      }
    // console.log(str)
    
  });
