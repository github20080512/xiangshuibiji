const { Menu, BrowserWindow } = require("electron")
var template = [{
        label: "love",
        submenu: [{
                label: "son",
                accelerator: 'ctrl+n',
                click: () => {
                    var win = new BrowserWindow({
                        width: 100,
                        height: 100,
                        webPreferences: {
                            nodeIntegration: true,
                            contextIsolation: false,
                            enableRemoteModule: true,

                        }

                    })

                    win.loadFile("yellow.html")
                    win.on("closed", () => {
                        console.log("closed")
                        win = null
                    })
                }
            },
            { label: "dauther" }
        ]
    },
    {
        label: "hate",
        submenu: [
            { label: "son" },
            { label: "dauther" }
        ]
    }
]
var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)