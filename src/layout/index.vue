<template>
  <div class="layout">
    <el-container>
      <!-- 菜单栏导航 -->
      <NavMenu />
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
export default {
  name: 'Layout',
  components: {
    NavMenu,
    AppMain,
    NavBar
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
}
</style>
