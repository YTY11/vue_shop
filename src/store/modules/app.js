const state = {
  // eval方法动态将参数运算成一个字符串,然后自动判断了字符串的类型,true被认为是boolean类型的变量.javascript的弱类型机制.通过eval运算可以动态获取运算后参数的类型.
  // eslint-disable-next-line no-eval
  isCollapse: window.sessionStorage.getItem('open') !== null ? eval(window.sessionStorage.getItem('open').toLowerCase()) : false

}

const mutations = {
  // 设置菜单导航栏是否收起
  SET_ISCOLLAPSE: (state) => {
    state.isCollapse = !state.isCollapse
  }
}
const actions = {
  // 菜单栏的开合
  setIsCollapse({ commit, state }) {
    window.sessionStorage.setItem('open', !state.isCollapse)
    commit('SET_ISCOLLAPSE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
