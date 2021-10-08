import router from './router'
import { getToken } from '@/utiles/user'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
NProgress.configure({ showSpinner: false })// 去除右上角圆环进度条
// 设置导航守卫 有token 直接进入首页或指定的页面（无法进入登录页面）
router.beforeEach((to, from, next) => {
  NProgress.start()
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 获取token
  const TOKEN = getToken()
  if (TOKEN) {
    if (to.path === '/login') next('/home')
    else next()
  } else {
    // 没有token 只能访问登录页面 其它页面无法访问
    if (to.path === '/login') next()
    else next('/login')
  }
})
router.afterEach(() => {
  NProgress.done()
})
