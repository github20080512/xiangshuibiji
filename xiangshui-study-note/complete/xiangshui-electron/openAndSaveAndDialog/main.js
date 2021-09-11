var electron = require("electron")
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var mainWindow = null
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,

        }

    })

    mainWindow.loadFile("./index.html")


    mainWindow.on("close", () => {
        console.log("closed")
        mainWindow = null
    })
})