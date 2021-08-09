import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/loginpage/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'
import { resolve } from 'q'


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path:'/',
    // name:'Layout',
    component: Layout,
    children:[
      {
        path:'',
        name:'Home',
        component: Home
      },
      {
        path:'/article',
        name:'article',
        component: resolve => require(['@/views/context/index.vue'],resolve)
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
