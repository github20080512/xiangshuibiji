# JavaScript
note

1. obj.innerHTML="div....."该 div 之前绑定的事件都失效。

var date=window.prompt("input");
switch(date){

        case "monday":
        case "tuseday":
        case "wednesday":
        case "thursday":
        case "friday":
            console.log("workingday");
            break;
        case "saturday":
        case "sunday":
            console.log("relaxing");
            break

    }

    typeof 6种类型 number string boolean object undefined function

    斐波那契数列
    fn(n)=fn(n-1)+fn(n-2)
     return fn(n-1)+fn(n-2)

    阶乘
    fn(n)=n*fn(n-1)

js 两个逼格 单线程+解释性语言
预编译
函数申明整体提升
变量 申明提升

1 创建 ao 对象 active object //全局对应的是 go 对象,全局变量是 window 的属性
2 找形参 变量声明，将变量和形参名作为 aO 属性名，值为 undefinded
3 将实参值和形参统一
4 在函数体里面找函数声明，值赋予函数体

var b=function(){} 这是函数表达式
function a(){} 这是函数声明

function(){
var a=b=3  
 conso.log(window.b) //这是可行的。因为 b 不是形参，不是变量声明，赋值归 window 所有
}

if(a){
var b=3;
function c(){} //function，if 里的 fn,调不出来，是 undefind
}

    递归 下
    typeof(a)= "undefind" typeof未定义的变量，是不报错的
    typeof(null) ="object" null是特殊的
    +undefined = nan
    -true = -1

    !!" " = ture;
    !!"" = false
    !!false = false

    立即执行函数
    var num=(function(a,b,c){
        var d = a + b + c*2;
        return d;
    }(1,2,3));

    只有表达式才能被执行符号执行
    var test=function(){ console.log(1)}(); //函数表达式  可以执行；是立即执行，函数名失效；

+、-、！ function test(){ console.log(1);}() //函数申明 这样子可以执行； 忽略表达式的引用=忽略函数名

function(a,b,c,d){
return(a+b+c+d)
}(1,2,3,4); 不报错。相当于把（1，2,3,4)回车另一行。

闭包精细版 题目
```
var f = (
    function f(){
        return "1" 
        },
    function g(){
        return 2
        }
)()
```
console.log(typeof f); //是 number， （）的， 先返回后面的 function g() 然后形成立即函数，返回 2。。。。。。

原始值不能有属性 比如 num.abc; string.say; //new number(12).abc; new string("a").say ="xx" 系统自动 delete.访问时继续 /new number(12).abc;new string("a").say；//之前已经删了，不存在的

var a=[1,0]
var b=[1,0]
a==b //false

[1,0]==[1,0] //false

+
js arr.sort()原理 sort()比较函数返回正数，数组位置不变。比较函数返回负数，位置交换。
### arr 数组
#### arr知识1
var arr = [10, 5];
var i = 1;
function compare(a, b) {
console.log(`第${i}次循环 a = ${a} , b = ${b} 上次操作后的数组是 ${arr}`);
console.log(a - b);
console.log(a);// 这里 a 是数组第二个数字
console.log(b);//这里 b 是数组第一个数字。
i++;
return b - a; //如果第一个数字减去第二个数字是正数，位置不变。第一个数字大于第二个数字，是倒序。
//return a-b; 这里如果第二个数字减去第一个数字是正数，位置不变。第二个数字大于第一个数字，是正序。如果第二个数字减去第一个数字是负数，交换位置。第二个数字小于第一个数字，交换位置，还是正序排序。
console.log(arr);
}
arr.sort(compare);
console.log(`最后的数组是 ${arr}`);

+
数组里是对象，按对某一属性值进行排序

var sdts = [
{name:"小明",age:30},
{name:"小红",age:20},
{name:"小花",age:40}
]
function compare(property,desc) {
return function (a, b) {
var value1 = a[property];
var value2 = b[property];
if(desc==true){
// 升序排列
return value1 - value2;
}else{
// 降序排列
return value2 - value1;
}
}
}
// console.log(sdts.sort(compare("age",true)))
console.log(sdts.sort(compare("age",false)))

#### arr知识2
    arr.push() 从尾部添加
    pop()  从尾部删除
    unshift() 从头部添加
    shift() 从头部删除
#### arr知识3 

``` arr.slice() //片段
    arr.splice(2,1) //delete one of arr
    arr.splice 可以删除 修改 增加
```


系统对话框
1.alert 2.comfirm(选择框) 3.prompt
window 对象常用事件
1.onload 2.onscroll 3.onresize

# 字符串
str.charAt(0)
str.substring(0)
str.search("") //返回第一个值的位置
str.indexOf("")//返回第一个值的位置

 ## str.charCodeAt(4)
 var str="abd?？"
 str.charCodeAt(4) //Unicode码
 ascll 转 Unicode
 https://tool.chinaz.com/tools/unicode.aspx

# 正则
var re=/ab|ad|bd/g
var str="fafab ad ab bd,adcd"
str.replace(re,"F")


# 正则表达式
```
    var str = "dfa<1as>ssd<s2s>daf<1ds>sa";
    var r = /<[\s\S]{3}>/g;
    var a = str.match(r)
    console.log(a);

    var t=/(a)(g)(d)/
    var str='agd'
    t.test(str);
    let res = RegExp.$2
    console.log(res)

```

## this 指向
https://www.cnblogs.com/fanzhanxiang/p/8888963.html

## 绝对路径 相对路径
绝对路径 /    会指向f:/files  文件引用无效
相对路径 ../  会指向html

## 阻止a链接默认事件
 javascript:;  javascript:void(0)

## js命名

kebab-case
camelCase
ParscaleCase

## something other
document.getElementById("frameId").contentWindow.document.getElementById("id")

 window.parent.contentFrame.document.getElementById

 jquery on 解决多次绑定事件  可以用off('click').on('click')



