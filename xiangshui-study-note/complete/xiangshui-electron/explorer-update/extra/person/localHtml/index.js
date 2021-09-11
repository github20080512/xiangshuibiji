
(function () {
  var path = require("path");
  const ipcRenderer = require("electron").ipcRenderer;
  var data = {};
  let LoginTime = 0;
  let TheVersion = 785965;
  var isAuth = false;
  let PathName = path.resolve(__dirname, "../record.json");
  let slideIndex = 0;
  let baseUrl = "https://www.bing.com";

  
  var info={}
  function writeInfoFile(readPath, data, callback) {
   
    var content = ipcRenderer.sendSync("writeData", {
      readPath,
      data,
    });
    if (content.err) {
      alert(content.err);
    } else {
      callback && callback();
    }
  }

  function readFile() {
    var content = ipcRenderer.sendSync("readData", {
      readPath: path.resolve(__dirname, "../configue.json"),
    });

    if (content.err) {
      alert(content.err);
    } else {
      info = JSON.parse(content.data.toString());
   
    }
  }
  //
  function setLikeColor() {
    if (getclass("slide-item")[slideIndex].getAttribute("data-like")) {
      getclass("like")[0].style.color = "orange";
    } else {
      getclass("like")[0].style.color = "#fff";
    }
  }

  (async function () {
    await fetch("http://bing.getlove.cn/latelyBingImageStory")
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        let zIndex = 0;

        for (let i = 0; i < res.length; i++) {
          zIndex = i == 0 ? 1000 : 0;
          const item = res[i];
          let imgUrl = baseUrl + item.url;

          getclass("banner")[0].innerHTML += `
          <li class="slide-item" style="z-index:${zIndex};">
         
            <img src="${imgUrl}" alt="">
            
          </li>
          `;
        }

        let lis = getclass("slide-item");
        lis[0].getElementsByTagName("img")[0].onload = function () {
          getclass("img-inf")[0].style.display = "inline-block";
          getclass("img-inf")[0].onmouseover = function () {
            getclass("img-inf-text")[0].style.display = "inline-block";
            getclass("img-inf-text")[0].innerHTML =
              res[slideIndex]["copyright"];
          };
          getclass("img-inf")[0].onmouseleave = function () {
            getclass("img-inf-text")[0].style.display = "none";
          };
          getclass("banner")[0].style.height =
            getclass("slide-item")[0].offsetHeight + "px";
          window.onresize = function () {
            if (getclass("slide-item")[0].offsetHeight == 0) {
              return;
            }
            getclass("banner")[0].style.height =
              getclass("slide-item")[0].offsetHeight + "px";
          };


          
          readFile() 
          
       
        
        
          let likeArr = info["like"];
          if (likeArr) {
            let lis = getclass("slide-item");
            for (let i = 0; i < lis.length; i++) {
              let url = lis[i]
                .getElementsByTagName("img")[0]
                .getAttribute("src")
                .replace(baseUrl, "");
              for (let j = 0; j < likeArr.length; j++) {
                if (url == likeArr[j]["url"]) {
                  lis[i].setAttribute("data-like", "true");
                }
              }
            }
            setLikeColor();
        
            let renderStr = `
            <h3>FAVOURITE</h3>
            <ul class="clearfix">`;
        
            for (let j = 0; j < likeArr.length; j++) {
              renderStr += `
              <li>
              <div class="img-wrap">
                <img class="fav-img" src="${baseUrl + likeArr[j]["url"]}" alt="">
              </div>
              <p>
               ${likeArr[j]["copyright"]}
              </p>
            </li>
              `;
            }
            renderStr += "</ul>";
        
            getclass("favourite")[0].innerHTML = renderStr;
            let fullIndex = 0;
            let fullScreen = getclass("full-screen")[0];
            let fullInfo = fullScreen.getElementsByClassName("img-inf-text")[0];
            let fullLeftNav = fullScreen.getElementsByClassName("leftNav")[0];
            let fullRightNav = fullScreen.getElementsByClassName("rightNav")[0];
            let favIMgs = getclass("fav-img");
            for (let i = 0; i < favIMgs.length; i++) {
              favIMgs[i].onclick = function () {
                fullScreen.style.display = "block";
                getclass("full-screen-img")[0].setAttribute(
                  "src",
                  baseUrl + likeArr[i].url
                );
                fullInfo.innerHTML = likeArr[i].copyright;
                fullIndex = i;
              };
            }
        
            getclass("full-info")[0].onclick = function () {
              if (fullInfo.style.display == "none") {
                fullInfo.style.display = "inline-block";
              } else {
                fullInfo.style.display = "none";
              }
            };
        
            fullLeftNav.onclick = function () {
              if (fullIndex <= 0) {
                return;
              }
              fullIndex--;
              getclass("full-screen-img")[0].setAttribute(
                "src",
                baseUrl + likeArr[fullIndex].url
              );
              fullInfo.innerHTML = likeArr[fullIndex].copyright;
            };
            fullRightNav.onclick = function () {
              if (fullIndex >= likeArr.length - 1) {
                return;
              }
              fullIndex++;
              getclass("full-screen-img")[0].setAttribute(
                "src",
                baseUrl + likeArr[fullIndex].url
              );
              fullInfo.innerHTML = likeArr[fullIndex].copyright;
            };
        
            getclass("full-close")[0].onclick = function () {
              fullScreen.style.display = "none";
            };
          }
        




        };
        getclass("leftNav")[0].onclick = function () {
          if (slideIndex <= 0) {
            return;
          }
          slideIndex--;
          for (let i = 0; i < lis.length; i++) {
            lis[i].style.zIndex = 0;
          }
          lis[slideIndex].style.zIndex = 1000;
          getclass("img-inf-text")[0].innerHTML = res[slideIndex]["copyright"];
          setLikeColor();
        };
        getclass("rightNav")[0].onclick = function () {
          if (slideIndex >= lis.length - 1) {
            return;
          }
          slideIndex++;
          for (let i = 0; i < lis.length; i++) {
            lis[i].style.zIndex = 0;
          }
          lis[slideIndex].style.zIndex = 1000;
          getclass("img-inf-text")[0].innerHTML = res[slideIndex]["copyright"];
          setLikeColor();
        };
        getclass("like")[0].onclick = function () {
         
          let dataLiked = lis[slideIndex].getAttribute("data-like");
          if (dataLiked) {
            return;
          }
          let obj = {
            url: res[slideIndex]["url"],
            copyright: res[slideIndex]["copyright"],
          };
          if (info["like"]) {
            info["like"].push(obj);
          } else {
            info["like"] = [obj];
          }
          writeInfoFile(path.resolve(__dirname, "../configue.json"),JSON.stringify(info))
          lis[slideIndex].setAttribute("data-like", "true");
          setLikeColor();
        };
      })
      .catch(function (e) {
        console.log("Oops, error");
      });
  })();

  function writeFile(readPath, data, callback) {
    data = changeStr(data);
    var content = ipcRenderer.sendSync("writeData", {
      readPath,
      data,
    });
    if (content.err) {
      alert(content.err);
    } else {
      callback && callback();
    }
  }

  function changeStr(s) {
    return ipcRenderer.sendSync("changestr", {
      name: TheVersion,
      value: LoginTime,
      str: s,
    });
  }

  function getStr(s) {
    return ipcRenderer.sendSync("getstr", {
      name: TheVersion,
      value: LoginTime,
      str: s,
    });
  }

  let diaryIndex = 0;
  let diaryEditing = false;
  let diaryWrite = false;

  let memoryObj = null;
  let behaviorMemoryObj = null;
  // function ----------------------------------------------------

  function d(n) {
    if (n * 1 < 10 && n.toString().length == 1) {
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
      return date.getTime();
    } else if (n == "timestamp") {
    }
  }
  function getTheTime(n, m) {
    var date = new Date(n);
    let hour = date.getHours();
    let mimute = date.getMinutes();
    let second = date.getSeconds();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (m == "year") {
      return year;
    } else if (m == "month") {
      return d(month);
    } else {
      return (
        year +
        "-" +
        d(month) +
        "-" +
        d(day) +
        " " +
        d(hour) +
        ":" +
        d(mimute) +
        ":" +
        d(second)
      );
    }
  }

  function formatM(n, option) {
    let res = "";
    if (option == "+") {
      res = "+" + n.toFixed(2);
    } else if (option == "-") {
      if (n * 1 < 0) {
        res = n.toFixed(2);
      } else {
        res = "-" + n.toFixed(2);
      }
    } else {
      res = n.toFixed(2);
    }
    return res;
  }

  function getDays(year, month) {
    var curDate = new Date();
    curDate.setYear(year);
    curDate.setMonth(month);
    curDate.setDate(0);
    return curDate.getDate();
  }
  function $(id) {
    return document.getElementById(id);
  }
  function getclass(id) {
    return document.getElementsByClassName(id);
  }

  function insertAfter(newElement, targentElement) {
    var parent = targentElement.parentNode;
    if (parent.lastChild == targentElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targentElement.nextSibling);
    }
  }

  function getBehaviorClass(id) {
    return $("behavior").getElementsByClassName(id);
  }

  function getBillClass(id) {
    return $("bill").getElementsByClassName(id);
  }

  // diary ----------------------------------------------------

  var diary = data.record;
  let diaryYearArr = [];
  let diaryTotal = [];

  var diaryNavBtns = getclass("diary-nav-btn");
  for (let i = 0; i < diaryNavBtns.length; i++) {
    diaryNavBtns[i].onclick = function () {
      if (
        articleEdit.style.display == "block" &&
        $("diary-textarea").value != ""
      ) {
        alert("Not completed");
        return;
      }
      if (articleEdit.style.display == "block") {
        articleEdit.style.display = "none";
        articlePreview.style.display = "block";
      }
      if (articleDetail.style.display == "block") {
        articleDetail.style.display = "none";
        articlePreview.style.display = "block";
      }

      renderDiary(this.getAttribute("data-name"));
      var ready = false;
      let animationDiv = getclass("diary-nav-animation")[0];
      animationDiv.innerHTML = this.getAttribute("data-name");
      let start = getclass("diary-nav-animation")[0].style.left;
      let end = 80 * i + 30 + "px";

      var oH = document.getElementsByTagName("head")[0];
      var oS = document.createElement("style");
      oH.appendChild(oS);
      oS.innerHTML = `
        @keyframes mymove
        {
        from {left:${start};}
        to {left:${end};}
        }`;
      animationDiv.style.left = end;
      // animationDiv.style.animation='3s mymove linear'
      animationDiv.addEventListener(
        "animationend",
        function () {
          if (ready) return;
          ready = true;
          document.getElementsByTagName("head")[0].removeChild(oS);
        },
        false
      );
    };
  }

  let articlePreview = getclass("article-preview")[0];
  let articleDetail = getclass("article-detail")[0];
  let articleEdit = getclass("article-edit")[0];

  getclass("diary-add-btn")[0].onclick = function () {
    let tem = getclass("diary-nav-animation")[0].innerText;
    tem = tem == "all" ? "remarks" : tem;

    getclass("article-subject-select")[0].value = tem;
    articlePreview.style.display = "none";
    articleDetail.style.display = "none";
    articleEdit.style.display = "block";
    diaryWrite = true;
  };

  getclass("diary-nav-animation")[0].onclick = function () {
    if (
      articleEdit.style.display == "block" &&
      $("diary-textarea").value != ""
    ) {
      alert("Not completed");
    } else {
      articlePreview.style.display = "block";
      articleDetail.style.display = "none";
      articleEdit.style.display = "none";
      if (diaryEditing) {
        diaryEditing = false;
      }
      if (diaryWrite) {
        diaryWrite = false;
      }
    }
  };
  $("diary-delete").onclick = function () {
    getclass("confirm-div")[0].style.display = "block";
    var promiseFn = new Promise(function (resolve, reject) {
      $("confirm-sure").onclick = function () {
        resolve("true");
      };
      $("confirm-cancel").onclick = function () {
        resolve("false");
      };
      getclass("confirm-close")[0].onclick = function () {
        resolve("false");
      };
    });
    promiseFn.then(function (result) {
      if (result == "true") {
        let theFullTime = diaryTotal[diaryIndex]["writeTime"];
        let theYear = getTheTime(theFullTime, "year");
        let theMonth = getTheTime(theFullTime, "month");

        let arr = data["record"][theYear][theMonth];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].writeTime == theFullTime) {
            arr.splice(i, 1);
            if (arr.length == 0) {
              delete data["record"][theYear][theMonth];
            }
            writeFile(PathName, JSON.stringify(data));
          }
        }
        diaryTotal.splice(diaryIndex, 1);
        articlePreview.style.display = "block";
        articleDetail.style.display = "none";
        renderDiary(getclass("diary-nav-animation")[0].innerText);
      }
      getclass("confirm-div")[0].style.display = "none";
    });
  };
  $("diary-edit").onclick = function () {
    articleEdit.style.display = "block";
    articleDetail.style.display = "none";
    $("diary-textarea").value = diaryTotal[diaryIndex].content;
    $("article-title-input").value = diaryTotal[diaryIndex].title;
    getclass("article-subject-select")[0].value =
      diaryTotal[diaryIndex].subject;
    diaryEditing = true;
  };
  $("article-save-btn").onclick = function () {
    if (diaryEditing) {
      diaryTotal[diaryIndex].content = $("diary-textarea").value;
      diaryTotal[diaryIndex].title = $("article-title-input").value;
      diaryTotal[diaryIndex].subject = getclass(
        "article-subject-select"
      )[0].value;
      articlePreview.style.display = "block";
      articleEdit.style.display = "none";
      diaryEditing = false;
      writeFile(PathName, JSON.stringify(data));
    }
    if (diaryWrite) {
      let obj = {
        date: time("date"),
        subject: getclass("article-subject-select")[0].value,
        title: $("article-title-input").value,
        content: $("diary-textarea").value,
        writeTime: time("full"),
      };
      saveData(obj, "record");
      articlePreview.style.display = "block";
      articleEdit.style.display = "none";
      diaryTotal.push(obj);

      diaryWrite = false;
    }
    renderDiary(getclass("diary-nav-animation")[0].innerText);
    $("diary-textarea").value = "";
    $("article-title-input").value = "";
    getclass("article-subject-select")[0].value = "remarks";
  };

  function saveData(temobj, objstr) {
    let year = time("year");
    let month = time("month");
    if (!data[objstr][year]) {
      data[objstr][year] = {};
    }
    if (data[objstr][year][month]) {
      data[objstr][year][month].push(temobj);
    } else {
      data[objstr][year][month] = [temobj];
    }
    writeFile(PathName, JSON.stringify(data));
  }

  function renderDiary(subject) {
    diary = data.record;
    diaryYearArr = [];
    diaryTotal = [];

    for (let i in diary) {
      if (i != "subjects") {
        diaryYearArr.push(diary[i]);
      }
    }

    for (let i = 0; i < diaryYearArr.length; i++) {
      for (let j in diaryYearArr[i]) {
        diaryTotal.push(...diaryYearArr[i][j]);
      }
    }

    diaryTotal.sort((a, b) => {
      return b.writeTime - a.writeTime;
    });
    for (let i = 0; i < diaryTotal.length; i++) {
      diaryTotal[i].index = i;
    }
    let temarr = [];
    let diaryStr = ``;
    if (subject == "all") {
      temarr = diaryTotal;
    } else {
      temarr = diaryTotal.filter((item, index) => {
        return item.subject == subject;
      });
    }

    for (let i = 0; i < temarr.length; i++) {
      let strarr = temarr[i]["content"].split("\n");
      let content = "";
      if (strarr.length > 7) {
        content = strarr.splice(0, 7).join("<br>") + "<br>......";
      } else {
        content = strarr.join("<br>");
      }
      diaryStr += `
    <div class="article-item article-preview-item" data-index="${
      temarr[i]["index"]
    }">
    <div class="article-title">
        <h5>${temarr[i]["title"]}</h5> 
      ${getTheTime(temarr[i]["writeTime"])}
    </div>
    <p class="article-content">
    ${content}
    </p>
  </div>`;
    }

    articlePreview.innerHTML = diaryStr;
    if (temarr.length == 0) {
      articlePreview.innerHTML = "<p class='prompt'>There is nothing.</p>";
    }
    let articlePreviewItems = getclass("article-preview-item");
    for (let i = 0; i < articlePreviewItems.length; i++) {
      articlePreviewItems[i].onclick = function () {
        window.scrollTo(0, 0);
        diaryIndex = this.getAttribute("data-index");
        articlePreview.style.display = "none";
        articleDetail.style.display = "block";
        getclass("article-detail-wrap")[0].innerHTML = `
        <div class="article-item article-preview-item">
        <div class="article-title">
        <h5>${diaryTotal[diaryIndex]["title"]}</h5> 
          ${getTheTime(diaryTotal[diaryIndex]["writeTime"])}
        </div>
        <p class="article-content">
        ${diaryTotal[diaryIndex]["content"].split("\n").join("<br>")}
        </p>
      </div>`;
      };
    }
  }

  // behavior ----------------------------------------------------
  var behavior = data.behavior;
  let behaviorYearArr = [];
  let behaviorDate = [];
  let behaviorAllObjs = [];
  let positiveArr = ["push up", "fantacy"];
  let totalBehaviorData = [];

  function getDuration(t) {
    var seconds = new Date().getTime() - t;
    var days = parseInt((seconds / 86400000).toFixed(2));

    return days;
  }
  function calculateLastAction(arr) {
    let theObj = {};
    for (let i = 0; i < arr.length; i++) {
      let name = arr[i]["name"];
      let number = arr[i]["number"];
      let writeTime = arr[i]["writeTime"];
      if (positiveArr.includes(name)) {
        if (theObj["positiveLasttime"]) {
          if (writeTime > theObj["positiveLasttime"]) {
            theObj["positiveLasttime"] = writeTime;
          }
        } else {
          theObj["positiveLasttime"] = writeTime;
        }
      } else {
        if (theObj["negtiveLasttime"]) {
          if (writeTime > theObj["negtiveLasttime"]) {
            theObj["negtiveLasttime"] = writeTime;
          }
        } else {
          theObj["negtiveLasttime"] = writeTime;
        }
      }
    }

    getclass("positive-days")[0].innerHTML = getDuration(
      theObj["positiveLasttime"]
    );
    getclass("negtive-days")[0].innerHTML = getDuration(
      theObj["negtiveLasttime"]
    );
  }
  function calculateBehavior(arr) {
    theObj = { positive: {}, negtive: {} };
    for (let i = 0; i < arr.length; i++) {
      let name = arr[i]["name"];
      let number = arr[i]["number"];
      let writeTime = arr[i]["writeTime"];
      if (positiveArr.includes(name)) {
        if (theObj["positive"][name]) {
          theObj["positive"][name]["number"] += number * 1;
          if (writeTime > theObj["positive"][name]["writeTime"]) {
            theObj["positive"][name]["writeTime"] = writeTime;
          }
        } else {
          theObj["positive"][name] = {};
          theObj["positive"][name]["number"] = number * 1;
          theObj["positive"][name]["writeTime"] = writeTime;
        }
      } else {
        if (theObj["negtive"][name]) {
          theObj["negtive"][name]["number"] += number * 1;
          if (writeTime > theObj["negtive"][name]["writeTime"]) {
            theObj["negtive"][name]["writeTime"] = writeTime;
          }
        } else {
          theObj["negtive"][name] = {};
          theObj["negtive"][name]["number"] = number * 1;
          theObj["negtive"][name]["writeTime"] = writeTime;
        }
      }
    }
    getclass("behavior-total-list")[0].innerHTML = "";
    for (let i in theObj["positive"]) {
      getclass("behavior-total-list")[0].innerHTML += `
    <div class="list-box">  
      <span class="name">${i}</span>
      <span class="number green">${theObj["positive"][i]["number"]} times</span>
     <span class="s-remark days">${getDuration(
       theObj["positive"][i]["writeTime"]
     )} days</span>
   </div>
    `;
    }
    for (let i in theObj["negtive"]) {
      getclass("behavior-total-list")[0].innerHTML += `
    <div class="list-box">  
      <span class="name">${i}</span>
      <span class="number red">${theObj["negtive"][i]["number"]} times</span>
     <span class="s-remark days">${getDuration(
       theObj["negtive"][i]["writeTime"]
     )} days</span>
   </div>
    `;
    }

    calculateLastAction(totalBehaviorData);
  }

  function renderBehaviorIndex() {
    totalBehaviorData = [];

    behavior = data.behavior;
    behaviorYearArr = [];
    behaviorDate = [];
    for (let i in behavior) {
      if (i != "subjects") {
        behaviorYearArr.push(i);
      }
    }
    behaviorYearArr.reverse();

    behaviorDataHandle();
    blindEvents();

    getclass("fc-month-box-s")[0].innerHTML = "";

    getclass("behavior-total-list")[0].innerHTML = "";

    getclass("behavior-list-wrap")[0].innerHTML =
      "<p class='prompt'>There is nothing.</p>";

    for (let i = 0; i < behaviorYearArr.length; i++) {
      let yearNum = behaviorYearArr[i];
      let thisYearData = behavior[yearNum];
      let montharr = [];
      for (let j in thisYearData) {
        montharr.push(j);
      }
      montharr.sort((a, b) => {
        return b * 1 - a * 1;
      });

      let yearStr = `<div class="year-${yearNum}"><div class="year-num-s">
            <div>${yearNum} year</div>
           </div>`;
      let monthStr = ``;
      for (let k = 0; k < montharr.length; k++) {
        behaviorDate.unshift(yearNum + montharr[k]);
        let temArr = behavior[yearNum][montharr[k]];
        totalBehaviorData.push(...temArr);

        monthStr += `
          <div class="month month-s" data-year="${behaviorYearArr[i]}" data-month="${montharr[k]}">
        
          <ul class="month-r">
            <li>
              <span class="month-num ">${montharr[k]}</span>
            </li>
          </ul>
        </div>
          `;
      }
      yearStr = yearStr + monthStr + `</div>`;
      getclass("fc-month-box-s")[0].innerHTML += yearStr;
    }
    getclass("fcy-box-s")[0].innerHTML = getclass("year-num-s")[0]
      ? getclass("year-num-s")[0].innerText
      : time("year") + " Year";
    let behaviorMonths = getclass("month-s");
    for (let i = 0; i < behaviorMonths.length; i++) {
      behaviorMonths[i].onclick = function () {
        let year = this.getAttribute("data-year");
        let month = this.getAttribute("data-month");
        for (let j = 0; j < behaviorMonths.length; j++) {
          behaviorMonths[j].classList.remove("month-active");
        }
        this.classList.add("month-active");
        behaviorMemoryObj = {
          year,
          month,
        };

        renderBehavior(year, month);
        calculateBehavior(behavior[year][month]);
      };
    }

    if (behaviorMemoryObj) {
      for (let i = 0; i < behaviorMonths.length; i++) {
        let year = behaviorMonths[i].getAttribute("data-year");
        let month = behaviorMonths[i].getAttribute("data-month");
        if (
          year == behaviorMemoryObj.year &&
          month == behaviorMemoryObj.month
        ) {
          behaviorMonths[i].onclick();
        }
      }
    } else {
      behaviorMonths[0] && behaviorMonths[0].onclick();
    }

    getclass("date-choose-wrap-s")[0].onclick = function (event) {
      getBehaviorClass("date-choose")[0].style.display = "block";
      event.stopPropagation();
    };
    getBehaviorClass("date-choose")[0].onclick = function (event) {
      event.stopPropagation();
    };

    getBehaviorClass("date-choose-confirm")[0].onclick = function () {
      getBehaviorClass("date-choose")[0].style.display = "none";

      let dateFrom = getBehaviorClass("date-choose-from")[0].value;
      let dateTo = getBehaviorClass("date-choose-to")[0].value;

      let dateFromIndex = behaviorDate.length;
      let dateToIndex = -1;

      for (let i = 0; i < behaviorDate.length; i++) {
        if (dateFrom.replace("-", "") * 1 <= behaviorDate[i] * 1) {
          dateFromIndex = i;
          break;
        }
      }
      for (let i = 0; i < behaviorDate.length; i++) {
        if (dateTo.replace("-", "") * 1 >= behaviorDate[i] * 1) {
          dateToIndex = i;
        } else {
          break;
        }
      }
      behaviorAllObjs = [];
      var newArr = behaviorDate.slice(dateFromIndex, dateToIndex + 1);

      getBehaviorClass("behavior-date-begin")[0].innerHTML = dateFrom + "-01";

      getBehaviorClass("behavior-date-end")[0].innerHTML =
        dateTo + "-" + d(getDays(dateTo.split("-")[0], dateTo.split("-")[1]));
      getBehaviorClass("behavior-list-wrap")[0].innerHTML = "";

      newArr.reverse();
      for (let i = 0; i < newArr.length; i++) {
        let year = newArr[i].substring(0, 4);
        let month = newArr[i].substring(4, 6);

        renderBehavior(year, month, 1);
        let tem = behavior[year][month];
        behaviorAllObjs.push(...tem);
      }

      if (newArr[0]) {
        let year = newArr[0].substring(0, 4);
        let month = newArr[0].substring(4, 6);
        for (let j = 0; j < behaviorMonths.length; j++) {
          behaviorMonths[j].classList.remove("month-active");
          let atrYear = behaviorMonths[j].getAttribute("data-year");
          let atrMonth = behaviorMonths[j].getAttribute("data-month");
          if (year == atrYear && month == atrMonth) {
            behaviorMonths[j].classList.add("month-active");
          }
        }
      }
      if (newArr.length == 0) {
        getBehaviorClass("behavior-list-wrap")[0].innerHTML =
          "<p class='prompt'>There is nothing.</p>";
        for (let j = 0; j < behaviorMonths.length; j++) {
          behaviorMonths[j].classList.remove("month-active");
        }
      } else {
        calculateBehavior(behaviorAllObjs);
      }
    };
  }

  function renderBehavior(year, month, more) {
    let tem = behavior[year][month];
    tem.sort((a, b) => {
      return b.writeTime - a.writeTime;
    });
    let day = 0;
    let str = ``;
    let roundIsStart = true;
    let listDateStr = ``;
    if (!more) {
      getclass("behavior-list-wrap")[0].innerHTML = "";
    }

    function reaptFn() {
      listDateStr =
        `
<div class="list-date clearfix">
<div class="date">
<span class="day">${d(
          day
        )}</span>/<span class="s-month">${month}</span>/<span class="s-year">${year}</span>
</div>

</div>
` + str;
      getclass("behavior-list-wrap")[0].innerHTML += listDateStr;
    }
    function reaptFn1(i, temNumber, temNumberStr) {
      str = `<div class="list-box list-box-btn" data-year=${year} data-month=${month} data-fulltime=${tem[i]["writeTime"]}>  
<span class="name">${tem[i]["name"]}</span>
${temNumberStr}
<span class="s-remark">${tem[i]["remark"]}</span>
</div>`;
    }
    for (let i = 0; i < tem.length; i++) {
      let temNumber = tem[i]["number"] * 1;
      let temNumberStr = `<span class="number orange">+${temNumber}</span>`;

      let temday = tem[i]["date"];
      if (temday == day) {
        str += `<div class="list-box list-box-btn" data-year=${year} data-month=${month} data-fulltime=${tem[i]["writeTime"]}>
<span class="name">${tem[i]["name"]}</span>
${temNumberStr}
<span class="s-remark">${tem[i]["remark"]}</span>
</div>`;
      } else {
        if (roundIsStart) {
          roundIsStart = false;
          reaptFn1(i, temNumber, temNumberStr);
        } else {
          reaptFn();
          reaptFn1(i, temNumber, temNumberStr);
        }
      }

      day = temday;
    }
    reaptFn();
    if (!more) {
      let str1 = year + "-" + month + "-" + "01";
      let str2 = year + "-" + month + "-" + d(getDays(year, month));
      getclass("behavior-date-begin")[0].innerHTML = str1;
      getclass("behavior-date-end")[0].innerHTML = str2;
      getBehaviorClass("date-choose-from")[0].value = year + "-" + month;
      getBehaviorClass("date-choose-to")[0].value = year + "-" + month;
    }

    let listBoxes = getBehaviorClass("list-box-btn");
    for (let i = 0; i < listBoxes.length; i++) {
      listBoxes[i].onclick = function () {
        let theYear = this.getAttribute("data-year");
        let theMonth = this.getAttribute("data-month");
        let theFullTime = this.getAttribute("data-fulltime");
        let behaviorEditDiv = getclass("behavior-edit-div")[0];
        if (
          behaviorEditDiv &&
          behaviorEditDiv.getAttribute("data-fulltime") == theFullTime
        ) {
          behaviorEditDiv.remove();
        } else {
          if (behaviorEditDiv) {
            behaviorEditDiv.remove();
          }
          let theName = this.getElementsByClassName("name")[0].innerText;
          let theNumber = this.getElementsByClassName("number")[0].innerText;
          let theRemark = this.getElementsByClassName("s-remark")[0].innerText;

          let newDiv = document.createElement("div");
          newDiv.className = "behavior-edit-div";
          newDiv.setAttribute("data-fulltime", theFullTime);
          newDiv.innerHTML = `<div class="type-box behavior-edit-box">
        <div class="type-box-wrap">
          <ul class="type-box-ul clearfix">
            <li class="tb-li">
              <label for="">name</label>
              <span id="" class="" >
                <a href=""></a>
                <input class="input-select input-edit-select" readonly="" type="text" value="">
                <div class="select-wrap" style="display: none;">
                  <ul class="select-box behavior-select-options">
                  </ul>
                </span>
              </div>
            </li>
            <li class="tb-li">
              <label for="">times</label>
              <span id="" class="" >
                <input class="input-write input-edit-money" type="text" value="">
              </span>
            </li>
            <li class="tb-li">
              <label for="">remark</label>
              <span id="" class="">
                <input class="input-write remark input-edit-remark" type="text" value="" placeholder="click here to remark...">
              </span>
            </li>
            <li class="tb-li">
            <button class="behavior-delete-btn">delete</button>
            <button class="behavior-save-btn">save</button>
          </li>
          </ul>
        </div>
      </div>`;
          insertAfter(newDiv, this);
          getBehaviorClass("input-edit-select")[0].value = theName;
          getBehaviorClass("input-edit-money")[0].value = theNumber;
          getBehaviorClass("input-edit-remark")[0].value = theRemark;
          getclass("behavior-delete-btn")[0].onclick = function () {
            getclass("confirm-div")[0].style.display = "block";
            var promiseFn = new Promise(function (resolve, reject) {
              $("confirm-sure").onclick = function () {
                resolve("true");
              };
              $("confirm-cancel").onclick = function () {
                resolve("false");
              };
              getclass("confirm-close")[0].onclick = function () {
                resolve("false");
              };
            });
            promiseFn.then(function (result) {
              if (result == "true") {
                let arr = data["behavior"][theYear][theMonth];
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].writeTime == theFullTime) {
                    arr.splice(i, 1);
                    if (arr.length == 0) {
                      delete data["behavior"][theYear][theMonth];
                    }
                    writeFile(PathName, JSON.stringify(data));
                    renderBehaviorIndex();
                  }
                }
              }
              getclass("confirm-div")[0].style.display = "none";
            });
          };
          getclass("behavior-save-btn")[0].onclick = function () {
            if (getBehaviorClass("input-edit-money")[0].value == "") {
              return;
            }

            let arr = data["behavior"][theYear][theMonth];
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].writeTime == theFullTime) {
                arr[i].name = getBehaviorClass("input-edit-select")[0].value;
                arr[i].number = getBehaviorClass("input-edit-money")[0].value;
                arr[i].remark = getBehaviorClass("input-edit-remark")[0].value;
                writeFile(PathName, JSON.stringify(data));
                renderBehaviorIndex();
              }
            }
          };
          behaviorDataHandle();
          blindEvents();
        }
      };
    }
  }

  function behaviorDataHandle() {
    let names = data.behavior.subjects;
    let behaviorSelectStr = ``;
    for (let i = 0; i < names.length; i++) {
      behaviorSelectStr += `<li><span>${names[i]}</span></li>`;
    }

    let behaviorSelectOptions = getclass("behavior-select-options");
    for (let i = 0; i < behaviorSelectOptions.length; i++) {
      behaviorSelectOptions[i].innerHTML = behaviorSelectStr;
    }
  }

  $("behavior-save").onclick = function () {
    let number = getclass("behavior-money")[0].value;
    if (number == "") {
      return;
    }
    let obj = {
      date: time("date"),
      name: getclass("behavior-input-select")[0].value,
      number: number,
      remark: getclass("behavior-remark")[0].value,
      writeTime: time("full"),
    };
    saveData(obj, "behavior");
    behaviorMemoryObj = { year: time("year"), month: time("month") };
    getclass("behavior-month-box")[0].style.top = "0px";
    renderBehaviorIndex();
    getclass("behavior-input-select")[0].value = "fantacy";
    getclass("behavior-money")[0].value = "";
    getclass("behavior-remark")[0].value = "";
  };

  // bill ----------------------------------------------------

  var bill = data.bill;
  let billYearArr = [];
  let billDate = [];

  function renderBillIndex() {
    bill = data.bill;
    billYearArr = [];
    billDate = [];
    for (let i in bill) {
      if (i != "subjects") {
        billYearArr.push(i);
      }
    }
    billYearArr.reverse();

    billDataHandle();
    blindEvents();

    getBillClass("fc-month-box")[0].innerHTML = "";
    getclass("bill-list-wrap")[0].innerHTML =
      "<p class='prompt'>There is nothing.</p>";
    getclass("bill-total-payout")[0].innerHTML = "-0.00";
    getclass("bill-total-income")[0].innerHTML = "+0.00";
    getclass("bill-total-remain")[0].innerHTML = "0.00";
    for (let i = 0; i < billYearArr.length; i++) {
      let yearNum = billYearArr[i];
      let thisYearData = bill[yearNum];
      let montharr = [];
      for (let j in thisYearData) {
        montharr.push(j);
      }
      montharr.sort((a, b) => {
        return b * 1 - a * 1;
      });

      let yearStr = `<div class="year-${yearNum}"><div class="year-num">
            <div>${yearNum} year</div>
           </div>`;
      let monthStr = ``;
      for (let k = 0; k < montharr.length; k++) {
        billDate.unshift(yearNum + montharr[k]);
        let temArr = bill[yearNum][montharr[k]];
        let income = 0;
        let payout = 0;
        for (let y = 0; y < temArr.length; y++) {
          let number = temArr[y]["number"] * 1;
          if (number > 0) {
            income += number;
          }
          if (number < 0) {
            payout += number;
          }
        }

        monthStr += `
          <div class="month" data-year="${billYearArr[i]}" data-month="${
          montharr[k]
        }">
          <ul class="month-l">
            <li class="ml-income orange">
              <span>${formatM(income, "+")}</span>
            </li>
            <li class="ml-payout green">
              <span>${formatM(payout, "-")}</span>
            </li>
  
          </ul>
          <ul class="month-r">
            <li>
              <span class="month-num ">${montharr[k]}</span>
            </li>
          </ul>
        </div>
          `;
      }
      yearStr = yearStr + monthStr + `</div>`;
      getBillClass("fc-month-box")[0].innerHTML += yearStr;
    }
    getBillClass("fcy-box")[0].innerHTML = getBillClass("year-num")[0]
      ? getBillClass("year-num")[0].innerText
      : time("year") + " Year";
    let billMonths = getBillClass("month");
    for (let i = 0; i < billMonths.length; i++) {
      billMonths[i].onclick = function () {
        let year = this.getAttribute("data-year");
        let month = this.getAttribute("data-month");
        for (let j = 0; j < billMonths.length; j++) {
          billMonths[j].classList.remove("month-active");
        }
        this.classList.add("month-active");
        memoryObj = {
          year,
          month,
        };
        renderBill(year, month);
      };
    }

    if (memoryObj) {
      for (let i = 0; i < billMonths.length; i++) {
        let year = billMonths[i].getAttribute("data-year");
        let month = billMonths[i].getAttribute("data-month");
        if (year == memoryObj.year && month == memoryObj.month) {
          billMonths[i].onclick();
        }
      }
    } else {
      billMonths[0] && billMonths[0].onclick();
    }

    getBillClass("date-choose-wrap")[0].onclick = function (event) {
      getBillClass("date-choose")[0].style.display = "block";
      event.stopPropagation();
    };
    getBillClass("date-choose")[0].onclick = function (event) {
      event.stopPropagation();
    };

    getBillClass("date-choose-confirm")[0].onclick = function () {
      getBillClass("date-choose")[0].style.display = "none";

      let dateFrom = getBillClass("date-choose-from")[0].value;
      let dateTo = getBillClass("date-choose-to")[0].value;

      let dateFromIndex = billDate.length;
      let dateToIndex = -1;

      for (let i = 0; i < billDate.length; i++) {
        if (dateFrom.replace("-", "") * 1 <= billDate[i] * 1) {
          dateFromIndex = i;
          break;
        }
      }
      for (let i = 0; i < billDate.length; i++) {
        if (dateTo.replace("-", "") * 1 >= billDate[i] * 1) {
          dateToIndex = i;
        } else {
          break;
        }
      }

      var newArr = billDate.slice(dateFromIndex, dateToIndex + 1);

      getclass("bill-date-begin")[0].innerHTML = dateFrom + "-01";

      getclass("bill-date-end")[0].innerHTML =
        dateTo + "-" + d(getDays(dateTo.split("-")[0], dateTo.split("-")[1]));
      getclass("bill-list-wrap")[0].innerHTML = "";
      getclass("bill-total-payout")[0].innerHTML = "-0.00";
      getclass("bill-total-income")[0].innerHTML = "+0.00";
      getclass("bill-total-remain")[0].innerHTML = "0.00";
      newArr.reverse();
      for (let i = 0; i < newArr.length; i++) {
        let year = newArr[i].substring(0, 4);
        let month = newArr[i].substring(4, 6);

        renderBill(year, month, 1);
      }

      if (newArr[0]) {
        let year = newArr[0].substring(0, 4);
        let month = newArr[0].substring(4, 6);
        for (let j = 0; j < billMonths.length; j++) {
          billMonths[j].classList.remove("month-active");
          let atrYear = billMonths[j].getAttribute("data-year");
          let atrMonth = billMonths[j].getAttribute("data-month");
          if (year == atrYear && month == atrMonth) {
            billMonths[j].classList.add("month-active");
          }
        }
      }
      if (newArr.length == 0) {
        getclass("bill-list-wrap")[0].innerHTML =
          "<p class='prompt'>There is nothing.</p>";
        for (let j = 0; j < billMonths.length; j++) {
          billMonths[j].classList.remove("month-active");
        }
      }
    };
  }

  function renderBill(year, month, more) {
    let tem = bill[year][month];

    let incomeTotal = 0;
    let payoutTotal = 0;
    for (let y = 0; y < tem.length; y++) {
      let number = tem[y]["number"] * 1;
      if (number > 0) {
        incomeTotal += number;
      }
      if (number < 0) {
        payoutTotal += number;
      }
    }

    tem.sort((a, b) => {
      return b.writeTime - a.writeTime;
    });
    let day = 0;
    let income = 0;
    let getPayout = 0;
    let payout = 0;
    let str = ``;
    let roundIsStart = true;
    let listDateStr = ``;
    if (!more) {
      getclass("bill-list-wrap")[0].innerHTML = "";
    }

    function reaptFn() {
      listDateStr =
        `
<div class="list-date clearfix">
<div class="date">
<span class="day">${d(
          day
        )}</span>/<span class="s-month">${month}</span>/<span class="s-year">${year}</span>
</div>
<div class="total">
<div class="income">
payout:<span class="green">${formatM(getPayout, "-")}</span>
</div>
<div class="payout">
income:<span class="orange">${formatM(income, "+")}</span>
</div>
</div>
</div>
` + str;
      getclass("bill-list-wrap")[0].innerHTML += listDateStr;
      income = 0;
      getPayout = 0;
    }
    function reaptFn1(i, temNumber, temNumberStr) {
      if (temNumber >= 0) {
        income = temNumber;
      } else {
        getPayout = temNumber;
      }

      str = `<div class="list-box list-box-btn" data-year=${year} data-month=${month} data-fulltime=${tem[i]["writeTime"]}>  
<span class="name">${tem[i]["name"]}</span>
${temNumberStr}
<span class="s-remark">${tem[i]["remark"]}</span>
</div>`;
    }
    for (let i = 0; i < tem.length; i++) {
      let temNumber = tem[i]["number"] * 1;
      let temNumberStr = "";
      if (temNumber >= 0) {
        temNumberStr = `<span class="number orange">${formatM(
          temNumber,
          "+"
        )}</span>`;
      } else {
        temNumberStr = `<span class="number green">${formatM(
          temNumber,
          "-"
        )}</span>`;
      }

      let temday = tem[i]["date"];
      if (temday == day) {
        if (temNumber >= 0) {
          income += temNumber;
        } else {
          getPayout += temNumber;
        }

        str += `<div class="list-box list-box-btn" data-year=${year} data-month=${month} data-fulltime=${tem[i]["writeTime"]}>
<span class="name">${tem[i]["name"]}</span>
${temNumberStr}
<span class="s-remark">${tem[i]["remark"]}</span>
</div>`;
      } else {
        if (roundIsStart) {
          roundIsStart = false;
          reaptFn1(i, temNumber, temNumberStr);
        } else {
          reaptFn();
          reaptFn1(i, temNumber, temNumberStr);
        }
      }

      day = temday;
    }
    reaptFn();
    if (!more) {
      let str1 = year + "-" + month + "-" + "01";
      let str2 = year + "-" + month + "-" + d(getDays(year, month));
      getclass("bill-date-begin")[0].innerHTML = str1;
      getclass("bill-date-end")[0].innerHTML = str2;
      getBillClass("date-choose-from")[0].value = year + "-" + month;
      getBillClass("date-choose-to")[0].value = year + "-" + month;
    }
    //calculate total
    if (more) {
      payoutTotal =
        payoutTotal + parseFloat(getclass("bill-total-payout")[0].innerHTML);
      incomeTotal =
        incomeTotal + parseFloat(getclass("bill-total-income")[0].innerHTML);
    }
    getclass("bill-total-payout")[0].innerHTML = formatM(payoutTotal, "-");
    getclass("bill-total-income")[0].innerHTML = formatM(incomeTotal, "+");
    getclass("bill-total-remain")[0].innerHTML = formatM(
      incomeTotal + payoutTotal
    );

    let listBoxes = getBillClass("list-box-btn");
    for (let i = 0; i < listBoxes.length; i++) {
      listBoxes[i].onclick = function () {
        let theYear = this.getAttribute("data-year");
        let theMonth = this.getAttribute("data-month");
        let theFullTime = this.getAttribute("data-fulltime");
        let billEditDiv = getclass("bill-edit-div")[0];
        if (
          billEditDiv &&
          billEditDiv.getAttribute("data-fulltime") == theFullTime
        ) {
          billEditDiv.remove();
        } else {
          if (billEditDiv) {
            billEditDiv.remove();
          }
          let theName = this.getElementsByClassName("name")[0].innerText;
          let theNumber = this.getElementsByClassName("number")[0].innerText;
          let theRemark = this.getElementsByClassName("s-remark")[0].innerText;

          let newDiv = document.createElement("div");
          newDiv.className = "bill-edit-div";
          newDiv.setAttribute("data-fulltime", theFullTime);
          newDiv.innerHTML = `<div class="type-box bill-edit-box">
        <div class="type-box-wrap">
          <ul class="type-box-ul clearfix">
            <li class="tb-li">
              <label for="">name</label>
              <span id="" class="" >
                <a href=""></a>
                <input class="input-select input-edit-select" readonly="" type="text" value="">
                <div class="select-wrap" style="display: none;">
                  <ul class="select-box bill-select-options">
                  </ul>
                </span>
              </div>
            </li>
            <li class="tb-li">
              <label for="">money</label>
              <span id="" class="" >
                <input class="input-write input-edit-money" type="text" value="">
              </span>
            </li>
            <li class="tb-li">
              <label for="">remark</label>
              <span id="" class="">
                <input class="input-write remark input-edit-remark" type="text" value="" placeholder="click here to remark...">
              </span>
            </li>
            <li class="tb-li">
            <button class="bill-delete-btn">delete</button>
            <button class="bill-save-btn">save</button>
          </li>
          </ul>
        </div>
      </div>`;
          insertAfter(newDiv, this);
          getBillClass("input-edit-select")[0].value = theName;
          getBillClass("input-edit-money")[0].value = theNumber;
          getBillClass("input-edit-remark")[0].value = theRemark;
          getBillClass("bill-delete-btn")[0].onclick = function () {
            getclass("confirm-div")[0].style.display = "block";
            var promiseFn = new Promise(function (resolve, reject) {
              $("confirm-sure").onclick = function () {
                resolve("true");
              };
              $("confirm-cancel").onclick = function () {
                resolve("false");
              };
              getclass("confirm-close")[0].onclick = function () {
                resolve("false");
              };
            });
            promiseFn.then(function (result) {
              if (result == "true") {
                let arr = data["bill"][theYear][theMonth];
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].writeTime == theFullTime) {
                    arr.splice(i, 1);
                    if (arr.length == 0) {
                      delete data["bill"][theYear][theMonth];
                    }

                    writeFile(PathName, JSON.stringify(data));
                    renderBillIndex();
                  }
                }
              }
              getclass("confirm-div")[0].style.display = "none";
            });
          };
          getclass("bill-save-btn")[0].onclick = function () {
            if (getBillClass("input-edit-money")[0].value == "") {
              return;
            }

            let arr = data["bill"][theYear][theMonth];
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].writeTime == theFullTime) {
                arr[i].name = getBillClass("input-edit-select")[0].value;
                arr[i].number = getBillClass("input-edit-money")[0].value;
                arr[i].remark = getBillClass("input-edit-remark")[0].value;
                writeFile(PathName, JSON.stringify(data));
                renderBillIndex();
              }
            }
          };
          billDataHandle();
          blindEvents();
        }
      };
    }
  }

  function billDataHandle() {
    let names = data.bill.subjects;
    let billSelectStr = ``;
    for (let i = 0; i < names.length; i++) {
      billSelectStr += `<li><span>${names[i]}</span></li>`;
    }

    let billSelectOptions = getclass("bill-select-options");
    for (let i = 0; i < billSelectOptions.length; i++) {
      billSelectOptions[i].innerHTML = billSelectStr;
    }
  }

  $("bill-save").onclick = function () {
    let number = getclass("bill-money")[0].value;
    if (number == "") {
      return;
    }
    let obj = {
      date: time("date"),
      name: getclass("bill-input-select")[0].value,
      number: number,
      remark: getclass("bill-remark")[0].value,
      writeTime: time("full"),
    };
    saveData(obj, "bill");
    memoryObj = { year: time("year"), month: time("month") };
    getclass("bill-month-box")[0].style.top = "0px";
    renderBillIndex();
    getclass("bill-input-select")[0].value = "food";
    getclass("bill-money")[0].value = "";
    getclass("bill-remark")[0].value = "";
  };

  // home ----------------------------------------------------

  let divArr = ["home", "bill", "behavior", "diary"];
  let navBtns = getclass("nav-btn");
  let parentLis = getclass("header-nav-item");
  let remberNavbtn = -1;
  let autoQuit = null;
  for (let i = 0; i < navBtns.length; i++) {
    navBtns[i].onclick = function () {
      let name = this.getAttribute("data-name");
      for (let j = 0; j < divArr.length; j++) {
        $(divArr[j]).style.display = "none";
      }
      getclass("login-div")[0].style.display = "none";
      for (let j = 0; j < parentLis.length; j++) {
        parentLis[j].className = "header-nav-item";
      }
      getclass("header-nav-item-info")[0].classList.remove("active");

      if (name != "home" && !isAuth) {
        getclass("user-login")[0].onclick();
        remberNavbtn = i;
        return;
      }

      if (name == "diary") {
        renderDiary(getclass("diary-nav-animation")[0].innerText);
      } else if (name == "bill") {
        renderBillIndex();
      } else if (name == "behavior") {
        renderBehaviorIndex();
      }
     
      if(name != "music"){
        $(name).style.display = "block";
        parentLis[i].className = "header-nav-item active";
  
      }
      if (name == "home") {
        getclass("banner")[0].style.height =
          getclass("slide-item")[0].offsetHeight + "px";
      }
    };
  }

  // login------
  getclass("user-login")[0].onclick = function () {
    for (let j = 0; j < parentLis.length; j++) {
      parentLis[j].className = "header-nav-item";
    }
    getclass("header-nav-item-info")[0].classList.add("active");

    // this.style.display="none"
    // getclass("user-name")[0].style.display="inline-block"
    getclass("home-div")[0].style.display = "none";
    getclass("login-div")[0].style.display = "block";
    $("psd").focus();
  };
  function cancelAutoQuit() {
    clearTimeout(autoQuit);
    autoQuit = setTimeout(() => {
      getclass("user-logout-btn")[0].onclick();
    }, 1000 * 60 * 20);
  }
  function loginFn() {
    var answer = ipcRenderer.sendSync("checkPsd", {
      name: TheVersion,
      value: $("psd").value,
    });
    if (!answer.isAuth) {
      return;
    }

    LoginTime = answer.time;
    var content = ipcRenderer.sendSync("readData", {
      readPath: PathName,
    });
    if (content.err) {
      alert(content.err);
      return;
    } else {
      data = JSON.parse(getStr(content.data));
    }

    isAuth = true;
    $("psd").value = "";
    getclass("home-div")[0].style.display = "block";
    getclass("login-div")[0].style.display = "none";
    getclass("user-login")[0].style.display = "none";
    getclass("user-name")[0].style.display = "inline-block";
    getclass("user-logout")[0].style.display = "inline-block";
    getclass("header-nav-item-info")[0].classList.remove("active");

    
    $("hide-li1").style.display="list-item"
    $("hide-li2").style.display="list-item"
    $("hide-li3").style.display="list-item"



    if (remberNavbtn > -1) {
      navBtns[remberNavbtn].onclick();
    }
    cancelAutoQuit();

  
  }
  $("psd").onkeydown = function (ev) {
    if (ev.key == "Enter") {
      loginFn();
    }
  };
  $("login").onclick = function () {
    loginFn();
  };
  getclass("user-logout-btn")[0].onclick = function () {
    ipcRenderer.sendSync("isLogout", { name: TheVersion });
    window.location.reload();
  };
  // common ----------------------------------------------------

  let selectInputs = getclass("input-select");

  function blindEvents() {
    for (let i = 0; i < selectInputs.length; i++) {
      selectInputs[i].onfocus = function () {
        for (let i = 0; i < selectInputs.length; i++) {
          selectInputs[i].parentNode.className = "";
          selectInputs[i].nextElementSibling.style.display = "none";
        }
        this.parentNode.className = "highlight-border";
        this.nextElementSibling.style.display = "block";
      };
      selectInputs[i].parentNode.onclick = function (event) {
        event.stopPropagation();
      };
      let btns = selectInputs[i].nextElementSibling.getElementsByTagName("li");
      for (let j = 0; j < btns.length; j++) {
        btns[j].onclick = function () {
          this.parentNode.parentNode.previousElementSibling.value =
            this.innerText;
          this.parentNode.parentNode.style.display = "none";
          this.parentNode.parentNode.parentNode.className = "";
        };
      }
    }
  }
  blindEvents();
  document.onclick = function () {
    cancelAutoQuit();
    let dateChoose = getclass("date-choose");
    for (let i = 0; i < dateChoose.length; i++) {
      const element = dateChoose[i];
      element.style.display = "none";
    }
    for (let i = 0; i < selectInputs.length; i++) {
      selectInputs[i].parentNode.className = "";
      selectInputs[i].nextElementSibling.style.display = "none";
    }
  };
  document.onkeydown = function () {
    cancelAutoQuit();
  };

  //frc-next page
  let frcPrev = getclass("frc-prev");
  let frcNext = getclass("frc-next");
  for (let i = 0; i < frcPrev.length; i++) {
    const item = frcPrev[i];
    let monthBox = item.parentNode.getElementsByClassName("fc-month-box")[0];
    item.onclick = function () {
      let top = parseFloat(monthBox.style.top);
      let len = monthBox.offsetHeight;
      top -= 35;
      if (top < -len + 466) {
        return;
      }
      monthBox.style.top = top + "px";
      yearScroll(top, i);
    };
  }

  for (let i = 0; i < frcNext.length; i++) {
    const item = frcNext[i];
    let monthBox = item.parentNode.getElementsByClassName("fc-month-box")[0];
    item.onclick = function () {
      let top = parseFloat(monthBox.style.top);
      let len = monthBox.offsetHeight;
      top += 35;
      if (top > 15) {
        return;
      }
      monthBox.style.top = top + "px";
      yearScroll(top, i);
    };
  }

  let fcMonths = getclass("fc-month");
  for (let i = 0; i < fcMonths.length; i++) {
    const element = fcMonths[i];
    element.onmousewheel = function (event) {
      let div = this.getElementsByClassName("fc-month-box")[0];
      let top = parseFloat(div.style.top);

      if (event.wheelDelta > 0) {
        top = top + 35;
        if (top > 15) {
          return false;
        }
      } else {
        top -= 35;
        if (top < -div.offsetHeight + 466) {
          return false;
        }
      }
      div.style.top = top + "px";
      yearScroll(top, i);

      return false;
    };
  }

  function yearScroll(top, index) {
    let yearClassArr = ["year-num", "year-num-s"];
    let frcClassArr = ["fcy-box", "fcy-box-s"];
    let oldYear = "2022";
    let yearDiv = getclass(yearClassArr[index]);
    if (yearDiv.length > 1) {
      if (-top < yearDiv[1].offsetTop - 125) {
        oldYear = yearDiv[0].innerText;
        getclass(frcClassArr[index])[0].innerHTML = oldYear;
      }
      for (let i = 0; i < yearDiv.length - 1; i++) {
        if (
          -top >= yearDiv[i + 1].offsetTop - 125 &&
          (!yearDiv[i + 2] || -top < yearDiv[i + 2].offsetTop - 125)
        ) {
          if (oldYear != yearDiv[i + 1].innerText) {
            oldYear = yearDiv[i + 1].innerText;

            getclass(frcClassArr[index])[0].innerHTML = oldYear;
          }
        }
      }
    }
  }
  let divHideTimer = null;
  let mp3Div = getclass("mp3")[0];
  let audio=$("mp3")
  getclass("music-btn")[0].onmouseover = mp3Div.onmouseover = function () {
    clearTimeout(divHideTimer);
    mp3Div.style.display = "block";
  };
  getclass("music-btn")[0].onmouseleave = mp3Div.onmouseleave = function () {
    divHideTimer = setTimeout(() => {
      mp3Div.style.display = "none";
    }, 600);
  };
var fs=require("fs")
function readMusic(val) {
    let arrFiles = [];
    const files = fs.readdirSync(val);
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
   
      const stat = fs.lstatSync(val + "\\" + item);
      if (stat.isDirectory() === true) {
        arrFiles = arrFiles.concat(readMusic(val + "\\" + item));
      } else {
        var reg = /^.*\.mp3$/;
        if (reg.test(item) ) {
       
          arrFiles.push(val + "\\" + item);
        }
      }
    }
    return arrFiles;
  }
 var musicFiles= readMusic("D:\\我的文档\\Music")
 let musicStr=``
  for(let i=0;i<musicFiles.length;i++){
    let songName=musicFiles[i].split(" - ")[1].replace(".mp3","")
    musicStr+=`
    <li class="music-li music-ready"> 
    <div class="song-name">${songName}</div>
    <div class="song-oprate">
      <span class="iconfont iconfont-set icon-bofang" >
      </span>
      <div class="xui-playing" style="display:none"><i></i>&nbsp;<i></i>&nbsp;<i></i>&nbsp;<i></i></div>
    </div>
  </li>
    `
  }
  getclass("music-wrap")[0].innerHTML=musicStr
  let musicLis=getclass("music-li")
  let xuiPlayingDivs= getclass("xui-playing")
  for(let i=0;i<musicLis.length;i++){
  
    musicLis[i].onclick=function(){
      if(musicLis[i].className.indexOf("music-playing")==-1){
      audio.src=musicFiles[i]
      audio.play()
      for(let j=0;j<musicLis.length;j++){
        musicLis[j].className="music-li music-ready"      
      }
      musicLis[i].className="music-li music-playing"
      for(let j=0;j<xuiPlayingDivs.length;j++){
        xuiPlayingDivs[j].style.display="none"
      }
      xuiPlayingDivs[i].style.display="inline-block"
    }else{
      audio.pause();
      musicLis[i].className="music-li music-ready"
      xuiPlayingDivs[i].style.display="none"
    }
    }

  }


})();
