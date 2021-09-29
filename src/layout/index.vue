<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <h2 style="height:300px">aside</h2>
        <h2 style="height:300px">aside</h2>
        <h2 style="height:300px">aside</h2>
        <h2 style="height:300px">aside</h2>
        <h2 style="height:300px">aside</h2>
        <h2 style="height:300px">aside</h2>
        <h2 style="height:300px">aside</h2>
        <h2 style="height:300px">aside</h2>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped>
  .layout{
    width: 100%;
    height: 100%;
  }
</style>
