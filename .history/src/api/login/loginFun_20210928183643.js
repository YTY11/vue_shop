export function loginFun(data) {
  return this.$request({
    url: 'login',
    method: 'post',
    data: {
      data
    }
  })
}
