import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
var vm= new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
window.vm=vm