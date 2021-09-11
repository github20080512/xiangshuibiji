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
    mainWindow.webContents.openDevTools()

    // load the other webs
    // var BrowserView = electron.BrowserView
    // var view = new BrowserView()
    // mainWindow.setBrowserView(view)
    // view.setBounds({ x: 0, y: 120, width: 1000, height: 600 })
    // view.webContents.loadURL("http://baidu.com")
    mainWindow.on("close", () => {
        console.log("closed")
        mainWindow = null
    })
})