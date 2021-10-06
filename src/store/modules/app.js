const state = {
  // eval方法动态将参数运算成一个字符串,然后自动判断了字符串的类型,true被认为是boolean类型的变量.javascript的弱类型机制.通过eval运算可以动态获取运算后参数的类型.
  // eslint-disable-next-line no-eval
  isCollapse: window.sessionStorage.getItem('open') !== null ? eval(window.sessionStorage.getItem('open').toLowerCase()) : false,
  device: 'desktop'

}

const mutations = {
  // 设置菜单导航栏是否收起
  SET_ISCOLLAPSE: (state, data) => {
    state.isCollapse = data
  },
  // 设置 desktop 或 mobile 模式
  SET_PCANDMOBILE: (state, data) => {
    state.device = data
  }
}
const actions = {
  // 菜单栏的开合
  setIsCollapse({ commit, state }, data = !state.isCollapse) {
    window.sessionStorage.setItem('open', !state.isCollapse)
    commit('SET_ISCOLLAPSE', data)
  },
  // pc 移动端的切换
  setDevic({ commit }, data) {
    commit('SET_PCANDMOBILE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
