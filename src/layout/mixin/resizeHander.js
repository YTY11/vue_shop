import store from '@/store'

const { body } = document
const WIDTH = 992 // 最小pc窗口

export default {
  beforeMount() {
    // 监听窗口变化
    window.addEventListener('resize', this.resizeHander)
  },
  beforeDestroy() {
    // 退出 销毁监听事件
    window.removeEventListener('resize', this.resizeHander)
  },
  mounted() {
    store.dispatch('app/setDevic', this.isMobile() ? 'mobile' : 'desktop')
  },
  methods: {
    // 判断窗口大小 来判断pc 还是 移动
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    // 模式切换
    resizeHander() {
      // 移动模式
      if (this.isMobile()) {
        // vuex 设置
        store.dispatch('app/setDevic', 'mobile')
        store.dispatch('app/setIsCollapse', true)
      } else { // pc模式
        store.dispatch('app/setDevic', 'desktop')
      }
    }
  }
}
