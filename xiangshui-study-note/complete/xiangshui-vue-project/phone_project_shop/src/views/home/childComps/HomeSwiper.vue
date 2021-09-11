<template>
  <swiper>
    <swiper-item v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img class="picStyle" :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

  import {Swiper, SwiperItem} from 'components/commn/swiper/index.js'
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imgLoad(){
        if(!this.isLoad){
          this.$emit("swiperImgLoad")

          this.isLoad=true
        }
      }
    }
  }
</script>

<style scoped>
.picStyle{
  width: 100%;
}
</style>