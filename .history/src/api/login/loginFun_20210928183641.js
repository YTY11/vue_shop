export function loginFun(data) {
  return this.$request({
    url: 'login',
    method: 'get',
    data: {
      data
    }
  })
}
