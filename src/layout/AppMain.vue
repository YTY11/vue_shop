<template>
  <el-scrollbar>
    <!-- 内容展示区域 -->
    <el-main>
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
    padding: 15px;
  }
}
</style>
