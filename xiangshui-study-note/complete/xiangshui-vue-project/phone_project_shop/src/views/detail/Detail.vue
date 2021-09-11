<template>
  <div id="detail">
    <detail-nav-bar
      ref="navbar"
      class="detail-nav-bar"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll
      class="content"
      :pullUpLoad="true"
      @scroll="contentScroll"
      ref="scroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>

      <goods-list
        ref="recommend"
        :goods="recommends"
        @detailLoad="detailLoad"
      ></goods-list>
    </scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :isshow="isshow" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/commn/scroll/Scroll";

import DetailBottomBar from "./childComps/DetailBottomBar";
import { backTopMixin } from "@/common/mixin.js";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import toast from "components/commn/toast";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isshow: false,
      message: "",
    };
  },
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    toast,
  },
  created() {
    this.iid = this.$route.params.iid;
    // 2.发送网络请求,请求详情页数据
    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      // 获取轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息模块数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 保存商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 取出商品的品论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 取出推荐商品的信息
      /**
       *  图片还没有加载
       */
      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    });

    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    detailLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    addToCart() {
      // 购物车需要什么信息,就把详情页中什么信息添加到购物车中
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 获取完需要展示的数据,将商品添加到购物车里面
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product).then((res) => {
      
        this.message = res;
        this.isshow = true;
        setTimeout(() => {
          this.message = "";
          this.isshow = false;
        }, 3000);
      });
    },
    contentScroll(position) {
      this.isListenShowBackTop(position);
      const positionY = -position.y;

      for (let i = this.themeTopYs.length - 1; i >= 0; i--) {
        if (positionY >= this.themeTopYs[i]) {
          this.$refs.navbar.currentIndex = i;
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
