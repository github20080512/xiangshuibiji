var oPlanTod = {
  "1": {
    time: "02:30",
    mission: "push up/Climbing stairs",
    status: "unchoose",
  },
  "2": { time: "04:00", mission: "enter songs lyrics", status: "unchoose" },
  "3": {
    time: "06:15",
    mission: "push up/Climbing stairs",
    status: "unchoose",
  },
  "4": {
    time: "08:15",
    mission: "Standing by the wall and learning 2hours/wash clothes,watch mv",
    status: "unchoose",
  },
};
var oPlanFut = {
  "1": { time: "2020-11-20", mission: "lose weight", status: "unchoose" },

};
var check = {
  Doubt: { times: 1, lasttime: "2020/7/20 00:43:59" },
};
var duration = {
  "To 2024": "2021/01/01 00:00:00",
};

//----------------------------------------------------------------------------------------------------
// up  copy Paste area==============================================================================
//----------------------------------------------------------------------------------------------------
function $(c) {
  return document.getElementsByClassName(c);
}

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}

function startMove(obj, json, fnEnd) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var bStop = true;
    for (var attr in json) {
      var cur = 0;
      if (attr == "opacity") {
        cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        cur = parseInt(getStyle(obj, attr));
      }
      var speed = (json[attr] - cur) / 5;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (cur != json[attr]) {
        bStop = false;
      }

      if (attr == "opacity") {
        obj.style.opacity = (cur + speed) / 100;
      } else {
        obj.style[attr] = cur + speed + "px";
      }
    }

    if (bStop) {
      clearInterval(obj.timer);
      if (fnEnd) fnEnd();
    }
  }, 30);
}

function stopEventBubble(event) {
  var e = event || window.event;

  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}

function add0(m) {
  return m < 10 ? "0" + m : m;
}
//tools

//slide show
var slideTimer = null;
var oDivSlide_show = $("slide_show")[0];
var oBigPic = $("big_pic")[0];
var aBic_picLi = oBigPic.getElementsByTagName("li");
var oPrew = $("prew")[0];
var oNext = $("next")[0];
var oDiv_bottom = $("bottom")[0];
var aButton = oDiv_bottom.getElementsByTagName("button");
var nowIndex = 0;

oDivSlide_show.onmouseover = function () {
  startMove(oPrew, { opacity: 50 });
  startMove(oNext, { opacity: 50 });
};
oDivSlide_show.onmouseenter = function () {
  clearInterval(slideTimer);
  slideTimer = null;
};
oDivSlide_show.onmouseleave = function () {
  slideStop();
};
oDivSlide_show.onmouseout = function () {
  startMove(oPrew, { opacity: 0 });
  startMove(oNext, { opacity: 0 });
};
oNext.onmouseover = oPrew.onmouseover = function () {
  startMove(oPrew, { opacity: 50 });
  startMove(oNext, { opacity: 50 });
  startMove(this, { opacity: 100 });

  stopEventBubble(event);
};
function slideStop() {
  if (slideTimer == null) {
    slideTimer = setInterval(oNext.onclick, 3000);
  }
}
function slide() {
  for (var i = 0; i < aButton.length; i++) {
    aButton[i].className = "circle";
    aBic_picLi[i].style.display = "none";
    aBic_picLi[i].style.opacity = 0.4;
  }
  aButton[nowIndex].className = "circle_back";
  aBic_picLi[nowIndex].style.display = "block";
  startMove(aBic_picLi[nowIndex], { opacity: 100 });
}

oPrew.onclick = function () {
  nowIndex--;
  if (nowIndex == -1) {
    nowIndex = 3;
  }
  slide();
};
oNext.onclick = function () {
  nowIndex++;
  if (nowIndex == aBic_picLi.length) {
    nowIndex = 0;
  }

  slide();
};
slideStop();
for (var i = 0; i < aButton.length; i++) {
  aButton[i].but_index = i;
  aButton[i].onclick = function () {
    nowIndex = this.but_index;

    slide();
  };
}

// window.onscroll = window.onresize = function () {

// };

//make plan++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var oPlan = oPlanTod;
var oMission_time = $("mission_time")[0];
var oMission_content = $("mission_content")[0];
var oPlan_new_area = $("plan_new_area")[0];

var oAdd_new = $("add_new")[0];
var oHide_new = $("hide_new")[0];
var planSetAr = $("plan-set-area")[0];
var showNew = $("show-plan-set")[0];
var beT = true;
var nu = 0;
var planTodBut = $("plan-today-but")[0];
var planFutBut = $("plan-future-but")[0];

planTodBut.onclick = function () {
  this.style.color = "gold";
  planFutBut.style.color = "grey";
  document.getElementById("plan-year-type").style.display = "none";
  document.getElementById("plan-day-type").style.display = "block";
  oMission_time = $("mission_time")[0];

  oPlan = oPlanTod;
  plan_inner();
};
planFutBut.onclick = function () {
  planTodBut.style.color = "grey";
  this.style.color = "gold";
  document.getElementById("plan-year-type").style.display = "block";
  document.getElementById("plan-day-type").style.display = "none";
  oMission_time = $("mission_time")[1];
  oPlan = oPlanFut;
  plan_inner();
};

oAdd_new.onclick = function () {
  if (oMission_content.value == "") {
    return;
  }
  var oPlanArr = [];

  for (var attr in oPlan) {
    oPlanArr.push(attr);
  }
  nu = oPlanArr.length + 1;
  var time_value = oMission_time.value;

  oPlan[nu] = {
    time: time_value,
    mission: oMission_content.value,
    status: "unchoose",
  };

  plan_inner();

  oMission_content.value = "";
  nu++;
};
oHide_new.onclick = function () {
  planSetAr.style.display = "none";
};
showNew.onclick = function () {
  planSetAr.style.display = "block";
};

function plan_inner() {
  oPlan_new_area.innerHTML = "";
  var oPlan_arr = [];

  for (var attr in oPlan) {
    oPlan_arr.push(attr);
  }
  oPlan_arr.sort();
  if (oPlan_arr.length == 0) {
    planSetAr.style.display = "block";
    return;
  }
  var idIndex = 1;
  for (var i = 0; i < oPlan_arr.length; i++) {
    var chooseRes = "";
    if (oPlan[oPlan_arr[i]]["status"] == "unchoose") {
      chooseRes = ` <div class="plan-icon-wrap"> <i class="iconfont icon-wancheng1 wancheng-but"></i> </div> <div class="plan-icon-wrap"><i class="iconfont icon-weiwancheng weiwancheng-but"></i> </div> <div class="plan-icon-wrap"><i class="iconfont icon-shanchu shanchu-but"></i></div>`;
    } else if (oPlan[oPlan_arr[i]]["status"] == "complete") {
      chooseRes = ` <div class="plan-icon-wrap"> <i class="iconfont icon-wancheng1 status-com"></i>  </div> <div class="plan-icon-wrap"> </div> <div class="plan-icon-wrap"><i class="iconfont icon-shanchu shanchu-but"></i></div>`;
    } else if (oPlan[oPlan_arr[i]]["status"] == "uncomplete") {
      chooseRes = `<div class="plan-icon-wrap"></div><div class="plan-icon-wrap"><i class="iconfont icon-weiwancheng status-uncom"></i></div>  <div class="plan-icon-wrap"><i class="iconfont icon-shanchu shanchu-but"></i></div>`;
    }

    var oDiv = document.createElement("div");
    oDiv.className = "plan-iterms";
    oDiv.innerHTML =
      `
    <div class="iterm clearfix">
    <span class="No">` +
      idIndex +
      `.</span>
    <span class="time">` +
      oPlan[oPlan_arr[i]]["time"] +
      `</span>
    <div class="content">` +
      oPlan[oPlan_arr[i]]["mission"] +
      `</div>
    <div class="confirm"  oPlanId="` +
      oPlan_arr[i] +
      `">` +
      chooseRes +
      `
    </div>
  </div>`;
    oPlan_new_area.appendChild(oDiv);
    idIndex++;
  }

  //delete iterms
  var planOpenDel = $("delete")[0];
  var planIterms = $("plan-iterms");
  var deleteButs = $("shanchu-but");

  planOpenDel.onclick = function () {
    if (beT) {
      for (var i = 0; i < deleteButs.length; i++) {
        deleteButs[i].style.display = "block";
      }
      beT = false;
      this.className = "delete-on";
    } else {
      for (var i = 0; i < deleteButs.length; i++) {
        deleteButs[i].style.display = "none";
      }
      beT = true;
      this.className = "delete";
    }
  };

  for (var i = 0; i < deleteButs.length; i++) {
    if (!beT) {
      deleteButs[i].style.display = "block";
    } else {
      deleteButs[i].style.display = "none";
    }
    deleteButs[i].index = i;
    deleteButs[i].onclick = function () {
      var text = this.parentNode.parentNode.getAttribute("oplanid");
      delete oPlan[text]; //changeit
      plan_inner();
    };
  }

  getButs();
}

plan_inner();

//plan    set remind
var oPlan_remind = $("remind")[0];
var beTrue = true;
var timer_plan = "";
oPlan_remind.onclick = function () {
  if (beTrue) {
    this.className = "remind_on";
    timer_plan = setInterval(oclock, 1000);
    beTrue = false;
  } else {
    clearInterval(timer_plan);
    this.className = "remind";
    beTrue = true;
  }
};

function oclock() {
  var surtime = new Date();
  var surtimeStr =
    add0(surtime.getHours()) +
    ":" +
    add0(surtime.getMinutes()) +
    ":" +
    add0(surtime.getSeconds());
  var oPlan_new_time = oPlan_new_area.getElementsByClassName("time");
  for (var i = 0; i < oPlan_new_time.length; i++) {
    if (surtimeStr == oPlan_new_time[i].innerHTML) {
      oPlan_new_time[i].parentNode.style.background = "#e5ffda";
    }
  }
}
// choose  the  complete or uncomplete options

function getButs() {
  var wanchengButs = $("wancheng-but");
  var weiwanchengButs = $("weiwancheng-but");
  for (var i = 0; i < wanchengButs.length; i++) {
    wanchengButs[i].onclick = function () {
      var text = this.parentNode.parentNode.getAttribute("oplanid");
      oPlan[text]["status"] = "complete";
      plan_inner();
    };
    weiwanchengButs[i].onclick = function () {
      var text = this.parentNode.parentNode.getAttribute("oplanid");
      oPlan[text]["status"] = "uncomplete";
      plan_inner();
    };
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// //change the pages
var changePageButs = $("change-pages");
var pages = $("page");
for (var i = 0; i < changePageButs.length; i++) {
  changePageButs[i].index = i;
  changePageButs[i].onclick = function () {
    for (var i = 0; i < changePageButs.length; i++) {
      pages[i].style.display = "none";
    }
    pages[this.index].style.display = "block";
  };
}

// change words_ad

var oWords_ad = $("words_ad")[0];
var arr = [
  "<p>Are you bored?<br><span>Talk to me to know more</span></p>",
  "<p>Are you poor?<br><span>There must be a method to get rich...</span></p>",
  "<p>Are you tired?<br><span>as a human,he is easy to be tired,but he shoud have faith</span></p>",
];
var setNum = 0;

function changeWords() {
  oWords_ad.style.opacity = 0;
  oWords_ad.innerHTML = arr[setNum];
  startMove(oWords_ad, {
    opacity: 100,
  });
  setNum++;
  if (setNum == 3) {
    setNum = 0;
  }
}
changeWords();
setInterval(changeWords, 3000);

function onChange() {
  oCss_i.style.color = "#1976d2";
  oCss_i1.style.color = "#1976d2";
}

function loseFocus() {
  oCss_i.style.color = "grey";
  oCss_i1.style.color = "grey";
}
var oTalk_input0 = $("talk_input_0")[0];
var oTalk_input = $("talk_input_1")[0];
var oCss_i = $("icon-changyongicon-0")[0];

var oCss_i1 = $("icon-changyongicon-1")[0];
var otalk_txt = $("talk_txt")[0];
var oHome_page = $("home_page")[0];
var oTalk_page = $("talk_page")[0];
var chat = {
  boring: "did you have lots of time to say'boring'?",

};
var otherChat = [
  "The weather is very good today, your mood should be calm",
  "Everything will disappear, your life, your mood, your destiny",
  "wish you be happy",
  "wish you be with blue",
];

function talk_inner(a) {
  var herWords = "";
  var optionsArr = [];
  for (var options in chat) {
    if (a.indexOf(options) != -1) {
      optionsArr.push(options);
    }
  }
  if (optionsArr.length != 0) {
    var chatNum = Math.floor(Math.random() * optionsArr.length);
    herWords = chat[optionsArr[chatNum]];
  } else {
    var chatNum = Math.floor(Math.random() * otherChat.length);
    herWords = otherChat[chatNum];
  }
  var oDiv = document.createElement("div");
  oDiv.className = "iterm_right  clearfix";
  oDiv.innerHTML =
    `<div class="iterm_container"><div class="box">` +
    a +
    `</div><div class="line"></div></div>`;
  otalk_txt.appendChild(oDiv);
  var oDiv = document.createElement("div");
  oDiv.className = "iterm";
  oDiv.innerHTML =
    `<div class="line"></div><div class="box">` + herWords + `</div>`;
  otalk_txt.appendChild(oDiv);
  oTalk_input.value = "";
  otalk_txt.scrollTop = 10000;
}
oCss_i1.onclick = function () {
  talk_inner(oTalk_input.value);
};
oCss_i.onclick = function () {
  if (oTalk_input0.value == "") {
    return;
  }
  talk_inner(oTalk_input0.value);
  oTalk_input0.value = "";
  oHome_page.style.display = "none";
  oTalk_page.style.display = "block";
};
oTalk_input.onkeydown = function (ev) {
  var oEvent = ev || event;
  if (oEvent.keyCode == 13) {
    talk_inner(oTalk_input.value);
  }
};
oTalk_input0.onkeydown = function (ev) {
  var oEvent = ev || event;
  if (oEvent.keyCode == 13) {
    if (oTalk_input0.value == "") {
      return;
    }
    talk_inner(oTalk_input0.value);
    oTalk_input0.value = "";
    oHome_page.style.display = "none";
    oTalk_page.style.display = "block";
  }
};
//forbid========================================================================
function infoClose() {
  oInfo.style.display = "none";
  addDurInp.style.display = "none";
}
var oInfo = $("grey")[0];
var oLeft_button = $("left_button")[0];
var oRight_button = $("right_button")[0];
var oLeft = $("ulLeft")[0];
var oRight = $("ulRight")[0];

var delForbid = $("delete")[2];
var delForJud = true;
// var checkStr = `{` + `{{name}}`.replace(/&#34;/g, '"') + `}`;
// var check = JSON.parse(checkStr);
forbidDis();

function forbidDis() {
  oLeft.innerHTML = "";
  oRight.innerHTML = "";
  var arrAtti = [];

  for (var atti in check) {
    arrAtti.push(atti);
  }

  var checkLen = arrAtti.length;
  for (var i = 0; i < checkLen; i++) {
    var aLi = document.createElement("li");
    oLeft.appendChild(aLi);
    var aLi = document.createElement("li");
    oRight.appendChild(aLi);
  }

  var aLeftLi = oLeft.getElementsByTagName("li");
  var aRightLi = oRight.getElementsByTagName("li");

  for (var no = 0; no < checkLen; no++) {
    aLeftLi[no].innerText = arrAtti[no];
    aLeftLi[no].index = no;
    aRightLi[no].innerHTML =
      `<span class="forbid-num">` +
      check[arrAtti[no]]["times"] +
      '</span><div class="shape-wrapper"><div class="shape"><div class="inshape" style="width:0px"></div></div></div><div class="fob-lasttime">' +
      calTimes(check[arrAtti[no]]["lasttime"]) +
      '</div><div class="forbid-icon-wrap"><i class="iconfont icon-shanchu del-but" ></i></div>';
    $("inshape")[no].style.width = check[arrAtti[no]]["times"] * 6 + "px";
    aLeftLi[no].onclick = function () {
      var oNumber = this.index;
      var oInnerText = this.innerText;

      oInfo.style.display = "block";
      $("infoInner")[0].innerHTML = `Were you tired? Did you forget?`;
      oLeft_button.onclick = function () {
        check[oInnerText]["times"]++;
        oInfo.style.display = "none";
        check[oInnerText]["lasttime"] = getComTime();
        forbidDis();
      };
      oRight_button.onclick = function () {
        oInfo.style.display = "none";
      };
    };
  }
  //add new forbid project
  var addForBut = $("add-forbid")[0];
  addForBut.onclick = function () {
    oInfo.style.display = "block";
    $("infoInner")[0].innerHTML = `<input class="forbid-input">`;
    oLeft_button.onclick = function () {
      if ($("forbid-input")[0].value == "") {
        return;
      }
      check[$("forbid-input")[0].value] = {
        times: 0,
        lasttime: "",
      };
      $("forbid-input")[0].value = "";
      oInfo.style.display = "none";
      forbidDis();
    };
    oRight_button.onclick = function () {
      oInfo.style.display = "none";
    };
  };

  var delButs = $("del-but");
  if (!delForJud) {
    for (var i = 0; i < delButs.length; i++) {
      delButs[i].style.display = "block";
    }
  }
  delForbid.onclick = function () {
    if (delForJud) {
      this.className = "delete-on";
      delForJud = false;
      for (var i = 0; i < delButs.length; i++) {
        delButs[i].style.display = "block";
      }
    } else {
      this.className = "delete";
      delForJud = true;
      for (var i = 0; i < delButs.length; i++) {
        delButs[i].style.display = "none";
      }
    }
  };

  for (var i = 0; i < delButs.length; i++) {
    delButs[i].index = i;
    delButs[i].onclick = function () {
      delete check[aLeftLi[this.index].innerText];
      forbidDis();
    };
  }
}

function getComTime() {
  var surtime = new Date();
  var surtimeStr =
    add0(surtime.getHours()) +
    ":" +
    add0(surtime.getMinutes()) +
    ":" +
    add0(surtime.getSeconds());
  var surYearMonth =
    surtime.getFullYear() +
    "/" +
    (surtime.getMonth() + 1) +
    "/" +
    surtime.getDate();
  return surYearMonth + " " + surtimeStr;
}
//set word;
var arrPic = [
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587972701518&di=4edaebd959e506a84b2cf92bb1f99025&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1303%2F04%2Fc3%2F18599888_18599888_1362364530218.jpg",
  "http://hbimg.b0.upaiyun.com/2396b3bd33ee77b964dfc0c2e6677163dbfdaa1a87752-vGG3sH_fw658",
  "https://drscdn.500px.org/photo/244257383/q%3D80_m%3D2000_k%3D1/v2?sig=8a8e605368878cc052d2e5b9c223356683fe7992f9e91dfbbe119ce61f5f3d3e",
  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588070745370&di=dab730d2327668e5aed046e3e0169812&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170911%2F296ae7a7d1134cec9aea91704bc6225e.jpeg",
  "https://drscdn.500px.org/photo/156614247/q%3D80_m%3D2000/v2?sig=759393457fcc8900d3e71c9882468c0efa480a6f3e2ef678f814ff5d8f1eae32",
  "http://image1.nphoto.net/news/image/202004/d0245974c3103e87.jpg",
  "https://drscdn.500px.org/photo/185001499/m%3D2048/v2?sig=f5e0b56e7efab1436bc326b96b1fab8f6c88a029b49c64011dfb79147a6acf75",
  "https://drscdn.500px.org/photo/264611011/q%3D80_m%3D2000/v2?sig=168adbb36f61cfc66ee00b4384fb407aa165f309c88aad3a4d2a893650a9e2ca",
  "https://iso.500px.com/wp-content/uploads/2020/07/Picnic-at-Sea-By-Ryan-Brown.jpeg",
  "https://img.fotocommunity.com/solitude-0446073c-6aaa-4473-b254-a2b53fe5f1b1.jpg?height=1080",
  "https://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dmImage/StandardImage/_1000784.jpg",
  "https://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dmImage/StandardImage/_6661003.jpg",
  "https://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dmImage/LargeGalleryImage/1hero-editorial-namibiaphotographytour-forthwonder.jpg",
  "https://res.cloudinary.com/yaffa-publishing/image/fetch/q_auto:best,c_fit,w_630,f_auto/http%3A%2F%2Fyaffa-cdn.s3.amazonaws.com%2Fyaffadsp%2Fimages%2FdmImage%2FSourceImage%2Fphoto-7-3-20-1-21-16-pm.jpg",
];
var arrWord = [
  `因为人与人之间的比较，因为现实与欲望的落差，所以才有成功与失败。`,
  `Be honest rather clever.
诚实比聪明更要紧。`,
  "Being on sea, sail; being on land, settle,随遇而安。",
];

function setWord() {
  var picNum = Math.floor(Math.random() * arrPic.length);
  var wordNum = Math.floor(Math.random() * arrWord.length);
  var num1 = Math.floor(Math.random() * 256);
  var num2 = Math.floor(Math.random() * 256);
  var num3 = Math.floor(Math.random() * 256);
  $("smallword")[0].innerHTML = arrWord[wordNum];
  $("pic")[0].style.background = "url(" + arrPic[picNum] + ")";
  $("pic")[0].style.backgroundPosition = "center";
  $("pic")[0].style.backgroundSize = "310px ";
  $("pic")[0].style.backgroundRepeat = "no-repeat";
  $("smallword")[0].style.color = "rgb(" + num1 + "," + num2 + "," + num3 + ")";
}
setWord();
setInterval(setWord, 1000 * 120);

var oMessages = $("messages")[0];
var messageStr = "";
$("savebut")[0].onclick = function () {
  messageStr =
    "var oPlanTod=" +
    JSON.stringify(oPlanTod) +
    "\n" +
    "var oPlanFut=" +
    JSON.stringify(oPlanFut) +
    "\n" +
    "var check=" +
    JSON.stringify(check) +
    "\n" +
    "var duration=" +
    JSON.stringify(duration) +
    "\n";
  oMessages.value = messageStr;
  oMessages.style.display = "block";
};
//set duration

var durConWrap = $("dur-con-wrap")[0];
var delOnDur = $("delete")[1];
var durTrue = true;
var addOnDur = $("add")[1];
var addDurInp = $("duration-add-pro")[0];

function calTimes(date) {
  var temStr = "";
  if (date == "") {
    temStr = "";
  } else {
    var oldTime = new Date(date).getTime();
    var nowTIme = new Date().getTime();
    var cal = Math.abs(nowTIme - oldTime) / 1000;
    var d = parseInt(cal / 60 / 60 / 24);
    var h = parseInt((cal / 60 / 60) % 24);
    var m = parseInt((cal / 60) % 60);
    var s = parseInt(cal % 60);
    temStr = d < 1 ? add0(h) + ":" + add0(m) + ":" + add0(s) : d + "days";
  }

  return temStr;
}

function durDis() {
  durConWrap.innerHTML = "";
  var temDurArr = [];
  for (var i in duration) {
    temDurArr.push(i);
  }
  for (var i = 0; i < temDurArr.length; i++) {
    var oLi = document.createElement("li");
    oLi.innerHTML =
      `<span class="dur-title">` +
      temDurArr[i] +
      `</span><span class="quitDays">` +
      calTimes(duration[temDurArr[i]]) +
      `</span><div class="dur-icon-wrap"><i class="iconfont icon-shanchu dur-del-but" ></i></div>
    `;

    durConWrap.appendChild(oLi);
  }

  var delDurButs = $("dur-icon-wrap");
  delOnDur.onclick = function () {
    if (durTrue) {
      this.className = "delete-on";
      durTrue = false;
      for (var i = 0; i < delDurButs.length; i++) {
        delDurButs[i].style.display = "inline-block";
      }
    } else {
      this.className = "delete";
      durTrue = true;
      for (var i = 0; i < delDurButs.length; i++) {
        delDurButs[i].style.display = "none";
      }
    }
  };

  if (!durTrue) {
    for (var i = 0; i < delDurButs.length; i++) {
      delDurButs[i].style.display = "inline-block";
    }
  }

  for (var i = 0; i < delDurButs.length; i++) {
    delDurButs[i].index = i;
    delDurButs[i].onclick = function () {
      delete duration[temDurArr[this.index]];
      durDis();
    };
  }

  addOnDur.onclick = function () {
    addDurInp.style.display = "block";
    $("dur-inp-com")[0].onclick = function () {
      duration[$("dur-input")[0].value] =
        $("dur-date-inp")[0].value + " 00:00:00";
      $("dur-input")[0].value = "";
      addDurInp.style.display = "none";
      durDis();
    };
  };
}
durDis();
// setInterval(quitDuration, 1000);

//type english words
var songsArr = [
  {
    name: "radioactive",
    src: "../../Imagine Dragons - Radioactive.mp3",
    lrc: `[00:29.26]I'm waking up to ash and dust
[00:32.57]I wipe my brow and I sweat my rust
[00:36.07]I'm breathing in the chemicals gahh ahhh
[00:43.33]I'm breaking in shaping up
[00:46.64]Then checking out on the prison bus
[00:50.08]This is it the apocalypse woah
[00:55.21]I'm waking up I feel it in my bones
[01:00.20]Enough to make my systems blow
[01:03.58]Welcome to the new age to the new age
[01:07.20]Welcome to the new age to the new age
[01:10.96]Woah woah I'm radioactive radioactive
[01:17.89]Woah woah I'm radioactive radioactive
[01:25.64]I raise my flag don my clothes
[01:28.89]It's a revolution I suppose
[01:32.29]We're painted red to fit right in woah
[01:39.35]I'm breaking in shaping up
[01:42.72]Then checking out on the prison bus
[01:46.22]This is it the apocalypse woah
[01:51.92]I'm waking up I feel it in my bones
[01:56.29]Enough to make my systems blow
[01:59.73]Welcome to the new age to the new age
[02:03.16]Welcome to the new age to the new age
[02:07.10]Woah woah I'm radioactive radioactive
[02:13.97]Woah woah I'm radioactive radioactive
[02:21.10]All systems go sun hasn't died
[02:27.73]Deep in my bones straight from inside
[02:33.79]I'm waking up I feel it in my bones
[02:37.91]Enough to make my systems blow
[02:41.79]Welcome to the new age to the new age
[02:45.54]Welcome to the new age to the new age
[02:49.16]Woah woah I'm radioactive radioactive
[02:55.97]Woah woah I'm radioactive radioactive`,
  },
 
];

var ulSongName = document.getElementById("songname");
var proNo = 1;
var lrcType = $("lrc-type")[0];
var vid = document.getElementById("mp3");
var lrc = "";
var progressArr = [];
for (var i = 0; i < songsArr.length; i++) {
  var oLi = document.createElement("li");
  oLi.innerHTML = songsArr[i]["name"] + '<a href="javascript:;"></a>';
  ulSongName.appendChild(oLi);
}

var aSongName = ulSongName.getElementsByTagName("li");
for (var i = 0; i < aSongName.length; i++) {
  aSongName[i].index = i;
  aSongName[i].onclick = function () {
    vid.src = songsArr[this.index]["src"];
    lrc = songsArr[this.index]["lrc"];
    proNo = 1;
    lrcList.style.top = "60px";
    lrcType.value = "";
    lrcList.innerHTML = "";
    typeEnglish();
  };
}

var lrcList = $("lrc-list")[0];
var lrcListLis;
function typeEnglish() {
  var lrcArr = lrc.split("\n");
  progressArr = [];
  for (var i = 0; i < lrcArr.length; i++) {
    var oLi = document.createElement("li");
    oLi.innerHTML = lrcArr[i].substring(10).toLowerCase();
    lrcList.appendChild(oLi);

    var progressSec = (
      parseFloat(lrcArr[i].substring(4, 10)) +
      parseFloat(lrcArr[i].substring(1, 3) * 60)
    ).toFixed(1);
    progressArr.push(progressSec);
  }
  console.log(progressArr);
  lrcListLis = lrcList.getElementsByTagName("li");
  getvideoprogress();

  lrcType.onkeyup = function (ev) {
    var strOld = lrcListLis[proNo - 1].innerHTML.substring(
      0,
      lrcType.value.length
    );
    if (strOld != lrcType.value) {
      lrcType.value = lrcType.value.substring(0, lrcType.value.length - 1);
    }
  };
}
function getvideoprogress() {
  setTimeout(function () {
    var currentTime = vid.currentTime.toFixed(1);
    if (currentTime == progressArr[proNo]) {
      if (lrcType.value != lrcListLis[proNo - 1].innerHTML) {
        vid.pause();
      } else {
        console.log(progressArr);
        vid.play();
        proNo++;
        lrcList.style.top = lrcList.offsetTop - 30 + "px";
        lrcType.value = "";
      }
    }

    getvideoprogress();
  }, 50);
}
var hideShow = $("hide-show")[0];
var secType = $("type")[0];
var hideJud = true;
hideShow.onclick = function () {
  if (hideJud) {
    this.innerHTML = "Show";
    hideJud = false;
    $("type_menu")[0].style.left = "-180px";
    $("type_menu")[0].style.top = "0px";
    $("head")[0].style.display = "none";
    secType.style.marginLeft = "50px";
    secType.style.marginTop = "-90px";
    $("type_menu")[0].onmouseover = function () {
      startMove(this, { left: 0 });
    };
    $("type_menu")[0].onmouseout = function () {
      startMove(this, { left: -180 });
    };
  } else {
    this.innerHTML = "Hide";
    hideJud = true;
    $("type_menu")[0].style.left = "0px";
    $("head")[0].style.display = "block";
    $("type_menu")[0].style.top = "64px";
    $("type_menu")[0].onmouseover = $("type_menu")[0].onmouseout = null;
    secType.style.marginLeft = "201px";
    secType.style.marginTop = "0px";
  }
};
var darkLight = $("dark-light")[0];
var darkJud = true;
darkLight.onclick = function () {
  if (darkJud) {
    $("type_page")[0].style.background = "black";
    $("type")[0].style.background = $("type-main")[0].style.background =
      "black";
    $("lrc-warpper")[0].style.color = "white";
    $("up-cover")[0].style.background = $("down-cover")[0].style.background =
      "#00000075";
    darkJud = false;
    this.innerHTML = "Bright";
  } else {
    $("type_page")[0].style.background = "rgb(241, 243, 244)";
    $("type")[0].style.background = $("type-main")[0].style.background =
      "rgb(241, 243, 244)";
    $("lrc-warpper")[0].style.color = "black";
    $("up-cover")[0].style.background = $("down-cover")[0].style.background =
      "#f1f3f4c7";

    darkJud = true;
    this.innerHTML = "Dark";
  }
};
// clock

function TimeKeep(type, cal, title, time) {
  this.type = type;
  this.cal = cal;
  this.title = title;
  this.time = time;
  this.judge = true;
  this.calDays = function (className, no, date) {
    if (this.type == "timekeep") {
      if (this.judge) {
        this.cal++;
      }
    } else if (this.type == "countdown") {
      this.cal--;
    } else if (this.type == "clock") {
      var oldTime = new Date(date + " " + this.time).getTime();
      var nowTIme = new Date().getTime();
      var result = nowTIme - oldTime;
      result = result >= 0 ? oldTime - nowTIme + 24 * 60 * 60 * 1000 : result;
      this.cal = Math.abs(result) / 1000;
    }

    var h = parseInt((this.cal / 60 / 60) % 24);
    var m = parseInt((this.cal / 60) % 60);
    var s = parseInt(this.cal % 60);
    var aCountdown = $(className);
    aCountdown[no].innerHTML = add0(h) + ":" + add0(m) + ":" + add0(s);
  };
}

var btnNewclock = $("btn-newclock")[0];
var btnclose = $("set-clock-close")[0];

var oDivsetclock = $("set-clock")[0];

var select0 = $("select1")[0];
var select1 = $("select1")[1];
var less = $("less");
var more = $("choose-more");
btnNewclock.onclick = function () {
  oDivsetclock.style.display = "block";
  oBtnCdown.style.display = "none";
  oBtnClock.style.display = "block";

  var index = new Date().getHours();
  var index1 = new Date().getMinutes();
  select0.options[index].selected = true;
  select1.options[index1].selected = true;
  //quick set clock
  var aQuickSetBtn = $("quick-set-clock");
  var arrQuickTime = ["04:30", "05:30", "7:00", "21:00", "23:00"];

  for (var i = 0; i < aQuickSetBtn.length; i++) {
    aQuickSetBtn[i].innerHTML = arrQuickTime[i];
    aQuickSetBtn[i].onclick = function () {
      var arr = this.innerHTML.split(":");
      var h = parseInt(arr[0]);
      var m = parseInt(arr[1]);
      select0.options[h].selected = true;
      select1.options[m].selected = true;
    };
  }
};
btnclose.onclick = $("btn-func-left")[0].onclick = function () {
  oDivsetclock.style.display = "none";
};

less[0].onclick = function () {
  var index = select0.selectedIndex;

  index--;
  index = index < 0 ? 23 : index;
  select0.options[index].selected = true;
};
more[0].onclick = function () {
  var index = select0.selectedIndex;

  index++;
  index = index > 23 ? 0 : index;
  select0.options[index].selected = true;
};
less[1].onclick = function () {
  var index1 = select1.selectedIndex;
  index1--;
  index1 = index1 < 0 ? 59 : index1;
  select1.options[index1].selected = true;
};
more[1].onclick = function () {
  var index1 = select1.selectedIndex;

  index1++;
  index1 = index1 > 59 ? 0 : index1;
  select1.options[index1].selected = true;
};
//clock=================================================================
var clockArr = [];
var oDivClockExcute = $("clock-excute")[0];
var oDivClockExcuteWraper = $("clock-excute-wraper")[0];
var oBtnClock = $("btn-func-right")[0];
oBtnClock.onclick = function () {
  var str =
    add0(select0.selectedIndex) + ":" + add0(select1.selectedIndex) + ":00";
  var title = $("input-title")[0].value;

  var clockTitle = new TimeKeep("clock", 0, title, str);
  clockArr.push(clockTitle);

  oDivClockExcute.style.display = "block";
  oDivClockExcuteWraper.innerHTML +=
    `
    <div class="block">
        <h3>
            ` +
    title +
    `
        </h3>
        <div class="time">
           ` +
    str +
    `
        </div>
        <div class="countdown">
        ` +
    str +
    `
        </div>
        <div class="but">
            <div class="wrap">
                <button class="btn-func btn-stop">Stop</button>
            </div>
        </div>
</div>`;
  oDivsetclock.style.display = "none";
  excuteClock();
};

function excuteClock() {
  var surtime = new Date();
  var surtimeStr =
    add0(surtime.getHours()) +
    ":" +
    add0(surtime.getMinutes()) +
    ":" +
    add0(surtime.getSeconds());
  var surYearMonth =
    surtime.getFullYear() +
    "/" +
    (surtime.getMonth() + 1) +
    "/" +
    surtime.getDate();
  var oDivWrapper = $("clock-excute-wraper")[0];
  var aBlock = $("block");

  for (var i = 0; i < clockArr.length; i++) {
    clockArr[i].calDays("countdown", i, surYearMonth);
    if (surtimeStr == clockArr[i]["time"]) {
      oDivWrapper.removeChild(aBlock[i]);
      clockArr.splice(i, 1);

      if (clockArr.length == 0) {
        oDivClockExcute.style.display = "none";
      }
      console.log("TIME IS UP");
    }
  }
  $("sur-time")[0].innerHTML = surtimeStr;
  $("sur-date")[0].innerHTML = surYearMonth;
  //close clock
  var aCloseClock = $("btn-stop");
  for (var i = 0; i < aCloseClock.length; i++) {
    aCloseClock[i].index = i;
    aCloseClock[i].onclick = function () {
      oDivWrapper.removeChild(aBlock[this.index]);
      clockArr.splice(this.index, 1);
      if (clockArr.length == 0) {
        oDivClockExcute.style.display = "none";
      }
    };
  }
}
excuteClock();
var cTimer = setInterval(excuteClock, 1000);
//countdown===========================================================================================

var oBtnCountdown = $("btn-countdown")[0];
var oBtnCdown = $("btn-cdown-right")[0];
oBtnCountdown.onclick = function () {
  oBtnClock.style.display = "none";
  oBtnCdown.style.display = oDivsetclock.style.display = "block";
  select0.options[0].selected = true;
  select1.options[0].selected = true;
  var aQuickSetBtn = $("quick-set-clock");
  var arrQuickTime = ["00:30", "01:00", "01:30", "02:00", "03:00"];
  for (var i = 0; i < aQuickSetBtn.length; i++) {
    aQuickSetBtn[i].innerHTML = arrQuickTime[i];
  }
  for (var i = 0; i < aQuickSetBtn.length; i++) {
    aQuickSetBtn[i].onclick = function () {
      var arr = this.innerHTML.split(":");
      var h = parseInt(arr[0]);
      var m = parseInt(arr[1]);

      select0.options[h].selected = true;
      select1.options[m].selected = true;
    };
  }
};

var arrCdown = [];
var oDivCdownExcute = $("cdown-excute")[0];
var oDivCdownExcuteWraper = $("cdown-excute-wraper")[0];
oBtnCdown.onclick = function () {
  var title = $("input-title")[0].value;

  var cal = select0.selectedIndex * 3600 + select1.selectedIndex * 60;
  var str =
    add0(select0.selectedIndex) + ":" + add0(select1.selectedIndex) + ":00";
  var clockTitle = new TimeKeep("countdown", cal, title);
  arrCdown.push(clockTitle);

  oDivCdownExcute.style.display = "block";
  oDivCdownExcuteWraper.innerHTML +=
    `
  <div class="cd-block">
      <h3>
          ` +
    title +
    `
      </h3>
      <div class="time">
         ` +
    str +
    `
      </div>
      <div class="cd-countdown">
      ` +
    str +
    `
      </div>
      <div class="but">
          <div class="wrap">
              <button class="btn-func cd-btn-stop">Stop</button>
          </div>
      </div>
</div>`;
  oDivsetclock.style.display = "none";
};

function excuteCdown() {
  var oDivCdWrapper = $("cdown-excute-wraper")[0];
  var aCdBlock = $("cd-block");
  for (var i = 0; i < arrCdown.length; i++) {
    arrCdown[i].calDays("cd-countdown", i);
    if (arrCdown[i]["cal"] <= 0) {
      console.log("countdown is up");
      oDivCdWrapper.removeChild(aCdBlock[i]);
      arrCdown.splice(i, 1);

      if (arrCdown.length == 0) {
        oDivCdownExcute.style.display = "none";
      }
    }
  }

  //close clock
  var aCdCloseClock = $("cd-btn-stop");
  for (var i = 0; i < aCdCloseClock.length; i++) {
    aCdCloseClock[i].index = i;
    aCdCloseClock[i].onclick = function () {
      oDivCdWrapper.removeChild(aCdBlock[this.index]);
      arrCdown.splice(this.index, 1);
      if (arrCdown.length == 0) {
        oDivCdownExcute.style.display = "none";
      }
    };
  }
}
var cdTimer = setInterval(excuteCdown, 1000);

//timekeep====================================================================================

var btnTimeKeep = $("btn-timekeeping")[0];
var tkExcute = $("timekeep-excute")[0];
var tkExcuteWraper = $("timekeep-excute-wraper")[0];
var arrTimeKeep = [];
btnTimeKeep.onclick = function () {
  var oDivChoose = $("set-timekeeping")[0];
  oDivChoose.style.display = "block";
  $("btn-close-timekeep")[1].onclick = $(
    "btn-close-timekeep"
  )[0].onclick = function () {
    oDivChoose.style.display = "none";
  };
};

$("btn-start-timekeep")[0].onclick = function () {
  var name = $("input-title-timekeep")[0].value;
  var ob = new TimeKeep("timekeep", 0, name);
  arrTimeKeep.push(ob);

  tkExcute.style.display = "block";
  tkExcuteWraper.innerHTML +=
    `
<div class="tk-block">
    <h3>
        ` +
    name +
    `
    </h3>

    <div class="tk-countdown">
    ` +
    "00:00:00" +
    `
    </div>
    <div class="but">
        <div class="wrap">
        <button class="btn-func tk-btn-pause">Pause</button>
        <button class="btn-func tk-btn-stop">Stop</button>
        </div>
    </div>
</div>`;

  //timer
  $("set-timekeeping")[0].style.display = "none";
};

function excuteTimeKeep() {
  for (var i = 0; i < arrTimeKeep.length; i++) {
    arrTimeKeep[i].calDays("tk-countdown", i);
  }
  //关闭设置好的timekeep

  var closeTk = $("tk-btn-stop");
  var pauseTk = $("tk-btn-pause");
  var aTkBlock = $("tk-block");
  for (var i = 0; i < closeTk.length; i++) {
    closeTk[i].index = i;
    closeTk[i].onclick = function () {
      tkExcuteWraper.removeChild(aTkBlock[this.index]);

      arrTimeKeep.splice(this.index, 1);

      if (arrTimeKeep.length == 0) {
        tkExcute.style.display = "none";
      }
    };
  }
  for (var i = 0; i < pauseTk.length; i++) {
    pauseTk[i].index = i;

    pauseTk[i].onclick = function () {
      if (arrTimeKeep[this.index].judge) {
        arrTimeKeep[this.index].judge = false;

        this.innerHTML = "Go on";
      } else {
        arrTimeKeep[this.index].judge = true;
        this.innerHTML = "Pause";
      }
    };
  }
}
var tkTimer = setInterval(excuteTimeKeep, 1000);

var setArea = $("set-area");
var funcArea = $("func-wrapper");

for (var i = 0; i < setArea.length; i++) {
  setArea[i].index = funcArea[i].index = i;
  setArea[i].timer = 0;
  setArea[i].onmouseover = funcArea[i].onmouseover = function () {
    clearTimeout(setArea[this.index].timer);

    startMove(funcArea[this.index], { left: 0, opacity: 100 });
  };

  setArea[i].onmouseout = funcArea[i].onmouseout = function () {
    var index = this.index;
    setArea[this.index].timer = setTimeout(function () {
      startMove(funcArea[index], { left: -150, opacity: 0 });
    }, 500);
  };
}

//time-line
//================================================================
var monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var oUl_time_line = $("time_line")[0];
for (var i = 0; i < 12; i++) {
  var oLi = document.createElement("li");
  oLi.innerHTML =
    `<div class="month_con">
                <div class="month_wrap">
                </div>
            </div>
            <div class="month_line"></div>
            <span>` +
    monthArr[i] +
    `</span>`;
  oUl_time_line.appendChild(oLi);
}
var aLis = oUl_time_line.getElementsByTagName("li");
var aMonthWraps = $("month_wrap");
var aLines = $("month_line");
for (var i = 0; i < aLis.length; i++) {
  aMonthWraps[i].setAttribute("id", monthArr[i]);
  var num1 = Math.floor(Math.random() * 256);
  var num2 = Math.floor(Math.random() * 256);
  var num3 = Math.floor(Math.random() * 256);
  aLines[i].style.background = "rgb(" + num1 + "," + num2 + "," + num3 + ")";
}

var thisYear = {
  January: {
    pichure:
      '<img src="https://www.chevrolet.com/content/dam/chevrolet/na/us/english/retail/march-2020/phase-3/homepage/01-images/chevy-cares-offer-masthead-xl-2500x1000.jpg?imwidth=1200">',
    gogal: "<p>Gogal:I must lose weight</p>",
    thing: "<p>I like the view</p>",
  },
};

var temCalPla = [];
for (var i in oPlanFut) {
  temCalPla.push(i);
}
var count = 0;
for (var i = 0; i < temCalPla.length; i++) {
  var num = oPlanFut[temCalPla[i]]["time"].split("-")[1];
  if (thisYear[monthArr[parseInt(num) - 1]]) {
    thisYear[monthArr[parseInt(num) - 1]]["goal" + count] =
      oPlanFut[temCalPla[i]]["mission"];
    thisYear[monthArr[parseInt(num) - 1]]["time" + count] =
      "<p style='color:orange'>" + oPlanFut[temCalPla[i]]["time"] + "</p>";
  } else {
    thisYear[monthArr[parseInt(num) - 1]] = {
      pichure:
        '<img src="' + arrPic[Math.floor(Math.random() * arrPic.length)] + '">',
      gogal: oPlanFut[temCalPla[i]]["mission"],
      time:
        "<p style='color:orange'>" + oPlanFut[temCalPla[i]]["time"] + "</p>",
    };
  }
}

for (var attr in thisYear) {
  for (var son in thisYear[attr]) {
    document.getElementById(attr).innerHTML += thisYear[attr][son];
  }
  var oLI = document.getElementById(attr).parentNode.parentNode;
  if (
    oLI.previousElementSibling &&
    oLI.previousElementSibling.className == "line_up"
  ) {
    oLI.className = "line_down";
  } else {
    oLI.className = "line_up";
  }
}
// mousewheel  cancel bubble
var month_con = $("month_con");
for (var i = 0; i < aMonthWraps.length; i++) {
  if (aMonthWraps[i].scrollHeight > aMonthWraps[i].offsetHeight) {
    aMonthWraps[i].addEventListener("mousewheel", bubbled, false);
  }
}
function bubbled(e) {
  e = e || window.event;
  e.cancelBubble = true;
}
// mousewheel
var oLine_con = $("line_con")[0];
oLine_con.addEventListener("mousewheel", handler, false);
function handler(event) {
  var detail = event.wheelDelta || event.detail;
  var step = detail > 0 ? -100 : +100;
  oLine_con.scrollLeft += step;
}
