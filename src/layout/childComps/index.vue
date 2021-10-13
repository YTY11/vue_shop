<template>
  <el-scrollbar>
    <!-- logo -->
    <Logo/>
    <!-- 菜单栏导航 -->
    <NavMenu :listMenus='listMenus'/>
  </el-scrollbar>
</template>

<script>
// logo组件
import Logo from './Logo.vue'
// 菜单栏导航组件
import NavMenu from './NavMenu.vue'
export default {
  props: {
    listMenus: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    NavMenu,
    Logo
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar{
  z-index: 1;
  background-color: #545C64;
  box-shadow: 0px 0px 15px -4px;
  overflow: initial !important;
}
</style>
