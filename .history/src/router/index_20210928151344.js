import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Home',
    component: Home
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
