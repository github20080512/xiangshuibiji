(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"11fa":function(t,e,n){},"639e":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"note-wrap"},[n("div",{staticClass:"btnarea"},[n("button",{staticClass:"btn",on:{click:t.writefn}},[t._v("write")])]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.noteStr,expression:"noteStr"}],class:{active:t.isActive},attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:t.noteStr},on:{input:function(e){e.target.composing||(t.noteStr=e.target.value)}}})])},o=[],a={name:"note",data:function(){return{noteStr:"",writeTimer:null,isActive:!1}},created:function(){var t=this;this.$http.post("http://localhost:56565/read").then((function(e){t.noteStr=e.data}))},mounted:function(){},watch:{noteStr:function(t,e){clearTimeout(this.writeTimer);var n=this;this.writeTimer=setTimeout((function(){n.$http.post("http://localhost:56565/write",{str:t}).then((function(t){n.isActive=!0,setTimeout((function(){n.isActive=!1}),500)}))}),5e3)}},methods:{writefn:function(){this.$http.post("http://localhost:56565/write",{str:this.noteStr}).then((function(t){}))}}},s=a,r=(n("ba9d"),n("2877")),c=Object(r["a"])(s,i,o,!1,null,"479a7a70",null);e["default"]=c.exports},ba9d:function(t,e,n){"use strict";n("11fa")}}]);
//# sourceMappingURL=about.88adaa58.js.map