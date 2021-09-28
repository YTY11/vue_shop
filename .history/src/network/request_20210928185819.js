// 引入axios
import axios from 'axios'

export function request(config) {

  // eslint-disable-next-line new-cap
  const instance = new axios.create({
    baseURL: 'https://lianghj.top:8888/api/private/v1/',
    timeOut: 5000,
    method: config.method === undefined ? 'get' : config.method
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
