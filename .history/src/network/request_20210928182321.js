// 引入axios
import axios from 'axios'

export function request(config) {
  const instance = new axios.Create({
    baseUrl: 'https://lianghj.top:8888/api/private/v1/',
    timeOut: 5000
  })
  // axios 请求拦截
  // 就是在请求数据时对数据做一些处理
  instance.interceptors.request.use(config => {
    return config
  }, err => { console.log(err) })

  // axios 响应拦截
  // 对返回的数据做一些处理
  instance.interceptors.response.use(res => {
    return res.data
  }, err => { console.log(err) })

  return instance(config)
}