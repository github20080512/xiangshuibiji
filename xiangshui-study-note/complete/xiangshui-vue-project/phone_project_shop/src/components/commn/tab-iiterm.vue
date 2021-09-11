<template>
  <div class="tab-bar-item" @click="itermclick">
    <div v-if="!isActive"><slot name="iterm-icon"></slot></div>
    <div v-else><slot name="iterm-icon-active"></slot></div>

    <div :style="activeStyle"><slot name="iterm-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabIterm",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },

  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itermclick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 10px;
}
.tab-bar-item img {
  width: 30px;
  margin-top: 3px;
  margin-bottom: -3px;
}
</style>
