import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//样式初始化
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
