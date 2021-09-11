const { remote } = require("electron")
var rightTemplate = [
    { label: 'copy', accelerator: 'ctrl+c', },
    { label: 'paste', accelerator: 'ctrl+v' },

]
var m = remote.Menu.buildFromTemplate(rightTemplate)

window.addEventListener("contextmenu", function(e) {
    e.preventDefault()
    m.popup({ window: remote.getCurrentWindow() })
})