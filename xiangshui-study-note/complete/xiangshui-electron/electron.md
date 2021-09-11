# content

## 运行 package 中 main 应为main.js
electron .
 
## 渲染进程可以共用主进程的方法 新开一个窗口
const BrowserWindow = require("electron").remote.BrowserWindow
electron 10版本以上  需要设置enableRemoteModule
 webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, //remote
        }
## mainWindow.webContents.openDevTools()
## 


### Error: executeJavaScript throw "Error: An object could not be cloned.
result=>
Add ;0 to the end of the original script, otherwise the resulting value is attempted to be cloned and used as a result of executeJavaScript.

https://github.com/electron/electron/issues/23722













# electron-packager打包spawn EPERM
关闭你的安全软件就好了（360、腾讯安全管家等等。

electron 打包
https://www.jianshu.com/p/f1ea28015e9e