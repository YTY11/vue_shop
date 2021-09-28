import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/Home')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
