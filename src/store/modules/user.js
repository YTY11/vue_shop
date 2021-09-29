// 引入token 设置方法
import { getToken, setToken, removeToken } from '@/utiles/user'
// 引入 登录接口
import { loginFun } from '@/api/login'

// 默认数据
const defaultState = () => {
  return {
    token: getToken(),
    name: ''
  }
}

const state = defaultState()

const mutations = {
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 移除 token
  REMOVE_TOKEN: (state) => {
    state = defaultState()
  }
}

const actions = {
  // 登录
  login({ commit, state }, userData) {
    return new Promise((resolve, reject) => {
      loginFun(userData).then(res => {
        // 成功给出弹框提示，存储token
        if (res.meta.status === 200) {
          // 设置 VUEX 状态中的token
          commit('SET_TOKEN', res.data.token)
          // 设置 session 存储的token
          setToken(res.data.token)
          // 设置用户名
          state.name = userData.username
          resolve(res.meta.msg)
        } else {
          reject(res.meta.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 退出
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      // state 恢复默认状态
      commit('REMOVE_TOKEN')
      removeToken()
      resolve('退出成功')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
