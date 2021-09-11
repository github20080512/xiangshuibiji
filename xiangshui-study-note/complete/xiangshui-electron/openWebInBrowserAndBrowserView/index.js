var { shell } = require("electron")
var aLInk = document.getElementById("link")
aLInk.onclick = function(e) {
    e.preventDefault();
    var href = this.getAttribute("href")
    shell.openExternal(href)
}
var aBtn = document.getElementById("mybtn")
aBtn.onclick = function() {
    window.open("./popup.html")
}
window.addEventListener('message', (msg) => {
    let mytext = document.querySelector("#text")
    mytext.innerHTML = msg.data
})