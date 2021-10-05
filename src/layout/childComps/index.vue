<template>
  <el-scrollbar>
    <!-- logo -->
    <Logo/>
    <!-- 菜单栏导航 -->
    <NavMenu/>
  </el-scrollbar>
</template>

<script>
// logo组件
import Logo from './Logo.vue'
// 菜单栏导航组件
import NavMenu from './NavMenu.vue'
export default {
  components: {
    NavMenu,
    Logo
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar{
  background-color: #545C64;
}
</style>
