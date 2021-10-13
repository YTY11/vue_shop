<template>
  <div class="layout">
    <!-- 移动模式时菜单栏展开后的模态框 -->
    <div
      @click="collapse"
      :class="{ mobile: device === 'mobile' && !isCollapse }"
    ></div>
    <el-container>
      <!-- 菜单栏导航 -->
      <NavMenu :listMenus='listMenus'
        :class="{
          'nav-menu': device === 'mobile',
          'open-menu': device === 'mobile' && !isCollapse
        }"
      />
      <el-container class="right-container">
        <!-- 头部 -->
        <NavBar />
        <!-- 内容 -->
        <AppMain />
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 菜单栏导航组件
import NavMenu from './childComps'
// 内容组件
import AppMain from './AppMain.vue'
// 头部组件
import NavBar from './NavBar.vue'
// 模式切换
import ResizeHander from './mixin/resizeHander'
import { mapGetters } from 'vuex'

// 网络数据
import { getMenuData } from '@/api/menu'
export default {
  name: 'Layout',
  mixins: [ResizeHander],
  data() {
    return {
      listMenus: []
    }
  },
  components: {
    NavMenu,
    AppMain,
    NavBar
  },
  computed: {
    ...mapGetters(['isCollapse', 'device'])
  },
  created() {
    this.getMenuData()
  },
  methods: {
    // 控制菜单栏开合
    collapse() {
      this.$store.dispatch('app/setIsCollapse')
    },

    // 获取菜单栏数据
    getMenuData() {
      getMenuData()
        .then((res) => {
          if (res.meta.status === 200) {
            // 获取数据成功
            this.$message.success(res.meta.msg)
            this.listMenus = res.data
            this.listMenus.pop() // 删除最后一个菜单 自定义
          } else {
            // 获取数据失败
            this.$message.error(res.meta.msg)
          }
        })
        .catch((err) => {
          this.$message.error('请检查网络')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  & > .el-container {
    height: 100%;
  }
  .right-container {
    flex-direction: column;
    // header 固定
    // display: block;
    overflow: auto;
  }
  .nav-menu {
    position: absolute;
    height: 100%;
    z-index: 3;
    left: -200px;
    transition: left 0.28s;
  }
  .open-menu {
    left: 0;
  }
  .mobile {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
}
</style>
