<template>
  <div>
    <swiper>
      <swiper-item v-for="item in topImages" class="swiper-item" :key="item">
        <img :src="item" alt="" class="detail-img" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/commn/swiper";
export default {
  name: "",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.swiper-item {
  height: 300px;
}
.detail-img {
  width: 100%;
}
</style>