// 引入axios
import axios from 'axios'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
NProgress.configure({ showSpinner: false }) // 去除右上角圆环进度条
export function request(config) {
  // eslint-disable-next-line new-cap
  const instance = new axios.create({
    baseURL: 'http://120.26.52.45:8889/api/private/v1/',
    timeout: 5000,
    method: config.method === undefined ? 'get' : config.method
  })
  // axios 请求拦截
  // 就是在请求数据时对数据做一些处理
  instance.interceptors.request.use(config => {
    NProgress.start()
    // 登录授权 请求验证是否有token  需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
    config.headers.Authorization = window.sessionStorage.getItem('VUE_SHOP_TOKEN')
    return config
  }, err => { console.log(err) })

  // axios 响应拦截
  // 对返回的数据做一些处理
  instance.interceptors.response.use(res => {
    NProgress.done()
    return res.data
  }, err => { console.log(err) })

  return instance(config)
}
