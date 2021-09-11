var electron = require("electron")
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var mainWindow = null
var globalShortcut = electron.globalShortcut
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,

        }

    })

    mainWindow.loadFile("./index.html")

    globalShortcut.register('ctrl+shift+3', () => {
        mainWindow.hide();
        console.log("hide")
    })
    globalShortcut.register('ctrl+shift+4', () => {
        mainWindow.show();
        console.log("show")

    })

    mainWindow.on("close", (event) => {
        console.log("closed")
        mainWindow = null

        // event.preventDefault(); //this prevents it from closing. The `closed` event will not fire now
        // mainWindow.hide();
       
        // mainWindow.show();
    })
})