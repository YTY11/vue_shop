import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式初始化
import 'normalize.css/normalize.css'
// 按需引入element-ui
import '@/plugins/element'
// 引入字体图标
import '@/assets/font/iconfont.css'

// 引入通用接口配置
impact 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
