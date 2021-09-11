var electron = require("electron")
var app = electron.app
var ipc = electron.ipcMain;
var BrowserWindow = electron.BrowserWindow
var mainWindow = null



app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 570,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,

        },
        //Frameless
        frame: false
    })
      //

            // document.onkeyup=function(ev){
      //     console.log(ev.key)
      // }
    mainWindow.webContents.on('dom-ready', () => {

  });
  
setInterval(()=>{
  mainWindow.webContents.executeJavaScript(`
  if(!document.onkeydown){
    document.onkeydown=function(){
      require('electron').ipcRenderer.send('gpu',"up");
    };
  };0`);

},1000)

  ipc.on('gpu', (_, gpu) => {
    console.log(gpu)
  })
  


    mainWindow.loadFile('index.html')



    mainWindow.on("close", () => {
        console.log("closed")
        mainWindow = null
    })
})