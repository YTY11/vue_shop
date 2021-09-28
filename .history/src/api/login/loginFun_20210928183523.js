export function loginFun(data) {
  return this.$request({
    url: 'login',
    params: {
      data
    }
  })
}
