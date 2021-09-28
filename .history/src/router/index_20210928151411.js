import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Home
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
