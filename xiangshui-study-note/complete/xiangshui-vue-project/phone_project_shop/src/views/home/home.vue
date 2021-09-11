<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <template v-slot:center> Shoping Street </template>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      class="tab-con"
      v-show="isTabFixed"
      ref="TabControl1"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="titles"
        class="tab-control"
        @tabClick="tabClick"
        ref="TabControl2"
      ></tab-control>
      <good-list :goods="showGoods" @faload="faLoad" />
    </scroll>
    <back-top @click="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/commn/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/commn/scroll/Scroll";

import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新品", "精品"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      timer: null,
      tabbarOffsettop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  mounted() {},
  methods: {
    faLoad() {
      // console.log(this.$refs.scroll.refresh)
      const refresh = this.debounce(this.$refs.scroll.refresh, 200);
      refresh();
    },
    swiperImgLoad() {
      setTimeout(() => {
        this.tabbarOffsettop = this.$refs.TabControl2.$el.offsetTop;
        // console.log(this.$refs.TabControl2)
        // console.log(this.$refs.TabControl2.$el)
      }, 200);
    },

    debounce(fn, delay) {
      let that = this;

      return function (...args) {
        if (that.timer) clearTimeout(that.timer);
        that.timer = setTimeout(() => {
          fn.apply(this, args);
   

          // console.log(args)
          // console.log(this) =>undefinde
        }, delay);
      };
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabbarOffsettop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;

        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },

  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  unmounted() {
   
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {

    this.saveY = this.$refs.scroll.getScrollY();
  },
};
</script>

<style scoped>
.nav-bar {
 
  color: #fff;
  z-index: 9;
}
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
}

.tab-con {
  position: relative;

  z-index: 98;
}
</style>
