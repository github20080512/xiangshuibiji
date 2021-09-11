const ipcRenderer = require('electron').ipcRenderer;


window.onload = function() {
    var btn = this.document.querySelector("#btn")

    btn.onclick = () => {
        alert(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
    }

}