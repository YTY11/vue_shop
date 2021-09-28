import { request } from '@/network/request'

// 登录接口
export function loginFun(params) {
  return this.$http({
    url: 'login',
    method: 'post',
    data: {
      params
    }
  })
}
