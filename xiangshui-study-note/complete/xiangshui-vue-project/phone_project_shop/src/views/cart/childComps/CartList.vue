<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :pull-up-load="true">
      <CartListItem
        v-for="(item, index) in cartList"
        :itemInfo="item"
        :key="index"
        @parentclick="parentclick(item)"
      ></CartListItem>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/commn/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  data() {
    return {
      cartLi: [],
    };
  },
  computed: {
    // ...mapGetters(["cartList"]),
    ...mapGetters(["cartList"]),
  },
  components: {
    Scroll,
    CartListItem,
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    parentclick(item) {
      // this.itemInfo.checked = !this.itemInfo.checked;

      item.checked = !item.checked;
    },
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>