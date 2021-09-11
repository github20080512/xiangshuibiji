
import { createStore } from 'vuex'

const store= createStore({
  state: {
    cartList: []
  },

  mutations: {
    addCounter(state, payload) {
      // console.log("addCounter state")
      // console.log(state)
      // console.log(payload)
      payload.count++
    },

    addToCart(state, payload) {
      // console.log("addToCart state")
      // console.log(state)
      // console.log(payload)
      payload.checked = true
      state.cartList.push(payload)
    }
  },

  actions: {
    addCart(context, payload) {
      // console.log("action context")
      // console.log(context)
      return new Promise((resolve)=>{
        
      let oldProduct = null

      oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve("counter++")
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve("add to cart")
      }

      })
    }
  },

  // 类似计算属性,对state中的数据进行过滤
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  }
  })

  
export default store