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
.el-main{
  padding: 10px;
}
</style>
