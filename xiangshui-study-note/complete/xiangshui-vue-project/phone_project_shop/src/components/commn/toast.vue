<template>
  <div class="toast" v-if="isshow">
    {{ message }}
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    isshow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.toast {
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>