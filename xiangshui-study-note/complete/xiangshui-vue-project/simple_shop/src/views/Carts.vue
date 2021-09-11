<template>
  <div>
    <ul>
      <li v-for="product in products">
        {{product.name}}: {{product.quantity}} x {{product.price}} = {{product.quantity * product.price}}
      </li>
    </ul>
    <div>总价： {{totalPrice}}</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
  console.log(mapState)
  console.log(mapGetters)

    console.log(11)
export default {
  computed: {
    ...mapState('cart', {
      products: 'items' //cart.js state.items
    }),
    ...mapGetters('cart', ['totalPrice']) //cart.js getters.totalPrice

  }
}
</script>

<style lang='stylus' scoped>

</style>