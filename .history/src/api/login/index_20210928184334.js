

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
