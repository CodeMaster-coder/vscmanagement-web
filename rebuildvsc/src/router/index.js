import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import materialRouter from './material'
import toolRouter from './tool'
import equipmentRouter from './equipment'
import sparepartRouter from './sparepart'
import secondFloorRouter from './secondFloor'
import userRouter from './user'
import userAPI from '../api/userAPI'
import { Message } from 'element-ui'

Vue.use(Router)

const router =  new Router({
  routes: [
    
    {path:'/', redirect:'/login'},
    {path:'/login', component:Login},
    {path:'/home', component:home,redirect:'/welcome',
      children:[
        ...materialRouter,
        ...toolRouter,
        ...equipmentRouter,
        ...sparepartRouter,
        ...secondFloorRouter,
        ...userRouter,
        {path: '/welcome', component: welcome}
      ]
    }
  ]
})



//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from从哪个路径跳转而来
  //next是一个函数，表示放行
  //next()表示直接放行 next('/login) 表示强制跳转

  if(to.path == '/login') return next();
  //获取登录信息
  const userInfo =  window.sessionStorage.getItem('userInfo')
  if(!userInfo) return next('/login');
  next()
}) 

export default router;
