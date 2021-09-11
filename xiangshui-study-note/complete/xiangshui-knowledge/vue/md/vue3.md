# 模板语法     
    

## 插值
### 文本
      "<span>Message: {{ msg }}</span>"
      "<span v-once>这个将不会改变: {{ msg }}</span>"

### Attribute
    '<div v-bind:id="dynamicId"></div>'
### 使用 JavaScript 表达式

    ```
      
        {{ number + 1 }} 
        {{ ok ? 'YES' : 'NO' }} 
        {{ message.split('').reverse().join('')}}
        <div v-bind:id="'list-' + id"></div>

    ```

    
### 使用 JavaScript 表达式


### 指令
    `<p v-if="seen">现在你看到我了</p>`
    
### 参数
    `<a v-bind:href="url"> ... </a>`
    `<a v-on:click="doSomething"> ... </a>`
     `<a v-bind:[attributeName]="url"> ... </a>`
     `<a v-on:[eventName]="doSomething"> ... </a>`
### 修饰符
    例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()
    `<form v-on:submit.prevent="onSubmit">...</form>`
# Class 与 Style 绑定
## 绑定 HTML Class
1. 对象语法 `<div :class="{ active: isActive }"></div>`
2. 数组语法   ```<div :class="[activeClass, errorClass]"></div>  data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
} ```

# 条件渲染
## v-if


```
   <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
```
## v-for
 ```
 <li v-for="(value, name) in myObject">
  {{ name }}: {{ value }}
</li> 
```

 ```
 <li v-for="(value, name, index) in myObject">
  {{ index }}. {{ name }}: {{ value }}
</li>
```


## 变更方法
Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

push()
pop()
shift()
unshift()
splice()
sort()
reverse()

## v-for 与 v-if 一同使用
当它们处于同一节点，v-if 的优先级比 v-for 更高，这意味着 v-if 将没有权限访问 v-for 里的变量：
```
<!-- This will throw an error because property "todo" is not defined on instance. -->

<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li> 
```

可以把 v-for 移动到 <template> 标签中来修正：

```
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo }}
  </li>
</template>
```

## 页面响应 
vm.list.length=0 vm.list[0]="y" =》 页面做不到响应 
 解决方法：vm.list.splice(0,vm.list.length)
 或： vm.list.length=0  vm.$forceupdate()
 2
对象新增属性 =》 页面做不到响应  
解决方法：vm.$set(vm.obj,"y",100)  

## fn增强写法
 mounted:function(){
     
 }
 可以写成：
 mounted(){

 }




