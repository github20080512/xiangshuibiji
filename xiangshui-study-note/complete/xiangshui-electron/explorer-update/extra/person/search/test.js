
var divStyleStr=`
display: inline-block;
padding: 18px;
background: rgb(0 0 0);
border-radius: 15px;
position: fixed;
top: 100px;
left: 50%;
transform: translate(-50%);
color: rgb(255 0 0);
font-weight: bold;
font-size: 22px;
`;

function addNewDiv(resultStr){
  
  let oldDiv = document.getElementById("translate_div");
  if (oldDiv) {
    clearTimeout(window.mytimeOut);
    window.mytimeOut = setTimeout(() => {
      oldDiv.remove();
    }, 5000);
    oldDiv.innerHTML = `${resultStr}`;
    return;
  }
  var div = document.createElement("div");
  div.innerHTML = `${resultStr}`;
  div.id = "translate_div";
  div.style = divStyleStr
  document.body.appendChild(div);
  window.mytimeOut = setTimeout(() => {
    div.remove();
  }, 5000);
  div.onclick = function () {
    clearTimeout(window.mytimeOut);
    this.remove();
  };
}

function readParent(obj){
  console.log(obj.parentNode)
  if(obj.parentNode && obj.parentNode.tagName!="BODY"){
    readParent(obj.parentNode)
    let divName=obj.parentNode.className
  }
}
document.onkeydown = function (ev) {
  if (ev.key == "f") {
    var str = window.getSelection().toString();
    let url=`http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=`+str
    var result = require("electron").ipcRenderer.sendSync("askhttp", url);
    result=JSON.parse(result)
    console.log(result);
    var resultStr = result.translateResult[0][0]["tgt"];
    addNewDiv(resultStr)
  }
 
};



document.oncontextmenu= function (e) {
  require("electron").ipcRenderer.sendToHost("open dev");
  let obj1= e.target
  window.targetDiv = e.target;
  console.log(e.target)
  readParent(obj1)
};

// ipcRenderer.on("webParent",(e,message)=>{
//     console.log(message)
// })
require("electron").ipcRenderer.sendToHost(window.location.href);
