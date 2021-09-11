


import { createRouter,createWebHistory } from 'vue-router'
const home=()=>import('views/home/home.vue')
const cart=()=>import('views/cart/cart.vue')
const mine=()=>import('views/mine/mine.vue')
const Detail=()=>import('views/detail/Detail.vue')


// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:"",
      redirect:"/home"
    },
    {
      path:'/home',
      component:home
    },
    {
      path:'/cart',
      component:cart
    },
    {
      path:'/mine',
      component:mine
    },
    {
      path:'/detail/:iid',
      component:Detail
    },
  ],
})
 
export default router