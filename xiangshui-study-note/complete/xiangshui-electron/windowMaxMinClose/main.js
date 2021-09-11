//https://blog.csdn.net/fukaiit/article/details/91351448

var electron = require("electron");
var app = electron.app;
var ipc = electron.ipcMain;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 570,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true,
    },
    // transparent: true,
    frame: false,
  });
 

  mainWindow.loadFile("index.html");

 
  ipc.on("message2", (_, message) => {
    console.log(message);
    _.returnValue = 1
  });

  mainWindow.on("close", () => {
    console.log("closed");
    mainWindow = null;
  });
});
