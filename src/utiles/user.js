const TOKEN = 'VUE_SHOP_TOKEN' // token 名字
// 获取token
export function getToken() {
  return window.sessionStorage.getItem(TOKEN)
}

// 设置token
export function setToken(token) {
  window.sessionStorage.setItem(TOKEN, token)
}

// 移除token
export function removeToken() {
  window.sessionStorage.removeItem(TOKEN)
}
