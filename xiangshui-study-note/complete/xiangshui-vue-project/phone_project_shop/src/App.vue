<template>
  <div id="app">
    <!--https://v3.cn.vuejs.org/guide/introduction.html -->
    <!-- 接收 prop 的默认插槽，使用了解构  -->
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab />
  </div>
</template>

<script>
import mainTab from "components/content/mainTab.vue";

export default {
  name: "App",
  components: {
    mainTab,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
