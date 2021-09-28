import { request } from '@/network/request'

// 登录接口
export function loginFun(params) {
  return request({
    url: 'login',
   
    data: {
      params
    }
  })
}
