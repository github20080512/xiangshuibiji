//ipcRender open browserWindow
const BrowserWindow = require("electron").remote.BrowserWindow
window.onload = function() {
    var btn = this.document.querySelector("#btn")

    btn.onclick = () => {
        mainWindow = new BrowserWindow({
            width: 300,
            height: 300,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false

            },


        })
        mainWindow.loadFile("./yellow.html")
        mainWindow.on("close", () => {
            console.log("close")
            mainWindow = null
        })


    }
}