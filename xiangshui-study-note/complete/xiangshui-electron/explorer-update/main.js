(function () {
  var electron = require("electron");
  let md5 = require("blueimp-md5");

  var app = electron.app;
  var BrowserWindow = electron.BrowserWindow;
  var globalShortcut = electron.globalShortcut;
  const ipcMain = electron.ipcMain;
  var mainWindow = null;
  var sonWindow = [];
  var fs = require("fs");
  var path = require("path");
  var cmd = require("node-cmd");
  var xlsx = require("node-xlsx");
  const http = require("http");
  const https = require("https");
  let getHttpResult = require("./express/http");
  let UserPassword = "";
  let otherUserPsd = {};
  let timeOut = null;
  let info = {};
  let AutoClose = {};
  let isAuth = false;
  let show = true;
  let isFrame = false;
  let content = "first login";
  let level = 0;
  let timeoutJudge = false;
  let windowNumber = 0;
  let httpPort = 56565;
  let allowSendData = {};
  let ImPath;
  let errArr = [];

  //psd
  function MD5(str) {
    return md5(md5(md5(str)));
  }
  //str
  let key = "";
  let str1 = ``;

  var toCode = function (str) {
    var len = key.length;
    var a = key.split("");
    var s = "",
      b,
      b1,
      b2,
      b3;
    for (var i = 0; i < str.length; i++) {
      b = str.charCodeAt(i);

      b1 = b % len;
      b = (b - b1) / len;
      b2 = b % len;
      b3 = (b - b2) / len;

      s += a[b3] + a[b2] + a[b1];
    }

    return s;
  };

  var fromCode = function (str) {
    var len = key.length;
    var b,
      b1,
      b2,
      b3,
      d = 0,
      s;
    s = new Array(Math.floor(str.length / 3));
    b = s.length;
    for (var i = 0; i < b; i++) {
      b1 = key.indexOf(str.charAt(d));
      d++;
      b2 = key.indexOf(str.charAt(d));
      d++;
      b3 = key.indexOf(str.charAt(d));
      d++;
      s[i] = b1 * len * len + b2 * len + b3;
    }

    b = eval("String.fromCharCode(" + s.join(",") + ")");
    return b;
  };

  function code(str, direction) {
    let res = "";

    let arr = str.split("");

    let str2 = str1.split("").sort().join("");
    let a, b;
    if (direction == 1) {
      a = str1;
      b = str2;
    } else {
      a = str2;
      b = str1;
    }
    arr.forEach((item, index) => {
      if (a.indexOf(item) > -1) {
        arr[index] = b[a.indexOf(item)];
      } else {
        if (direction == 1) {
          let r = toCode(item);
          if (r.length == 3) {
            arr[index] = "<-" + r + "->";
          } else {
            arr[index] = item;
          }
        }
      }
    });

    res = arr.join("");

    return res;
  }

  function change(str) {
    return code(str, 1);
  }

  function get(str) {
    var r = /<-[\s\S]{3}->/g;
    var arr = str.match(r);
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        str = str.replace(arr[i], fromCode(arr[i].substring(2, 5)));
      }
    }
    return code(str, 0);
  }

  function d(n) {
    if (n < 10) {
      return "0" + n;
    }
    return n;
  }

  function time(n) {
    let date = new Date();
    let hour = date.getHours();
    let mimute = date.getMinutes();
    let second = date.getSeconds();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hourStr = d(hour) + ":" + d(mimute) + ":" + d(second);
    if (n == null) {
      return hourStr;
    } else if (n == "date") {
      return d(day);
    } else if (n == "month") {
      return d(month);
    } else if (n == "year") {
      return d(year);
    } else if (n == "full") {
      return year + "-" + d(month) + "-" + d(day) + " " + hourStr;
    }
  }

  function readFile() {
    try {
      let str = fs.readFileSync(
        path.resolve(__dirname, "../person/configue.json")
      );
      info = JSON.parse(str.toString());
      AutoClose = info.settings.AutoClose;
      UserPassword = info.settings.theme;
      otherUserPsd = info.settings.other;
      httpPort = info.settings.httpPort;
      ImPath = info.settings.ImPath;
    } catch (e) {
      info = {
        pa: [
          {
            name: "https://www.eastmoney.com/",
            content:
              "#hq-news-main > div:nth-child(2) > div.hq-news-con-b.first.on >div.hq-news-data > div.hq-news-value.item_nowPrice",
            shortcut: "fund<3000",
            mode: "pa",
          },
        ],
        url: [
          {
            name: "baidu",
            content: "https://www.baidu.com",
            shortcut: "alt+1",
            mode: "url",
          },
        ],
        file: [
          {
            name: "file name",
            content: "please set!",
            shortcut: "alt+2",
            mode: "file",
          },
        ],
        cmd: [
          {
            name: "order name",
            content: "please set!",
            shortcut: "ctrl+shift+1",
            mode: "",
          },
        ],
        quickCopy: [
          {
            name: "quickcopy name",
            content: "》Dy@myLmyu<",
            shortcut: "shift+x",
            mode: "",
          },
        ],
        quickDefault: [
          {
            name: "set zoom 0",
            content: "",
            shortcut: "ctrl+alt+0",
            mode: "",
          },
          { name: "top true", content: "", shortcut: "ctrl+alt+1", mode: "" },
          {
            name: "top false",
            content: "",
            shortcut: "ctrl+alt+2",
            mode: "",
          },
          {
            name: "close app",
            content: "",
            shortcut: "alt+w",
            mode: "",
          },
          { name: "hide", content: "", shortcut: "alt+q", mode: "" },
        ],
        settings: {
          AutoClose: {
            isAutoClose: true,
            closeTime: "20:00:00",
          },
          theme: "58df3857ad298fe0b01dddeb38933dbd",
          other: {
            785965: "c81b69e43a8ac6db897baddddddebfe7",
          },
          httpPort: 56565,
          ImPath: "E:\\",
          maininterface: { width: 540, height: 280 },
          subinterface: { width: 570, height: 400 },
        },
      };
      AutoClose = info.settings.AutoClose;
      fs.writeFile(
        path.resolve(__dirname, "../person/configue.json"),
        JSON.stringify(info),
        function (err, data) {
          if (err) {
          }
        }
      );
    }
  }

  function newWindow(url, mode) {
    let newJUdge = true;
    sonWindow.map((item, index) => {
      if (item.url == url) {
        newJUdge = false;
        item.setAlwaysOnTop(true);
        item.setAlwaysOnTop(false);
   
      }
    });

    if (!newJUdge) {
      return;
    }
    var secondWindow = new BrowserWindow({
      width: info.settings.subinterface.width || 570,
      height: info.settings.subinterface.height || 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        webviewTag: true,
      },
      //Frameless
      frame: isFrame,
    });
    if (mode == "url") {
      secondWindow.loadURL(url);
    } else {
      secondWindow.loadFile(url);
    }

    secondWindow.webContents.on("zoom-changed", (e, zoomDirection) => {
      if (zoomDirection === "in") {
        level = level >= 3 ? level : (level += 0.2);
      } else {
        level = level <= -3 ? level : (level -= 0.2);
      }
      mainWindow.webContents.setZoomLevel(level);
      for (let i = 0; i < sonWindow.length; i++) {
        sonWindow[i].webContents.setZoomLevel(level);
      }
    });
    secondWindow.index = windowNumber;
    secondWindow.url = url;

    secondWindow.on("focus", () => {
      globalShortcut.register("CommandOrControl+F", function () {
        if (secondWindow && secondWindow.webContents) {
          secondWindow.webContents.send("on-find", "");
        }
      });
    });
    secondWindow.on("blur", () => {
      globalShortcut.unregister("CommandOrControl+F");
    });

    secondWindow.on("close", () => {
      sonWindow = sonWindow.filter((item, index) => {
        return item.index != secondWindow.index;
      });
      secondWindow = null;
    });

    sonWindow.push(secondWindow);
    windowNumber++;
  }
  //main Shortcut
  function shortFn(shortStr, url, mode) {
    globalShortcut.register(shortStr, () => {
      excuteTimeOut();
      if (!isAuth) {
        return;
      }
      newWindow(url, mode);
    });
  }

  function log(str) {
    try {
      content = fs.readFileSync(path.resolve(__dirname, "../person/log.txt"));
      fs.appendFile(
        path.resolve(__dirname, "../person/log.txt"),
        str,
        function (err, data) {
          if (err) {
          }
        }
      );
    } catch (e) {
      fs.writeFile(
        path.resolve(__dirname, "../person/log.txt"),
        str,
        function (err, data) {
          if (err) {
          }
        }
      );
    }
  }

  function excuteTimeOut() {
    clearTimeout(timeOut);
    timeOut = setTimeout(function () {
      allowSendData = {};
      isAuth = false;
      show = false;
      timeoutJudge = true;
      mainWindow.hide();
      for (let i = 0; i < sonWindow.length; i++) {
        sonWindow[i].hide();
        // 60000 * 50
      }
    }, 60000 * 50);
  }

  function conversation() {
    //isAuth
    ipcMain.on("isAuth-message", (event, arg) => {
      let answer = { isAuth: false, log: "" };
      if (MD5(arg) == UserPassword) {
        let temPath = path.resolve(ImPath, "Cache/tdata/1/123.json");

        try {
          var temstr = fs.readFileSync(temPath);

          let tem = {};
          try {
            tem = JSON.parse(temstr.toString());
          } catch (e) {
            errArr.push(e);
          }
          key = tem.key ? tem.key : "";
          str1 = tem.str1 ? tem.str1 : "";
          if (key == "" || str1 == "") {
            errArr.push("err:lost information");
            return;
          }
        } catch (e) {
          errArr.push("err:adress");
          return;
        }

        timeoutJudge = false;
        answer.isAuth = true;
        answer.time = new Date().getTime();
        allowSendData["251214"] = {};
        allowSendData["251214"].time = answer.time;
        isAuth = true;
        excuteTimeOut();
        let arr = content.toString().split("\r\n");
        if (arr.length > 5) {
          arr.splice(0, arr.length - 5);
        }
        answer.log = arr.join("<br>");
        for (let i = 0; i < sonWindow.length; i++) {
          sonWindow[i].show();
        }
      } else {
        let str = "\r\nerr password:\t";
        log(str);
      }
      event.returnValue = answer;
    });
    //writeExls
    ipcMain.on("writeExls", (event, arg) => {
      excuteTimeOut();
      var buffer = xlsx.build(arg.exdata);
      fs.writeFile(arg.exPath, buffer, function (err) {
        if (err) {
          event.returnValue = err;
          return;
        }
        event.returnValue = "success";
      });
    });
    //changestr
    ipcMain.on("changestr", (event, arg) => {
      if (
        arg.value &&
        allowSendData[arg.name] &&
        allowSendData[arg.name]["time"] == arg.value
      ) {
        event.returnValue = change(arg.str);
      } else {
        event.returnValue = arg.str;
      }
    });
    //getstr
    ipcMain.on("getstr", (event, arg) => {
      if (
        arg.value &&
        allowSendData[arg.name] &&
        allowSendData[arg.name]["time"] == arg.value
      ) {
        event.returnValue = get(arg.str);
      } else {
        event.returnValue = arg.str;
      }
    });

    ipcMain.on("getObj", (event, arg) => {
      var obj = { errArr };
      event.returnValue = obj;
    });

    //readData
    ipcMain.on("readData", (event, arg) => {
      let thePath = arg.readPath;
      fs.readFile(thePath, function (err, data) {
        if (err) {
          event.returnValue = { err };
          return;
        }
        event.returnValue = { data: data.toString() };
      });
    });
    //writeData
    ipcMain.on("writeData", (event, arg) => {
      fs.writeFile(arg.readPath, arg.data, function (err) {
        if (err) {
          event.returnValue = { err };
          return;
        }
        event.returnValue = {};
      });
    });

    //excute cmd order
    ipcMain.on("excutecmd", (event, arg) => {
      excuteTimeOut();
      cmd.run(arg, function (err, data, stderr) {});
      event.returnValue = "success";
    });

    //excute new widow
    ipcMain.on("excuteNewWidow", (event, arg) => {
      excuteTimeOut();
      newWindow(arg.url, arg.mode);
      event.returnValue = "success";
    });
    //set isFrame
    ipcMain.on("setIsFrame", (event, arg) => {
      excuteTimeOut();
      isFrame = arg.isFrame;

      event.returnValue = "success";
    });

    //isactive
    ipcMain.on("isActive", (event, arg) => {
      excuteTimeOut();
      event.returnValue = "success";
    });
    //son html logout
    ipcMain.on("isLogout", (event, arg) => {
      allowSendData[arg.name] = null;
      event.returnValue = "success";
    });
    //extentant conversation
    // arg {readPath,psd}
    //
    ipcMain.on("checkPsd", (event, arg) => {
      let answer = { isAuth: false };
      if (MD5(arg.value) == otherUserPsd[arg.name]) {
        allowSendData[arg.name] = {};
        allowSendData[arg.name].time = new Date().getTime();
        answer.isAuth = true;
        answer.time = allowSendData[arg.name].time;
      }
      event.returnValue = answer;
    });
    //http pa.js
    ipcMain.on("sendhttp", async (event, arg) => {
      let answer = await getHttpResult(arg);
      let obj = {
        answer,
        other: arg.other,
      };
      // event.returnValue = answer;

      mainWindow.webContents.send("answerPa", obj);
    });
    //ask http
    ipcMain.on("askhttp", (event, arg) => {
      let data = ``;
      let httpObj = {};
      if (arg.indexOf("https") > -1) {
        httpObj = https;
      } else {
        httpObj = http;
      }

      // http

      httpObj.get(arg, (result) => {
        result.on("data", (chunk) => {
          data += chunk;
        });
        result.on("end", () => {
      
          event.returnValue = data;
        });
      });
    });
  }

  function registerShortcut() {
    //main process shortcut
    let totalArr = [];
    totalArr.push(...info["url"]);
    totalArr.push(...info["file"]);
    totalArr.forEach(function (item) {
      shortFn(item["shortcut"], item["content"], item["mode"]);
    });

    info["cmd"].forEach(function (item) {
      globalShortcut.register(item.shortcut, () => {
        excuteTimeOut();
        if (!isAuth) {
          return;
        }
        cmd.run(item.content, function (err, data, stderr) {});
      });
    });

    globalShortcut.register("alt+q", () => {
      excuteTimeOut();
      if (show) {
        mainWindow.hide();
        for (let i = 0; i < sonWindow.length; i++) {
          sonWindow[i].hide();
        }
      } else {
        if (timeoutJudge) {
          mainWindow.show();
          mainWindow.webContents.send("ping", "whoooooooh!");
        } else {
          for (let i = 0; i < sonWindow.length; i++) {
            sonWindow[i].show();
          }
          mainWindow.show();
        }
      }
      show = !show;
    });
    globalShortcut.register("alt+w", () => {
      app.quit();
    });

    globalShortcut.register("ctrl+alt+1", () => {
      excuteTimeOut();
      for (let i = 0; i < sonWindow.length; i++) {
        sonWindow[0].setAlwaysOnTop(true);
      }
    });
    globalShortcut.register("ctrl+alt+2", () => {
      excuteTimeOut();
      for (let i = 0; i < sonWindow.length; i++) {
        sonWindow[0].setAlwaysOnTop(false);
      }
    });
    // mainWindow.openDevTools();
    //globalShortcut.register("ctrl+alt+3", () => {});

    //Zoom

    const ret = globalShortcut.register("ctrl+alt+0", () => {
      excuteTimeOut();
      level = 0;
      mainWindow.webContents.setZoomLevel(0);
      for (let i = 0; i < sonWindow.length; i++) {
        sonWindow[i].webContents.setZoomLevel(0);
      }
    });

    //Zoom
    mainWindow.webContents.on("zoom-changed", (e, zoomDirection) => {
      if (zoomDirection === "in") {
        level = level >= 3 ? level : (level += 0.2);
      } else {
        level = level <= -3 ? level : (level -= 0.2);
      }
      mainWindow.webContents.setZoomLevel(level);
      for (let i = 0; i < sonWindow.length; i++) {
        sonWindow[i].webContents.setZoomLevel(level);
      }
    });
  }
  //http
  function startHttpServe(port) {
    const express = require("express");
    const expressApp = express();

    let router = require("./express/router");

    expressApp.set("views", path.join(__dirname, "../person/express/views"));

    expressApp.use(express.static(path.join(__dirname, '../person/express/public')))

    expressApp.engine("html", require("express-art-template"));
    var bodyParser = require("body-parser");
    // parse application/x-www-form-urlencoded
    expressApp.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    expressApp.use(bodyParser.json());

    expressApp.use(router);

    expressApp.listen(port, () => {});
  }

  readFile();

  startHttpServe(httpPort);

  app.on("ready", () => {
    let logstr = "\r\n" + time("full") + "\tlogin.";
    log(logstr);
    mainWindow = new BrowserWindow({
      width: info.settings.maininterface.width || 540,
      height: info.settings.maininterface.height || 280,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
      //Frameless
      frame: false,
    });

    mainWindow.loadFile(path.resolve(__dirname, "../person/index.html"));

    conversation();

    registerShortcut();

    //AutoClose
    if (AutoClose.isAutoClose) {
      setInterval(function () {
        if (time() == AutoClose.closeTime) {
          app.quit();
        }
      }, 1000);
    }

    mainWindow.on("focus", () => {
      globalShortcut.register("CommandOrControl+F", function () {
        if (mainWindow && mainWindow.webContents) {
          mainWindow.webContents.send("on-find", "");
        }
      });
    });
    mainWindow.on("blur", () => {
      globalShortcut.unregister("CommandOrControl+F");
    });

    mainWindow.on("close", () => {
      let logstr = "\r\n" + time("full") + "\tlogout.";
      log(logstr);
      mainWindow = null;
    });
  });
})();
