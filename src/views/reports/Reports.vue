<template>
  <dv-full-screen-container class="bg">
    <!-- 头部 -->
    <HeadView class="header"/>
    <el-row class="row">
      <el-col :span="6">
        <!-- 左侧 -->
        <Left />
      </el-col>
      <el-col :span="12">
        <!-- 中间 -->
        <Center />
      </el-col>
      <el-col :span="6">
        <!-- 右侧 -->
        <Right />
      </el-col>
    </el-row>
  </dv-full-screen-container>
</template>

<script>
// 头部组件
import HeadView from './childComps/HeadView.vue'
// 左侧组件
import Left from './childComps/Left.vue'
// 中间组件
import Center from './childComps/Center.vue'
// 右侧组件
import Right from './childComps/Right.vue'
export default {
  name: 'Reports',
  components: {
    HeadView,
    Left,
    Center,
    Right
  }
}
</script>

<style lang="scss" scoped>
.bg{
  background: url('~@/assets/img/bg.png') no-repeat;
  background-size: cover;
  background-position: center;
}
.header{
  height: 10vh;
}
.row{
  height: 90vh;
  .el-col{
    height: 100%;
  }
}
</style>
