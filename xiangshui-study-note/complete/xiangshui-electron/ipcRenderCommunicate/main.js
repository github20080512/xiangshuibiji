var electron = require("electron")
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var mainWindow = null

//Communicate with the rendering process
//rendering process use "ipcRenderer"
const ipcMain = require('electron').ipcMain;




app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false

        }

    })
    mainWindow.loadFile("./index.html")


    ipcMain.on('synchronous-message', (event, arg) => {
        console.log(arg) // prints "ping"
        event.returnValue = 'pong'
    })
    mainWindow.on("closed", () => {
        mainWindow = null
        console.log("closed")
    })
})