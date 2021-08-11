import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/loginpage/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'



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
//路由导航守卫

router.beforeEach((to,from,next) => {
  const token = localStorage.getItem('token')
  if(to.path !== '/login') {
    if(token) {
      next()
    }else {
      next('/login')
    }
  }else {
    next()
  }
})
export default router
