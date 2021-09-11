<template>
  <tab-bar>
    <tab-iterm path="/home" activeColor="blue">
      <template v-slot:iterm-icon>
        <img
          src="https://gw.alicdn.com/imgextra/i2/O1CN01HTiGPS28AaP3Lbwh0_!!6000000007892-2-tps-68-68.png_110x10000.jpg_.webp"
          alt=""
        />
      </template>
      <template v-slot:iterm-icon-active>
        <img
          src="https://gw.alicdn.com/imgextra/i2/O1CN01Icpn6i1yVWLvAiwex_!!6000000006584-2-tps-68-68.png_110x10000.jpg_.webp"
          alt=""
        />
      </template>
      <template v-slot:iterm-text>
        <div>Home</div>
      </template>
    </tab-iterm>

    <tab-iterm path="/detail" activeColor="red">
      <template v-slot:iterm-icon>
        <img
          src="https://gw.alicdn.com/imgextra/i4/O1CN01aQQij01o9rSoNMwjX_!!6000000005183-2-tps-68-68.png_110x10000.jpg_.webp"
          alt=""
        />
      </template>
      <template v-slot:iterm-icon-active>
        <img
          src="https://gw.alicdn.com/imgextra/i4/O1CN01SlBnl120m7wbyewR0_!!6000000006891-2-tps-68-68.png_110x10000.jpg_.webp"
          alt=""
        />
      </template>
      <template v-slot:iterm-text>
        <div>detail</div>
      </template>
    </tab-iterm>

    <tab-iterm path="/cart" activeColor="red">
      <template v-slot:iterm-icon>
        <img
          src="https://gw.alicdn.com/imgextra/i3/O1CN01soEqYr1VgOu7OTx6m_!!6000000002682-2-tps-68-68.png_110x10000.jpg_.webp"
          alt=""
        />
      </template>
      <template v-slot:iterm-icon-active>
        <img
          src="https://gw.alicdn.com/imgextra/i2/O1CN01PbLNId1aspjYEKGpO_!!6000000003386-2-tps-68-68.png_110x10000.jpg_.webp"
          alt=""
        />
      </template>
      <template v-slot:iterm-text>
        <div>Cart</div>
      </template>
    </tab-iterm>
  </tab-bar>
</template>

<script>
import TabBar from "components/commn/tabbar.vue";
import TabIterm from "components/commn/tab-iiterm.vue";

export default {
  name: "mainTab",
  components: {
    TabBar,
    TabIterm,
  },
};
</script>

<style>
</style>
