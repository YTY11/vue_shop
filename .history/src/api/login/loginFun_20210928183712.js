// den
export function loginFun(params) {
  return this.$request({
    url: 'login',
    method: 'post',
    data: {
      params
    }
  })
}
