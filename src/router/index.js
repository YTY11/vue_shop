import Vue from 'vue'
import VueRouter from 'vue-router'
// 页面布局
import Layout from '@/layout'

Vue.use(VueRouter)
// 解决 连续点击相同路由导致报错问题 不解决也没啥影响 就是控制台 爆红 看着 烦
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    meta: { title: '用户管理' },
    children: [
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/users/Users'),
        meta: { title: '用户列表' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    meta: { title: '权限管理' },
    children: [
      {
        path: '/roles',
        name: 'Roles',
        component: () => import('@/views/permission/Roles'),
        meta: { title: '角色列表' }
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('@/views/permission/Rights'),
        meta: { title: '权限列表' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
