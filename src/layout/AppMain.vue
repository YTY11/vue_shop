<template>
  <el-scrollbar>
    <!-- 内容展示区域 -->
    <el-main>
      <el-backtop target=".el-main">
        <i class="el-icon-top"></i>
      </el-backtop>
      <router-view />
    </el-main>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  background-color: #eaedf1;
  height: 100%;
  .el-main {
    height: calc(100vh - 50px);
    padding: 15px;
  }
}
</style>
